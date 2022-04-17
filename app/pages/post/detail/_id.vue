<template>
<div>
  <link rel="stylesheet" type="text/css" href="http://kazuya631130.moo.jp/wp/wp-content/themes/twentysixteen/css/editor-blocks.css">
  <link rel="stylesheet" type="text/css" href="http://kazuya631130.moo.jp/wp/wp-content/themes/twentysixteen/css/editor-style02.css">
  <div class="page-post inner1040">
		    	<h2 class="ttl ttl02"><span>{{ postDetaile.title.rendered }}</span></h2>
    
          
          <article class="post-detail">
            <div class="post_contents-area">
              <div class="data">{{ postDetaile.date.slice(0, 10) }}</div>
              <!-- ▽ カテゴリー ▽ -->
              <div class="cate" v-if="postDetaile._embedded['wp:term'][0]">
                <div v-for="category in postDetaile._embedded['wp:term'][0]" :key="category.id"><span>category：</span><nuxt-link :to="`/post/cate/${category.slug}`">{{ category.name }}</nuxt-link></div>
              </div>

              <div class="wclmn">
                <div v-if="postDetaile._embedded['wp:featuredmedia']" class="thum">
                  サムネイル<img :src="postDetaile._embedded['wp:featuredmedia'][0].source_url" alt="サムネイル" id="detaiThum">
                </div>          
                <div v-else class="thum noImages"><span>no-images</span></div>
                <div class="content editor-style" v-html="postDetaile.content.rendered"></div>
              </div>

              <!-- ▽ カスタムフィールドの出力 ▽ -->
              <div class="custam-fields-area">
                <h3 class="ttl">CustomField</h3>
                <div class="sub-title"><span>sub-title：</span>{{ postDetaile.acf.sub_title }}</div>
                <div class="wclmn">
                  <div v-if="postDetaile.acf.sub_thum" class="sub-thum">
                    <span>sub-サムネイル</span>
                    <img v-bind:src="postDetaile.acf.sub_thum"/>
                  </div>
                  <div v-else class="sub-sum thum noImages"><span>no-images</span></div>
                  <div class="sub-conts">
                    <span class="span">sub-コンテンツ</span>
                    <div class="editor-style" v-html="postDetaile.acf.sub_contents"></div>
                  </div>
                </div>
              </div>

            </div>
          </article>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default{
  head() {
    return {
      title: this.postDetaile.title.rendered,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.postDetaile.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,130) },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }, // 画像のタイプ。詳しくは後術。
        { hid: 'twitter:site', name: 'twitter:site', content: '@uzr4b' },
        { hid: 'twitter:image', name: 'twitter:image', content: this.postDetaile._embedded['wp:featuredmedia'][0].source_url}, // 苦労しました。詳しくは後術。
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.postDetaile.title.rendered
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'http://35.76.243.135/post/detail/' + this.postDetaile.id // デプロイ済みであることが前提です。
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.postDetaile.content.rendered.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,130)
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.postDetaile._embedded['wp:featuredmedia'][0].source_url
        },
        { hid: 'og:site_name', name: 'og:site_name', content: 'NuxtSampleApp' }
      ],
    }
  },
	async asyncData({ route, store }){
		if (store.getters['postDetaile'][route.params.id]){
	    	return
	    } else {
	      await store.dispatch('fetchPostDetaile', { id: route.params.id })
      }
	},
	computed: {
		postDetaile(){
			return this.postDetaile[this.$route.params.id]
		},
		...mapGetters(['postDetaile'])
	},
  transition: 'fadeIn',
	validate({ params }) {
		return /^\d+$/.test(params.id)
	},
  mounted: function(){
    var fixedImg = document.getElementById('fixed-img');
    if(fixedImg){
      var detaiThum = document.getElementById('detaiThum');
      var rectdetail = detaiThum.getBoundingClientRect();
      detaiThum.style.opacity = '0';
      Object.assign(fixedImg.style,{ top: rectdetail.top + window.pageYOffset + 'px',left: rectdetail.left + 'px', width: detaiThum.clientWidth + 'px',});
      setTimeout(function () {
        detaiThum.style.opacity = '1';
        fixedImg.style.opacity = '0';
      }.bind(this), 1000)
      setTimeout(function () {
        fixedImg.parentNode.removeChild(fixedImg);
      }.bind(this), 1700)
    }
  }
}
</script>
