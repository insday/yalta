<template>
	<div class="grid-slider swiper-container" v-swiper:mySwiper="sliderOption">
		<div class="swiper-wrapper">
			<div class="swiper-slide"
				 v-for="card in slides"
				 :key="card.id">
				<Card :photo="mainurl + card.photo"
					  :id="card.id"
					  :title="card.title"
					  :price="card.price"
					  :square="card.square"
					  :location="card.location"
					  :src="card.id"/>
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
  import Card from '@/components/Card';

  export default {
    name: 'grid-slider',
	props: ['slides'],
	components: {
      Card
	},

	data: () => ({
      sliderOption: {
        speed: 500,
        spaceBetween: 30,
        slidesPerView: 3,
        simulateTouch: false,
		breakpoints: {
          1200: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 1,
            spaceBetween: 8
          }
		},
        navigation: {
          nextEl: '.grid-carousel .swiper-button-next',
          prevEl: '.grid-carousel .swiper-button-prev',
        },
        pagination: {
          el: '.grid-carousel .swiper-pagination',
          clickable: true,
        },
      },
	}),
	computed: {
      mainurl() {
        return this.$store.state.mainurl
	  }
	}
  }
</script>
