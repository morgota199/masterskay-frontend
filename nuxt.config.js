import { svgSprite } from './src/helpers/svg-sprite/index';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'masterskay-frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/base/index',
    '~/assets/scss/helpers/index',
    '~/assets/scss/components/index',
    'node_modules/ag-grid-community/dist/styles/ag-grid.css',
    // 'node_modules/@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/mixins/index.scss',
      '~/assets/scss/variables/index.scss',
    ],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/workers.client.ts',
    '~/plugins/axios.ts',
    '~/plugins/ag-grid.client.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  srcDir: 'src/',

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/svg',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
  ],

  svgSprite,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
};
