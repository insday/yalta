<template>
	<div class="newsList__item">
		<router-link
				v-if="singleData"
				:to="{name: 'Single', params: { singleId: id, singleData: singleData }}"
				class="card card_news">
			<div class="card__body">
				<div class="card__date" v-if="date">
					<span>{{ date.split(' ')[0] }}</span>
					<small>{{ date.split(' ')[1] }}</small>
				</div>
				<div class="card__title" v-if="title">{{ title }}</div>
				<div class="card__text" v-if="announce">{{ announce }}
				</div>
				<span class="card__button">Подробнее</span>
			</div>
		</router-link>
	</div>
</template>

<script>
  export default {
    props: ['date', 'title', 'announce', 'id', 'singleData'],

  }
</script>
