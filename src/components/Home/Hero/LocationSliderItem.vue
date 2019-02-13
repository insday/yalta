<template>
	<router-link
			:to="{name: 'Object', params: { objectId: href }}"
			class="locationSlider__item">

		<div class="locationSlider__title"> {{ title }} </div>

		<div class="locationSlider-info">
			<div class="locationSlider-info__item">
				<div class="locationSlider-info__icon">
					<img src="/static/img/area.svg" alt="">
				</div>
				<div class="locationSlider-info__value">
					<span> {{ area.split(' ')[0] }} </span>
					<small v-if="area.split(' ')[1]"> {{ area.split(' ')[1] }}</small>
					<small v-else-if="!area.split(' ')[1]"> руб.</small>
				</div>
			</div>
			<div class="locationSlider-info__item">
				<div class="locationSlider-info__icon">
					<img src="/static/img/price.svg" alt="">
				</div>
				<div class="locationSlider-info__value item-price">
					<span> {{ formatPrice(price) }} </span>
				</div>
			</div>
		</div>

		<div class="locationSlider__address">
			<img src="/static/img/point.svg" alt="">
			<span> {{address}} </span>
		</div>

	</router-link>
</template>

<script>
  export default {
    props: ['index', 'title', 'address', 'area', 'price', 'href'],
    name: 'LocationSliderItem',
	methods: {
      formatPrice(value) {
		if (isNaN(value))
			value = 0
        let val = (value/1).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
	}
  }
</script>
