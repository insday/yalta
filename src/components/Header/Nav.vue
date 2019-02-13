<template>
	<nav class="header__nav nav">
		<ul class="menu">
			<li class="menu__item" :key="item.title" v-for="item in menu">
				<router-link class="menu__link" :to=item.url
							 v-if="item.url !== '/#wizardBox'">
					<svgicon icon="catalogobject" width="22" height="18"
							 v-if="item.url_icon"></svgicon>
					{{ item.url_text }}
				</router-link>

				<router-link :to="item.url"
							 class="menu__link"
							 v-smooth-scroll="{duration: 1000}"
							 v-if="item.url === '/#wizardBox'">
					{{item.url_text}}
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
  import '../../compiled-icons/catalogobject';

  export default {
    name: 'Nav',
    props: ['menu'],
  };
</script>
