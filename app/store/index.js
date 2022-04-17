import Vuex from 'vuex'
const RestUrl = 'http://wp.empty-service.com'; // WPサイトのルートパス
const postPer = 5; // 表示記事数

export default () => ( new Vuex.Store({
	state: {
		tops: [], // Topページ
		posts: [], // Postページ
		postDetaile: [], // Post詳細ページ
		category: [], // Category一覧ページ
		customPosts: [], // Customページ
		customPostsDetaile: [],// Custom詳細ページ
		postPer: postPer, // 表示記事数
	},
	getters: {
		tops: (state) => state.tops,
		posts: (state) => state.posts,
		postDetaile: (state) => state.postDetaile,
		category: (state) => state.category,
		customPosts: (state) => state.customPosts,
		customPostsDetaile: (state) => state.customPostsDetaile,

		postPer: (state) => state.postPer,
	},
	mutations: {
		setTops(state, { tops }){　state.tops = tops　},

		setPosts(state, { posts }){　state.posts = posts　},
		
		setCategory(state, { category }){　state.category = category　},
		setPostDetaile(state, { postDetaile }){　state.postDetaile = postDetaile　},
		setcustomPosts(state, { customPosts }){　state.customPosts = customPosts　},
		setcustomPostsDetaile(state, { customPostsDetaile }){　state.customPostsDetaile = customPostsDetaile　}
	},
	actions: {
		async fetchTops({ commit }, { page }){
			const tops = await this.$axios.$get( RestUrl + '/wp-json/wp/v2/posts?_embed&page=' + page + '&per_page=' + postPer )
			commit('setTops', { tops })
		},

		async fetchPosts({ commit }, { page }){
			const posts = await this.$axios.$get( RestUrl + '/wp-json/wp/v2/posts?_embed&page=' + page + '&per_page=' + postPer )
			commit('setPosts', { posts })
		},
		async fetchPostDetaile({ commit }, { id }){
			const postDetaile = await this.$axios.$get( RestUrl + '/wp-json/wp/v2/posts/' + id + '?_embed')
			commit('setPostDetaile', { postDetaile })
		},

		async fetchCategory({ commit }, { page, slug }){
			const category = await this.$axios.$get( RestUrl + '/wp-json/wp/v2/posts?_embed&filter[category_name]=' + slug + '&per_page=100'　)
			commit('setCategory', { category })
		},

		async fetchcustomPosts({ commit }, { page }){
			const customPosts = await this.$axios.$get( RestUrl + '/wp-json/wp/v2/custom?_embed&page=' + page + '&per_page=' + postPer )
			commit('setcustomPosts', { customPosts })
		},
		async fetchcustomPostsDetaile({ commit }, { id }){
			const customPostsDetaile = await this.$axios.$get( RestUrl + '/wp-json/wp/v2/custom/' + id + '?_embed')
			commit('setcustomPostsDetaile', { customPostsDetaile })
		}
	}

}))


