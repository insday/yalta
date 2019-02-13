<template>
	<div class="locationSlider">
		<div v-swiper:mySwiper2="locationSliderOption"
			 class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide"
					 :key=slide.title
					 v-for="slide, index in slides">
					<location-slider-item
							:index="index"
							:href="slide.object.id"
							:title="slide.object.title"
							:price="slide.object.price"
							:area="slide.object.square"
							:address="slide.object.city + ' ' + slide.object.location"
					></location-slider-item>
				</div>
			</div>
		</div>
		<div class="swiper-controls">
			<div class="swiper-button-prev swiper-button"></div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-next swiper-button"></div>
		</div>
	</div>
</template>

<script>
  import LocationSliderItem from './LocationSliderItem';

  export default {
    components: {
      LocationSliderItem
	},
    name: 'LocationSlider',
    props: ['slides'],
    data: () => ({
      locationSliderOption: {
        speed: 700,
		slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          500: {
            spaceBetween: 7,
            pagination: {
              type: 'bullets',
            },
          },
        }
      },
    }),
  };
</script>
