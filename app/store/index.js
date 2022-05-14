import Vuex from "vuex";
const RestUrl = "http://wp.empty-service.com"; // WPサイトのルートパス
const postPer = 5; // 表示記事数

export default () =>
  new Vuex.Store({
    state: {
      tops: [], // Topページ
      posts: [], // Postページ
      postDetaile: [], // Post詳細ページ
      category: [], // Category一覧ページ
      customPosts: [], // Customページ
      customPostsDetaile: [], // Custom詳細ページ
      postPer: postPer, // 表示記事数
    },
    getters: {
      tops: (state) => state.tops, // Topページ
      posts: (state) => state.posts, // Postページ
      postDetaile: (state) => state.postDetaile, // Post詳細ページ
      category: (state) => state.category, // Category一覧ページ
      customPosts: (state) => state.customPosts, // Customページ
      customPostsDetaile: (state) => state.customPostsDetaile, // Custom詳細ページ
      postPer: (state) => state.postPer, // 表示記事数
    },
    mutations: {
      setTops(state, { tops }) {
        state.tops = tops;
      }, // Topページ
      setPosts(state, { posts }) {
        state.posts = posts;
      }, // Postページ
      setCategory(state, { category }) {
        state.category = category;
      }, // Post詳細ページ
      setPostDetaile(state, { postDetaile }) {
        state.postDetaile = postDetaile;
      }, // Category一覧ページ
      setcustomPosts(state, { customPosts }) {
        state.customPosts = customPosts;
      }, // Customページ
      setcustomPostsDetaile(state, { customPostsDetaile }) {
        state.customPostsDetaile = customPostsDetaile;
      }, // Custom詳細ページ
    },
    actions: {
      async fetchTops({ commit }, { page }) {
        const tops = await this.$axios.$get(
          `${RestUrl}/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${postPer}`
        );
        commit("setTops", { tops });
      }, // Topページ
      async fetchPosts({ commit }, { page }) {
        const posts = await this.$axios.$get(
          `${RestUrl}/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${postPer}`
        );
        commit("setPosts", { posts });
      }, // Postページ
      async fetchPostDetaile({ commit }, { id }) {
        const postDetaile = await this.$axios.$get(
          `${RestUrl}/wp-json/wp/v2/posts/${id}?_embed`
        );
        commit("setPostDetaile", { postDetaile });
      }, // Post詳細ページ
      async fetchCategory({ commit }, { page, slug }) {
        const category = await this.$axios.$get(
          `${RestUrl}/wp-json/wp/v2/posts?_embed&filter[category_name]=${slug}&per_page=100`
        );
        commit("setCategory", { category });
      }, // Category一覧ページ
      async fetchcustomPosts({ commit }, { page }) {
        const customPosts = await this.$axios.$get(
          `${RestUrl}/wp-json/wp/v2/custom?_embed&page=${page}&per_page=${postPer}`
        );
        commit("setcustomPosts", { customPosts });
      }, // Customページ
      async fetchcustomPostsDetaile({ commit }, { id }) {
        const customPostsDetaile = await this.$axios.$get(
          `${RestUrl}/wp-json/wp/v2/custom/${id}?_embed`
        );
        commit("setcustomPostsDetaile", { customPostsDetaile });
      }, // Custom詳細ページ
    },
  });
