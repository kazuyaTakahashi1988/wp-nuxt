<template>
  <div class="page-post inner1040">
    <h2 class="ttl ttl02">
      <span>{{ customPostsDetaile.title.rendered }}</span>
    </h2>
    {{/* -------------------------------------------------------
      ▽ 記事詳細  ▽
    ---------------------------------------------------------- */}}
    <article class="post-detail">
      <div class="post_contents-area">
        <div class="data">{{ customPostsDetaile.date.slice(0, 10) }}</div>

        <div class="wclmn">
          <div
            v-if="customPostsDetaile._embedded['wp:featuredmedia']"
            class="thum"
          >
            サムネイル<img
              :src="
                customPostsDetaile._embedded['wp:featuredmedia'][0].source_url
              "
              alt="サムネイル"
              id="detaiThum"
            />
          </div>
          <div v-else class="thum noImages"><span>no-images</span></div>
          <div
            class="content editor-style"
            v-html="customPostsDetaile.content.rendered"
          ></div>
        </div>

        {{/* -------------------------------------------------------
            ▽ カスタムフィールドの出力 ▽
          ---------------------------------------------------------- */}}
        <div class="custam-fields-area">
          <h3 class="ttl">customField</h3>
          <div class="sub-title">
            <span>sub-title：</span>{{ customPostsDetaile.acf.sub_title }}
          </div>
          <div class="wclmn">
            <div v-if="customPostsDetaile.acf.sub_thum" class="sub-thum">
              <span>sub-サムネイル</span>
              <img v-bind:src="customPostsDetaile.acf.sub_thum" />
            </div>
            <div v-else class="sub-sum thum noImages">
              <span>no-images</span>
            </div>
            <div class="sub-conts">
              <span class="span">sub-コンテンツ</span>
              <div
                class="editor-style"
                v-html="customPostsDetaile.acf.sub_contents"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  head() {
    return {
    /* ----------------------------------------------
	    ▽ meta & OGP ▽
	  ---------------------------------------------- */
      title: this.customPostsDetaile.title.rendered,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: this.customPostsDetaile.content.rendered
            .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
            .substr(0, 130),
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        }, // 画像のタイプ。
        { hid: "twitter:site", name: "twitter:site", content: "@uzr4b" },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content:
            this.customPostsDetaile._embedded["wp:featuredmedia"][0].source_url,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:title",
          property: "og:title",
          content: this.customPostsDetaile.title.rendered,
        },
        {
          hid: "og:url",
          property: "og:url",
          content:
            "http://35.76.243.135/custom/detail/" + this.customPostsDetaile.id, // デプロイ済みであることが前提です。
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.customPostsDetaile.content.rendered
            .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
            .substr(0, 130),
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            this.customPostsDetaile._embedded["wp:featuredmedia"][0].source_url,
        },
        { hid: "og:site_name", name: "og:site_name", content: "NuxtSampleApp" },
      ],
    };
  },
  async asyncData({ route, store }) {
    /* ----------------------------------------------
	    ▽ 記事取得の処理 ▽
	  ---------------------------------------------- */
    if (store.getters["customPostsDetaile"][route.params.id]) {
      return;
    } else {
      await store.dispatch("fetchcustomPostsDetaile", { id: route.params.id });
    }
  },
  computed: {
    /* ----------------------------------------------
	    ▽ 取得記事を変数にセット ▽
	  ---------------------------------------------- */
    customPostsDetaile() {
      return this.customPostsDetaile[this.$route.params.id];
    },
    ...mapGetters(["customPostsDetaile"]),
  },
  /* ----------------------------------------------
    ▽ トランジションアニメーション ▽
  ---------------------------------------------- */
  transition: "fadeIn",
  /* ----------------------------------------------
    ▽ ID取得 ▽
  ---------------------------------------------- */
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  mounted: function() {
    /* ----------------------------------------------
	   ▽ 遷移時の処理 ▽
	  ---------------------------------------------- */
    setTimeout(
      function() {
        var fixedImg = document.getElementById("fixed-img");
        if (fixedImg) {
          var detaiThum = document.getElementById("detaiThum");
          var rectdetail = detaiThum.getBoundingClientRect();
          Object.assign(fixedImg.style, {
            top: rectdetail.top + window.pageYOffset + "px",
            left: rectdetail.left + "px",
            width: detaiThum.clientWidth + "px",
          });
          setTimeout(
            function() {
              detaiThum.style.opacity = "1";
              fixedImg.style.opacity = "0";
            }.bind(this),
            1000
          );
          setTimeout(
            function() {
              fixedImg.parentNode.removeChild(fixedImg);
            }.bind(this),
            1700
          );
        } else {
          var detaiThum = document.getElementById("detaiThum");
          detaiThum.style.opacity = "1";
        }
      }.bind(this),
      300
    );
  },
  /* ----------------------------------------------
    ▽ トランジションアニメーション ▽
  ---------------------------------------------- */
  transition: "fadeIn",
};
</script>
