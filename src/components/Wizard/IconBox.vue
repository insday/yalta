<template>
	<div class="iconBox">
		<div class="iconBox__icon">
			<img :src="icon" alt="">
		</div>
		<router-link to="/catalogue" class="btn btn-catalog"
					 v-if="btn"
					 type="button">
			<svgicon icon="catalogobject"
					 width="33"
					 height="33"></svgicon>
			<span>Перейти в каталог</span>
		</router-link>
	</div>
</template>

<script>
  export default {
	props: ['icon', 'btn']
  }
</script>
