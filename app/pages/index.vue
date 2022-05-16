<template>
  <div class="container">
  {{ /* ----------------------------------------------
	  ▽ スワイパースライダー ▽
	---------------------------------------------- */ }}
    <PartsSwiper />

  {{ /* ----------------------------------------------
	  ▽ 記事リスト ▽
	---------------------------------------------- */ }}
    <div class="postClm">
      <h2 class="ttl ttl02"><span>new Post</span></h2>
      <PartsArticle :posts="tops" postType="posts" />
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import metaHead from "~/mixins/header";
import PartsSwiper from "~/components/PartsSwiper.vue";
import PartsArticle from "~/components/PartsArticle.vue";

export default {
  mixins: [metaHead],
  components: {
    PartsSwiper,
    PartsArticle,
  },
  async asyncData({ store }) {
  /* ----------------------------------------------
	  ▽ 記事取得の処理 ▽
	---------------------------------------------- */
    if (store.getters["tops"].length) {
      return;
    } else {
      await store.dispatch("fetchTops", { page: 1, per: 5 });
    }
  /* ----------------------------------------------
	  ▽ meta & OGP ▽
	---------------------------------------------- */
    return {
      meta: {
        title: "Home",
        description: "Homeのディスクリプション",
        type: "website",
        image: "http://35.76.243.135/ogp.jpg",
        url: "http://35.76.243.135/",
      },
    };
  },
  computed: {
  /* ----------------------------------------------
	  ▽ 取得記事を変数にセット ▽
	---------------------------------------------- */
    ...mapGetters(["tops"]),
  },
  /* ----------------------------------------------
    ▽ トランジションアニメーション ▽
  ---------------------------------------------- */
  transition: "fadeIn",
};
</script>
