module.exports = {
  /*
   ** Headers of the page
   */
    head: {
    title: '资金资产对接平台',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv':"Access-Control-Allow-Origin", content:"*"},
      { 'http-equiv':"x-ua-compatible", content:"ie=edge,chrome=1"},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '资金资产对接平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'},
      { rel: 'stylesheet', href: 'https://cdn.staticfile.org/normalize/5.0.0/normalize.min.css'},
      { rel: 'stylesheet', href: 'https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css'},
    ]
  },
/*  plugins: [
    { src: '~plugins/axios.js' }
  ],*/
  /*
  ** Global CSS
  */
  css: ['~/assets/css/common.css'],
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      'axios',
      'jquery',
      'toastr'
    ],
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
/*          loader: 'eslint-loader',*/
          exclude: /(node_modules)/
        })
      }
    }
  }
}
