<template>
  <div v-swiper:mySwiper="heroMainOption" class="swiper-container" ref="heroMainSlider" >
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key=slide.imgPath v-for="slide in heroMain">
        <div class="heroSlider__slide"
             :style="{backgroundImage: 'url('+slide.imgPath+')'}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero-main-slider',
  data: () => ({
    heroMainOption: {
      speed: 500,
      effect: 'fade',
    },
    heroMain: [
      {
        imgPath: '/static/img/hero1.jpg',
      },
      {
        imgPath: '/static/img/hero2.jpg',
      },
      {
        imgPath: '/static/img/hero3.jpg',
      },
    ],
  }),
};
</script>

<style scoped>

</style>
