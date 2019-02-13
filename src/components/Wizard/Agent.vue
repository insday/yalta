<template>
	<div class="agent__wrapper">
		<div class="agent">
			<div class="agent__photo"
				 :style="{backgroundImage: 'url(' + photo + ')' }"
				></div>
			<div class="agent__info">
				<div class="agent__title">{{name}}</div>
				<div class="agent__subtitle">{{description}}</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
	props: ['name', 'description', 'photo']
  }
</script>
