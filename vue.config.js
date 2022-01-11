const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const { readFileSync } = require('fs')
const KintoneUploaderWebpackPlugin = require('./webpackPlugins/kintoneUploader')

const url = process.env.BASE_URL
const user = process.env.USER_NAME
const password = process.env.PASSWORD
const outputDir = resolve(__dirname, 'dist/js')
const envOptions = {
  url,
  user,
  password,
  outputDir,
}

module.exports = defineConfig({
  devServer: {
    // liveReload: true,
    // hot: false,
    webSocketServer: false,
    https: {
      key: readFileSync(resolve(__dirname, '../sslKey/localhost+2-key.pem')),
      cert: readFileSync(resolve(__dirname, '../sslKey/localhost+2.pem')),
    },
  },
  transpileDependencies: true,
  // productionSourceMap: false,

  css: {
    extract: false,
  },

  //todo 需要判断是否是否是production
  chainWebpack: (config) => {
    //无需构建html静态资源
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    //svg, fonts 等资源以base64编码后，以内联资源方式引入。
    const svgRule = config.module.rule('svg')
    svgRule.set('generator', {})
    svgRule.set('type', 'asset/inline').end()
    const fontsRule = config.module.rule('fonts')
    fontsRule.set('generator', {})
    fontsRule.set('type', 'asset/inline').end()
    if (process.env.NODE_ENV === 'production') {
      config.plugin('kintoneUploader').use(KintoneUploaderWebpackPlugin, [envOptions])
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        _v: resolve(__dirname, 'src/views'),
      },
    },
  },
})
