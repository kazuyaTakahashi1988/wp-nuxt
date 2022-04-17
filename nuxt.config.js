const axios = require('axios')

export default {
  mode: 'universal',
  srcDir: 'app',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ディスクリプション' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }, // 画像のタイプ。詳しくは後術。
      { hid: 'twitter:site', name: 'twitter:site', content: '@uzr4b' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'http://35.76.243.135/ogp.jpg'}, // 苦労しました。詳しくは後術。
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'タイトル。'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'http://35.76.243.135/' // デプロイ済みであることが前提です。
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'ディスクリプション'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'http://35.76.243.135/ogp.jpg'
      },
      { hid: 'og:site_name', name: 'og:site_name', content: 'サイト名' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'swiper/dist/css/swiper.css',
    '@/assets/css/style.scss', // レイアウトのスタイル
    '@/assets/css/transition.scss' // ページ遷移時のtransitionスタイル

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-awesome-swiper'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  sitemap: {
    hostname: 'http://35.76.243.135',
    cacheTime: 1000 * 60 * 15,
    async routes () {

      const getPostRoutes = async function(page = 1) {
        const fragment = await getPostRoutesFragment(page);
        if (fragment.nextPage) {
          return fragment.data.concat(await getPostRoutes(fragment.nextPage));
        } else {
          return fragment.data;
        }
      };

      const getPostRoutesFragment = (page) => {
        return axios.get('http://wp.empty-service.com/wp-json/wp/v2/org_api')
        .then(res => {
          const data = res.data.map(
            post => '/' + post.slug + '/detail/' + post.id
            );
          return {
            data,
            nextPage: page < Number(res.headers['x-wp-totalpages']) ? page + 1 : 0,
          }
        });
      };

      return await getPostRoutes();
    }
  }
}
