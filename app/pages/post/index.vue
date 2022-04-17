<template>
<div class="container">
  <div class="page-post inner1040">
		<h2 class="ttl ttl02"><span>Posts 一覧</span></h2>
    <!-- ▼▼▼ 記事繰り返し start ▼▼▼ -->
			<article class="post" v-for="(post, index) in posted" :key="post.id">
        
        <!-- ▽ カテゴリー ▽ -->
        <div class="cate" v-if="post._embedded['wp:term'][0]">
            <div v-for="category in post._embedded['wp:term'][0]" :key="category.id"><span>category：</span><nuxt-link :to="`/post/cate/${category.slug}`">{{ category.name }}</nuxt-link></div>
        </div>

				<a @click="routepush(post.id, post._embedded['wp:featuredmedia'][0].source_url)">
					<!-- <div>id:{{ post.id }}</div> -->
					<div v-if="post._embedded['wp:featuredmedia']" class="thum">
						<img :src="post._embedded['wp:featuredmedia'][0].source_url" alt="サムネイル" :id="'thum' + post.id">
      		</div>
          <div v-else class="thum noImages"><span>no-images</span></div>
					<div class="ttl">{{ post.title.rendered }}</div>
					<div class="date">{{ post.date.slice(0, 10) }}</div>
					<div class="content" v-html="post.content.rendered"></div>
				</a>
        
			</article>

    <!-- ▼▼▼ ページャー start ▼▼▼ -->
    <ul class="pager first">
      <li v-for="n of Math.ceil( postCounts / postPer ) " :key="n">
        <!-- <a @click="pagepush(n)">{{ n }}</a> -->
        <nuxt-link :to="`/post/page/${n}`">{{ n }}</nuxt-link>
      </li>
    </ul>
    <!-- ▲▲▲ ページャー end ▲▲▲ -->
  </div>


</div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

import Header from '~/mixins/header'

export default {
  data() { return {
    postCounts: "",
    posted: []
  } },
  mixins: [Header],
  async asyncData({ route, store, error }){
    await store.dispatch('fetchPosts', { page: 1  })
      
    return { // meta & OGP
      meta: {
        title: 'Posts一覧',
        description: 'Posts一覧のディスクリプション',
        type: 'article',
        image: 'http://35.76.243.135/ogp.jpg',
        url: 'http://35.76.243.135/post/'
      }
    }
  },
  computed: {
    ...mapGetters(['posts', 'postPer'])
  },
  mounted: function(){
      // pegar 処理
      this.$axios.get('http://wp.empty-service.com/wp-json/wp/v2/posts/').then(response => {
          this.postCounts = response.headers['x-wp-total']
      })
      this.posted = this.posts
  },
  // transition: 'fadeIn',
  methods: {
      routepush(perid, thumUrl) {
        if(thumUrl && !document.getElementById('fixed-img')){
          var thumID = document.getElementById('thum' + perid );
          var rect = thumID.getBoundingClientRect();
          var cImg = document.createElement('img');
          Object.assign(cImg, { id: 'fixed-img', src: thumUrl });
          Object.assign(cImg.style,{ top: rect.top + 'px' ,left: rect.left + 'px', width: thumID.clientWidth + 'px',});
          document.body.appendChild(cImg);
        }
        this.$router.push('/post/detail/' + perid);
      }
  }
}
</script>
