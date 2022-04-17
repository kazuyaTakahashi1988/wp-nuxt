<template>
<div>

	<!-- ▼▼▼ header comp ⇒ ['./components/Header.vue'] -->
	<Header />

	<!-- ▼▼▼ pages ⇒ ['./pages/**.vue'] -->
	<nuxt />

	<!-- ▼▼▼ footer comp ⇒ ['./components/Footer.vue'] -->
	<Footer />

</div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: { Header, Footer },
}
</script>
