import { svgSprite } from './src/helpers/svg-sprite/index';

export default {
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

  css: [
    '~/assets/scss/base/index',
    '~/assets/scss/helpers/index',
    '~/assets/scss/components/index',
    'node_modules/ag-grid-community/dist/styles/ag-grid.css',
    'node_modules/filepond/dist/filepond.min.css',
    'node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/mixins/index.scss',
      '~/assets/scss/variables/index.scss',
    ],
  },

  plugins: [
    '~/plugins/workers.client.ts',
    '~/plugins/axios.ts',
    '~/plugins/ag-grid.client.ts',
    '~/plugins/filepond.ts',
  ],

  components: true,

  buildModules: ['@nuxt/typescript-build'],

  srcDir: 'src/',

  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/svg',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
  ],

  svgSprite,

  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
};
