<template>
	<swiper :options="swiperOption">

	  <swiper-slide>
	  	<PartsLogo />
	  	<div><h1 style="font-family: serif;">nuxt-project<span>REST API is called from <a href="http://wp.empty-service.com/" target="_blank">http://wp.empty-service.com/</a></span></h1></div>
	  </swiper-slide>
	  <swiper-slide>Slide 2</swiper-slide>
	  <swiper-slide>Slide 3</swiper-slide>
	  <swiper-slide>Slide 4</swiper-slide>

	  <div class="swiper-pagination" slot="pagination"></div>
	  <div class="swiper-button-prev" slot="button-prev"></div>
	  <div class="swiper-button-next" slot="button-next"></div>
	  
	</swiper>
</template>

<script>
import PartsLogo from '~/components/PartsLogo.vue'
export default {
  components: { PartsLogo, }, 
  data() {
    return {
      swiperOption: {
      	autoplay: {
      		delay: 4000,
      	},
        loop: true, //無限ループ
        effect: 'fade', // 'slide''fade'など
        pagination: {
        	el: '.swiper-pagination',
        	clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }, // data end
} // export default end
</script>

<style lang="scss"> 
	.swiper-container {
	width: 100%;
	height: 100%;
	}
	.swiper-slide {
	overflow: hidden;
	height: 300px;
	text-align: center;
	background: #f5f5f5;
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
		span{
			display: block;
			font-size: 14px;
			margin-top: 20px;
		}
		a{
			text-decoration: underline;
			color: #00C58E;
		}
	}

	/*	前後ナビ	*/
	.swiper-button-prev { background-size: 15px 15px;/*background-image: url("");*/}
	.swiper-button-next { background-size: 15px 15px;/*background-image: url("");*/}
	/*	ドット　*/
	.swiper-pagination-bullet { opacity: 1; background: #ccc; }
	.swiper-pagination-bullet-active{ opacity: 1; background: #007aff; }
</style>