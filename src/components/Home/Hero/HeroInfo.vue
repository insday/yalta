<template>
	<div>
		<div class="hero__title" v-html="title"/>
		<div class="hero__location" v-html="subtitle"/>
		<div class="hero__button" v-if="btn">
			<a href="#wizardBox" v-smooth-scroll="{duration: 1000}"
			   class="btn btn-primary" v-html="btn"/>
		</div>
	</div>
</template>

<script>
  export default {
    props: ['title', 'subtitle', 'btn']
  }
</script>
