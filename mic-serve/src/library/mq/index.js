import amqp from "amqplib";
import dotenv from "dotenv";
const appConfig = dotenv.config().parsed;

export default class RabbitMq {
  constructor() {
    if (appConfig.RABBIT_MQ_IS_OPEN == 0) {
      return;
    }
    this.hosts = JSON.parse(appConfig.RABBIT_MQ_HOSTS);
    this.index = appConfig.RABBIT_MQ_INDEX;
    this.length = this.hosts.length;
    this.open = amqp.connect(this.hosts[this.index]);
  }

  /**
   * 消息生产者
   * @param {*} queueName
   * @param {*} msg
   * @param {*} successCallback
   * @param {*} errorCallBack
   */
  sendQueueMsg(queueName, msg, successCallback, errorCallBack) {
    let self = this;
    return self.open
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(function (channel) {
        return channel
          .assertQueue(queueName)
          .then(function (ok) {
            return channel.sendToQueue(queueName, new Buffer.from(msg), {
              persistent: true,
            });
          })
          .then(function (data) {
            if (data) {
              typeof successCallback === "function" &&
                successCallback("success");
              channel.close();
            }
          })
          .catch(function (e) {
            typeof errorCallBack === "function" && errorCallBack(e);
            setTimeout(() => {
              if (channel) {
                channel.close();
              }
            }, 500);
          });
      })
      .catch(function (e) {
        typeof errorCallBack === "function" && errorCallBack(e);
      });
  }

  /**
   * 消息消费者
   * @param {*} queueName
   * @param {*} receiveCallBack
   * @param {*} errCallBack
   */
  receiveQueueMsg(queueName, receiveCallBack, errCallBack) {
    let self = this;

    self.open
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(function (channel) {
        return channel.assertQueue(queueName).then(function (ok) {
          channel.prefetch(10, false);
          return channel
            .consume(queueName, function (msg) {
              if (msg !== null) {
                let data = msg.content.toString();
                receiveCallBack && receiveCallBack(data, function () {});
                channel.ack(msg);
              }
            })
            .finally(function () {});
        });
      })
      .catch(function (e) {
        errCallBack(e);
        /**
                 * 下面的逻辑是做容灾处理，会有多个rabbitmq服务用来切换
                 * @type {number}
                  let num = self.index++;
                   if (num <= self.length - 1) {
                    self.open = amqp.connect(self.hosts[num]);
                  } else {
                    self.index = 0;
                    self.open = amqp.connect(self.hosts[0]);
                  }
                 */
      });
  }
}
