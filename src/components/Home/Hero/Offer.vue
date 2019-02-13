<template>
	<div class="offer" v-if="data">
		<div class="offerBox">
			<div class="offerBox__icon">
				<img src="/static/img/house.svg" alt="">
			</div>
			<div class="offerBox__text">
				{{ data.text }}
			</div>
		</div>
		<div class="offer__title">{{ data.header }}</div>
	</div>
</template>

<script>
  export default {
    name: 'offer',
    props: ['data'],
  };
</script>
