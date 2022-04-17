export default {
    head() {
      return {
        htmlAttrs: {
          lang: 'ja'
        },
        title: (this.meta && this.meta.title) || 'デフォルトのタイトル',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          {
            hid: 'description',
            name: 'description',
            content:
              (this.meta && this.meta.description) || 'デフォルトのdescription'
          },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@uzr4b' },
          { hid: 'twitter:image', name: 'twitter:image', content: (this.meta && this.meta.image) || 'http://35.76.243.135/ogp.jpg'},
          {
            hid: 'og:type',
            property: 'og:type',
            content:  (this.meta && this.meta.type) || 'website'
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: (this.meta && this.meta.title) || 'デフォルトのタイトル'
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: (this.meta && this.meta.url) || 'http://35.76.243.135/'
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: (this.meta && this.meta.description) || 'デフォルトのdescription'
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: (this.meta && this.meta.image) || 'http://35.76.243.135/ogp.jpg'
          },
          { hid: 'og:site_name', name: 'og:site_name', content: 'NuxtSampleApp' },
        ]
      }
    }
  }