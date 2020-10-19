const path = require('path')
const webpack = require('webpack')
// const CompressionPlugin = require('compression-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  lintOnSave: true,
  configureWebpack: config => {
    const plugins = []
    /**
     * 兼容ie版本
     * 影响速度
     * 插件位置 babel.config.js  plugins
     */
    // entry: ['@babel/polyfill', './src/main.js'],
    plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
    )
    /**
     * gzip
     * 可以打包为gz压缩
     */
    // process.env.NODE_ENV === 'production' && plugins.push(
    //   new CompressionPlugin()
    // )
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    config
      .resolve
      .alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    // 打包大小
    // config
    //   .plugin('webpack-bundle-anlyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // host: '0.0.0.0',
    // disableHostCheck: true,
    port: '6681',
    proxy: {
      // '/api': {
      //   target: 'http://192.168.1.171:8902/',
      //   pathRewrite: { '^/api': '/api' },
      //   secure: false
      // },
      // '/system': {
      //   target: 'http://192.168.1.171:8881/',
      //   pathRewrite: { '^/system': '/system' },
      //   secure: false
      // },
      // '/admin': {
      //   target: 'http://192.168.1.171:8888/',
      //   pathRewrite: { '^/admin': '/admin' },
      //   secure: false
      // },
      '/*': {
        target: 'http://182.92.160.69:7777'
        // target: 'http://jiadacc.com'
      },
    }
  }
}
