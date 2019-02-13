<!--suppress ALL -->
<template>
	<section class="section advantages"
			 style="background-image: url('/static/img/advantagesBg.jpg')"
			 v-if="advantagesData">
		<div class="container">
			<div class="section__title">
				{{ advantagesData.fields.header }}
			</div>
			<div class="advantages__list">
				<advantages-item v-for="item in advantagesData.subfields"
								 :title="item.adv_title"
								 :icon="item.adv_icon"
								 :text="item.adv_text"
								 :mainurl="mainurl"
								 :key="item.adv_title + '1'"
								 :url="item.adv_url"/>
			</div>

			<div class="advantagesSlider swiper-container" v-swiper:advantagesSlider="sliderOption">
				<div class="swiper-wrapper">
					<advantages-item v-for="item in advantagesData.subfields"
									 :key="item.adv_title"
									 :title="item.adv_title"
									 :icon="item.adv_icon"
									 :text="item.adv_text"
									 :mainurl="mainurl"
									 class="swiper-slide"
									 :url="item.adv_url"/>
				</div>
				<div class="swiper-pagination"></div>
			</div>

		</div>
	</section>
</template>

<script>
  import store from '@/store'
  import AdvantagesItem from './AdvantagesItem'

  export default {
    name: 'Advantages',
    components: {
      AdvantagesItem,
    },
    props: ['advantagesData'],
    data: () => ({
      sliderOption: {
        spaceBetween: 8,
        pagination: {
          el: '.advantagesSlider .swiper-pagination',
          type: 'bullets',
        }
      },
    }),
    computed: {
      mainurl: () => {
        return store.state.mainurl;
      }
    }
  };
</script>
