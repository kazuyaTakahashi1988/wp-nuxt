<template>
  <div>
    {{/* -------------------------------------------------------
      ▽ 記事リスト  ▽
    ---------------------------------------------------------- */}}
    <article class="post" v-for="(post, index) in posted" :key="post.id">
      <div class="cate" v-if="post._embedded['wp:term']">
        <div
          v-for="category in post._embedded['wp:term'][0]"
          :key="category.id"
        >
          <span>category：</span>{{ category.name }}
        </div>
      </div>
      <a
        @click="
          routepush(post.id, post._embedded['wp:featuredmedia'][0].source_url)
        "
      >
        <div v-if="post._embedded['wp:featuredmedia']" class="thum">
          <img
            :src="post._embedded['wp:featuredmedia'][0].source_url"
            alt="サムネイル"
            :id="'thum' + post.id"
          />
        </div>
        <div v-else class="thum noImages"><span>no-images</span></div>
        <div class="ttl">{{ post.title.rendered }}</div>
        <div class="date">{{ post.date.slice(0, 10) }}</div>
        <div class="content">
          {{ post.content.rendered.replace(/(<([^>]+)>)/gi, "").slice(0, 130) }}
        </div>
      </a>
    </article>

    {{/* -------------------------------------------------------
      ▽ ページャー  ▽
    ---------------------------------------------------------- */}}
    <ul class="pager" v-if="postPer">
      <li v-for="n of Math.ceil(postCounts / postPer)" :key="n">
        <nuxt-link :to="`/${postType}/page/${n}`">{{ n }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postCounts: "",
      posted: [],
    };
  },
  props: {
    posts: { type: Object },
    postType: { type: String },
    postPer: { type: Number },
  },
  methods: {
    /* ----------------------------------------------
	   ▽ リンククリック時の処理 ▽
	  ---------------------------------------------- */
    routepush(perid, thumUrl) {
      if (thumUrl && !document.getElementById("fixed-img")) {
        var thumID = document.getElementById("thum" + perid);
        var rect = thumID.getBoundingClientRect();
        var cImg = document.createElement("img");
        Object.assign(cImg, { id: "fixed-img", src: thumUrl });
        Object.assign(cImg.style, {
          top: rect.top + "px",
          left: rect.left + "px",
          width: thumID.clientWidth + "px",
        });
        document.body.appendChild(cImg);
      }
      this.$router.push(`/${this.postType}/detail/${perid}`);
    },
  },
  mounted: function () {
    this.posted = this.posts;
    /* ----------------------------------------------
	   ▽ ページャー生成の処理 ▽
	  ---------------------------------------------- */
    this.$axios
      .get(`http://wp.empty-service.com/wp-json/wp/v2/${this.postType}/`)
      .then((response) => {
        this.postCounts = response.headers["x-wp-total"];
      });
  },
};
</script>
