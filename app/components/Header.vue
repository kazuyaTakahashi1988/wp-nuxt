<template>
<div>
<header>
<!-- ▼▼▼ header start ▼▼▼ -->
<!-- <nuxt-link to="/">Home</nuxt-link> | -->

	<div class="head_bar clear">
		<div class="logo_area"><a href="http://wp.empty-service.com/" target="_blank"><img src="@/assets/images/logo.png" alt="ロゴタイトル"></a></div>
		<div class="right_clmn">
			<nav>
				<ul>
					<li data-title="h01" class="hover_btn min"><nuxt-link to="/">Home</nuxt-link>
					</li>
					<li data-title="h02" class="hover_btn min"><nuxt-link to="/post">Posts</nuxt-link>
					<li data-title="h03" class="hover_btn min"><nuxt-link to="/custom">customPosts</nuxt-link>
					<li data-title="h04" class="hover_btn min"><nuxt-link to="/contact">Contact</nuxt-link>
					</li>
				</ul>
			</nav>
		</div>

		<div id="sp_btn">&nbsp;</div>
		<div class="clear">&nbsp;</div>
	</div>

</header>
<!-- ▲▲▲ header end ▲▲▲ -->

<!-- ▼▼▼ SP-hidden-nav ▼▼▼ -->
<div class="sp_nav" id="sp_nav">
<nav class="min">
	<ul class="layer01">
		<li class="close_link"><nuxt-link to="/">Home</nuxt-link></li>
		<li class="close_link"><nuxt-link to="/post">Posts</nuxt-link></li>
		<li class="close_link"><nuxt-link to="/custom">Custom</nuxt-link></li>
		<li class="close_link"><nuxt-link to="/contact">Contact</nuxt-link></li>

	</ul>
</nav>
</div>
<div class="clear_btn" id="clear_btn">&nbsp;</div>
<!-- ▲▲▲ SP-hidden-nav  ▲▲▲ -->

</div>
</template>