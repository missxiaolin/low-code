import ora from 'ora';

const spinner = ora({
    text: '正在生成',
    spinner: 'dots',
    color: 'blue'
});

export default {
    start(message) {
        spinner.text = message;
        spinner.start();
    },

    success(message) {
        spinner.succeed(message);
    },

    fail(error) {
        spinner.fail(error);
    }
}