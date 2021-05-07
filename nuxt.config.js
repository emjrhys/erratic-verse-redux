export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'erratic-verse',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/__/firebase/8.5.0/firebase-app.js', body: true },
      { src: '/__/firebase/init.js', body: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/reset',
    'view-design/dist/styles/iview.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/view-design'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.coffee$/,
        use: ['coffee-loader']
      })
    }
  }
}