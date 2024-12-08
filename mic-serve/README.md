# express-serve


## 基础安装

### 安装git

之前上网一顿搜索，又说要下载啊，解压啊什么的，后来发现阿里云服务器自带了git安装包的了（反正我买的这个就有），直接上命令：

~~~
yum install git
~~~

### 安装node

我是使用nvm安装的，方便以后可以切换node的版本，首先使用git将源码克隆到本地的~/.nvm目录下，并检查最新版本。

~~~
git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
~~~

然后激活NVM

~~~
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile
~~~

然后安装node（我是安装目前的LTS版10.16.0）

~~~
nvm install v10.16.0
~~~

最后使用nodev10.16.0

~~~
nvm use v10.16.0
~~~

测试一下有没有安装成功

~~~
node -v
npm -v
~~~

如果有版本号的话，就证明安装成功了。
PS:这里有个小坑，你试一下输入 reboot 重启服务器？然后 node -v ？ 没了吧。每次重启服务器，都要用node use 版本号才能用node和npm，设置一下别名，这样就可以重启后直接用了

~~~
nvm alias default v10.16.0
~~~

### 运行项目

首先要下载pm2（pm2是啥？自己百度一下吧，我也是这么过来的）

```
npm install -g pm2
```

然后cd到你的express项目里面

~~~
pm2 start ./bin/www
~~~

最后做下nginx 反向代理

~~~
server {

    listen    443 ssl;
    listen    [::]:443 ssl;
    server_name  dbtest.rangersprotocol.com;

    ssl_certificate "/app/cert/5767542__rangersprotocol.com.pem";
    ssl_certificate_key "/app/cert/5767542__rangersprotocol.com.key";

    gzip on;
    gzip_static on;
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_http_version 1.1;
    gzip_comp_level 9;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;

    location / {
	    proxy_pass http://localhost:4000;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Connection "";
    }
}
~~~