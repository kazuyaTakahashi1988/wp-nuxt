<template>
  <div class="postClm customPostClm">
    {{ /* ----------------------------------------------
	    ▽ 記事リスト ▽
	  ---------------------------------------------- */ }}
    <h2 class="ttl ttl02"><span>customPosts 一覧</span></h2>
    <PartsArticle :posts="customPosts" :postPer="postPer" postType="custom" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Header from "~/mixins/header";
import PartsArticle from "~/components/PartsArticle.vue";

export default {
  mixins: [Header],
  components: {
    PartsArticle,
  },
  /* ----------------------------------------------
	  ▽ 記事取得の処理 ▽
	---------------------------------------------- */
  async asyncData({ route, store, error }) {
    await store.dispatch("fetchcustomPosts", { page: route.params.id });

    return {
      /* ----------------------------------------------
	      ▽ meta & OGP ▽
	    ---------------------------------------------- */
      meta: {
        title: "customPosts一覧",
        description: "customPosts一覧のディスクリプション",
        type: "article",
        image: "http://35.76.243.135/ogp.jpg",
        url: "http://35.76.243.135/custom/",
      },
    };
  },
  computed: {
    /* ----------------------------------------------
	    ▽ 取得記事を変数にセット ▽
	  ---------------------------------------------- */
    ...mapGetters(["customPosts", "postPer"]),
  },
  /* ----------------------------------------------
    ▽ トランジションアニメーション ▽
  ---------------------------------------------- */
  transition: "fadeIn",
};
</script>
