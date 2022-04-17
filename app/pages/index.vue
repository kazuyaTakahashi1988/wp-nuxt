<template>
<div class="container">

	<!-- ▼▼▼ Swiper start ▼▼▼ -->
		<br><Logo />
	<!-- ▲▲▲ Swiper end ▲▲▲ -->


	<!-- ▼ ▼ div start ▼ ▼ -->
	<div class="mainClm">
		<!-- ▼ ▼ aside start ▼ ▼ -->
		<div class="side fadeDown">
			<img src="https://tpc.googlesyndication.com/simgad/17346908885828322363" alt="#" width="100%"><br><br>
			<img src="https://s0.2mdn.net/8071639/JP-JAP_nb-09_0_300x250_Standard_GIF_SD-WAN-Linker-A_cc000002.gif" alt="#" width="100%">
		</div>
		<!-- ▲ ▲ aside end ▲ ▲ -->

		<!-- ▼ ▼ main start ▼ ▼ -->
		
		<div class="main">
			<h2 class="ttl ttl02"><span>Posts</span></h2>
			<article class="post" v-for="(post, index) in tops" :key="post.id">
				<a @click="routepush(post.id)">
					<!-- <div>id:{{ post.id }}</div> -->
					<div v-if="post._embedded['wp:featuredmedia']" class="thum">
						<img :src="post._embedded['wp:featuredmedia'][0].source_url" alt="サムネイル">
      				</div>		  
			        <div v-else class="thum noImages"><span>no-images</span></div>
					<div class="date">{{ post.date.slice(0, 10) }}</div>
					<div class="ttl">{{ post.title.rendered }}</div>
					<div class="content" v-html="post.content.rendered"></div>
				</a>
			</article>
		</div>
		<!-- ▲ ▲ main end  ▲▲ -->
	</div>
	<!-- ▲▲▲ mainClm end ▲▲▲ -->

</div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

import Header from '~/mixins/header'
import Logo from '~/components/Logo.vue'
import Swiper from '~/components/Swiper.vue'

export default {
  mixins: [Header],
  components: {
    Logo,
    Swiper,
  }, // components end
  async asyncData({ store }){
    if (store.getters['tops'].length){
      return
    } else {
      await store.dispatch('fetchTops', { page: 1, per: 5, })
    }
    return {  // meta & OGP
      meta: {
        title: 'Home',
        description: 'Homeのディスクリプション',
        type: 'website',
        image: 'http://35.76.243.135/ogp.jpg',
        url: 'http://35.76.243.135/'
      }
    }
  },
  computed: {
    ...mapGetters(['tops'])
  },
//   transition: 'bounce',
  methods: {
      routepush(perid) {
        this.$router.push('/post/detail/' + perid);
      }
  }
} // export default end
</script>
