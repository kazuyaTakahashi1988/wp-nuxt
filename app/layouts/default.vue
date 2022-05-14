<template>
  <div>
    {{ /* ----------------------------------------------
	  ▽ 共通ヘッダー ▽
	---------------------------------------------- */ }}
    <CommonHeader />

    {{ /* ----------------------------------------------
	  ▽ コンテンツ ▽
	---------------------------------------------- */ }}
    <nuxt />

    {{ /* ----------------------------------------------
	  ▽ 共通フッター ▽
	---------------------------------------------- */ }}
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "~/components/CommonHeader.vue";
import CommonFooter from "~/components/CommonFooter.vue";

export default {
  components: { CommonHeader, CommonFooter },
};
</script>
