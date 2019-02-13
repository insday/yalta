<template>
	<div class="section-wrapper">
		<section class="hero">
			<div class="heroSlider__bg">
				<div v-swiper:mySwiper="heroMainOption" class="swiper-container"
					 ref="heroMainSlider">
					<div class="swiper-wrapper">
						<div class="swiper-slide" :key=slide.back :data-item="slide.back" v-for="slide in sliders">
							<progressive-background
								:blur="30"
								:src="slide.back"
								class="heroSlider__slide"></progressive-background>
						</div>
					</div>
				</div>
			</div>
			<div class="hero__inner">
				<div class="container">
					<div class="hero__top">
						<div class="hero__left">
							<HeroInfo
									v-if="offerInfo"
									:title="offerInfo.header_big"
									:subtitle="offerInfo.header_small"
									:btn="'Подробнее об услуге'"/>
						</div>
						<div class="hero__right">
							<LocationSlider :slides="sliders" ref="locationSlider"/>
						</div>
					</div>
					<div class="hero__bottom">
						<Offer :data="offerInfo"/>
					</div>
				</div>
			</div>
		</section>
		<div class="offer-wrapper">
			<Offer :data="offerInfo"/>
		</div>
	</div>
</template>

<script>
  import Offer from './Offer';
  import LocationSlider from './LocationSlider';
  import HeroInfo from './HeroInfo';

  export default {
    components: {
      Offer,
      LocationSlider,
      HeroInfo,
    },
    props: ['offerInfo', 'sliders', 'mainurl'],
    data: () => ({
      heroMainOption: {
        speed: 500,
        effect: 'fade',
		slidesPerView: 1,
      },
      heroMain: null,
      locationSlider: null,
    }),
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.heroMainSlider.swiper;
        const swiperThumbs = this.$refs.locationSlider.mySwiper2;

        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      });
    },
    methods: {},
  };
</script>
