<template>
  <div class="postClm">
  {{ /* ----------------------------------------------
	  ▽ 記事リスト ▽
	---------------------------------------------- */ }}
    <h2 class="ttl ttl02"><span>Posts 一覧</span></h2>
    <PartsArticle :posts="posts" :postPer="postPer" postType="posts" />
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
  async asyncData({ route, store, error }) {
    /* ----------------------------------------------
	    ▽ 記事取得の処理 ▽
	  ---------------------------------------------- */
    await store.dispatch("fetchPosts", { page: route.params.id });

    return {
    /* ----------------------------------------------
	    ▽ meta & OGP ▽
	  ---------------------------------------------- */
      meta: {
        title: "Posts一覧",
        description: "Posts一覧のディスクリプション",
        type: "article",
        image: "http://35.76.243.135/ogp.jpg",
        url: "http://35.76.243.135/posts/",
      },
    };
  },
  computed: {
    /* ----------------------------------------------
	    ▽ 取得記事を変数にセット ▽
	  ---------------------------------------------- */
    ...mapGetters(["posts", "postPer"]),
  },
  /* ----------------------------------------------
    ▽ トランジションアニメーション ▽
  ---------------------------------------------- */
  transition: "fadeIn",
};
</script>
