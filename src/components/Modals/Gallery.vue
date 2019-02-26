<template>
	<modal name="gallery-modal"
		   :adaptive="true"
		   height="100%"
		   width="100%">
			<span class="modal-close" @click="hide()">
					<svgicon icon="close" width="20" height="20" class="field__icon"></svgicon>
				</span>
		<div class="modal-wrapper">


			<div class="galleryModal">
				<div class="galleryModal-container swiper-container"
					 ref="galleryModalSlider"
					 v-if="objectData !== ''"
					 v-swiper:galleryModal="">
					<div class="swiper-wrapper">
						<div class="swiper-slide"
							 v-for="slide in objectData.slider">
							<img :src="replaceUrl(slide)" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
  import '@/compiled-icons/close'
  import store from '@/store';
  import {mapState} from 'vuex';
  import {ObjectService} from '@/common/api.service'

  export default {
    data: () => ({
	  objectData: '',
      // galleryModal: {
      //   speed: 500,
      //   spaceBetween: 50,
      //   navigation: {
      //     nextEl: '.galleryModal .swiper-button-next',
      //     prevEl: '.galleryModal .swiper-button-prev',
      //   },
      // },
	}),
    computed: {
      ...mapState({
        catalogType: state => state.filter.catalogType,
      })
    },
    methods: {
      replaceUrl(url) {
        let newUrl = url.replace(/\s/g, '%20');
        return newUrl;
      },
      hide() {
        this.$modal.hide('gallery-modal');
      },
      scrollTo() {
        this.fetchSend();
        this.$modal.hide('gallery-modal');
      },
    },
	mounted() {
      ObjectService
        .get(this.$route.params.objectId)
        .then(({data}) => {
          this.objectData = data;
        }).then(() => {
      });
	}
  }
</script>
