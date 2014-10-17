Brix SPA
========

## 开始

首先，需要安装好 [nodejs](http://nodejs.org/download/)、[bower](http://bower.io/)、[gulp](http://gulpjs.com/)：

```shell
npm install -g bower
npm install -g gulp
```

然后，继续运行下面的命令，下载 brix-spa 和依赖包：

```shell
git clone git@github.com:nuysoft/brix-spa.git
cd brix-spa
npm install
bower install
```

然后，启动 HTTP 服务：

```shell
gulp
```

最后，访问 <http://localhost:4243/demo/demo.spa.html>。