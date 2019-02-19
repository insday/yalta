<template>
	<div class="advantagesItem" :key="title">
		<div class="advantagesItem__icon">
			<img :src="icon">
		</div>
		<div class="advantagesItem__content">
			<div class="advantagesItem__title">
				{{ title }}
			</div>
			<router-link :to=url class="advantagesItem__link">
				{{ text }}
			</router-link>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'AdvantagesItem',
	props: ['title', 'text', 'icon', 'url'],
  }
</script>
