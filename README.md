# kintone-dc-vuecli5

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

1 将 svg，字体等通过 base64 后，作为内联元素引入
2 修改.env 下的两个变量。因为只有 VUE_APP 开头的才会被客户端引入
3 修改 request.js 的 env 变量名
4 通过 vue ui 可以看到暴露自定义的 js 地址
https://localhost:8080/js/chunk-vendors.js
https://localhost:8080/js/app.js

todo
5 开发环境无需打包
6 sourcemap 已经实现
7 固定打包后的 js 文件名
8 webpack5 的 devserver 的 https 新写法
9 搞懂 dev server 中的 ws
