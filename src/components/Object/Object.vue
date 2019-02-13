<template>
	<transition name="component-fade" mode="out-in">
		<div class="page-object">
			<div class="preloader" v-if="preloader"></div>
			<div class="objectHeader" ref="objectHeader">
				<div class="container">
					<div class="objectHeader__title">
						{{ objectData.title }}
					</div>
					<div class="infoPlace__item" v-if="objectData.square">
						<div class="infoPlace__icon">
							<svgicon icon="area" width="24" height="24"></svgicon>
						</div>
						<div class="infoPlace__value">
							{{ objectData.square }}
						</div>
					</div>

					<div class="infoPlace__item" v-if="objectData.price">
						<div class="infoPlace__icon">
							<svgicon icon="price" width="24" height="24"></svgicon>
						</div>
						<div class="infoPlace__value item-price">
							{{ formatPrice(objectData.price) }}
						</div>
					</div>
				</div>
			</div>
			<section class="object">
				<div class="container">
					<div class="object__head">
						<div class="col col_left">
							<ul class="breadcrumbs">
								<li class="breadcrumbs__item">
									<router-link to="/catalogue">Каталог</router-link>
								</li>
								<!--<li class="breadcrumbs__item">-->
								<!--<a href="#">Коммерческие объекты</a>-->
								<!--</li>-->
							</ul>
							<div class="object__title">
								{{ objectData.title }}
							</div>
							<div class="object__location">
								<svgicon icon="point-card" width="14" height="18"></svgicon>
								<span>
								{{ objectData.location }}
							</span>
								<a href="#" class="location__link">На карте</a>
							</div>
						</div>
						<div class="col col_right">
							<div class="infoPlace">
								<div class="infoPlace__item" v-if="objectData.square">
									<div class="infoPlace__icon">
										<svgicon icon="area" width="24" height="24"></svgicon>
									</div>
									<div class="infoPlace__value">
										{{ objectData.square }}
									</div>
								</div>

								<div class="infoPlace__item" v-if="objectData.price">
									<div class="infoPlace__icon">
										<svgicon icon="price" width="24" height="24"></svgicon>
									</div>
									<div class="infoPlace__value item-price">
										{{ formatPrice(objectData.price) }}
									</div>
								</div>
							</div>
							<div class="col__row">
								<!--<div class="object__date">
									Добавлено: 22 сентября
								</div>-->
								<button class="btn btn-favorite" @click="toggleFavorite()"
										:class="{'is-active': favoriteStatus}"
										ref="favBtn">
									<svgicon icon="star" width="24" height="24"></svgicon>
									<span v-if="favoriteStatus">В избранном</span>
									<span v-if="!favoriteStatus">В избранное</span>
								</button>
							</div>
						</div>
					</div>
					<div class="object__inner">
						<div class="col col_left" id="galleryCol">
							<affix class="object__wrapper"
								   relative-element-selector="#galleryCol"
								   :offset="{ top: 120, bottom: 0 }"
								   ref="galleryWrapper">
								<div class="galleryMain swiper-container"
									 ref="galleryMainSlider"
									 v-swiper:galleryMainSlider="galleryMain">
									<div class="swiper-wrapper">
										<div class="swiper-slide"
											 v-for="slide in objectData.slider"
											 :style="{ backgroundImage: `url('${replaceUrl(mainurl + slide)}')` }">
											<a href="#" class="gallery__zoom" @click.prevent="showGallery()">
												<span></span>
											</a>
										</div>
									</div>
								</div>

								<div class="galleryThumbs">
									<div class="galleryThumbs__item"
										 v-for="slide, index in objectData.slider"
										 :class="[activeThumbs === index ? 'is-active' : '']"
										 @click="slideTo(index)"
										 :style="{ backgroundImage: `url('${replaceUrl(mainurl + slide)}')` }">
									</div>
								</div>

								<!--<div class="galleryThumbs swiper-container"-->
									 <!--ref="galleryThumbsSlider"-->
									 <!--v-swiper:galleryThumbsSlider="galleryThumbs">-->
									<!--<div class="swiper-button swiper-button-prev"></div>-->
									<!--<div class="swiper-button swiper-button-next"></div>-->
									<!--<div class="swiper-wrapper">-->
										<!--<div class="swiper-slide"-->
											 <!--v-for="slide in objectData.slider"-->
											 <!--:style="{ backgroundImage: `url('${replaceUrl(mainurl + slide)}')` }">-->
										<!--</div>-->
									<!--</div>-->
								<!--</div>-->
							</affix>
						</div>
						<div class="col col_right">
							<div class="infoMobile">
								<div class="infoPlace">
									<div class="infoPlace__item" v-if="objectData.square">
										<div class="infoPlace__icon">
											<svgicon icon="area" width="24" height="24"></svgicon>
										</div>
										<div class="infoPlace__value">
											{{ objectData.square }}
										</div>
									</div>

									<div class="infoPlace__item" v-if="objectData.price">
										<div class="infoPlace__icon">
											<svgicon icon="price" width="24" height="24"></svgicon>
										</div>
										<div class="infoPlace__value item-price">
											{{ formatPrice(objectData.price) }}
										</div>
									</div>
								</div>
								<div class="col__row">
									<div class="object__date">
										Добавлено: <span>22 сентября</span>
									</div>
									<button class="btn btn-favorite" @click="toggleFavorite()"
											ref="favBtn">
										<svgicon icon="star" width="24" height="24"></svgicon>
										<span v-if="favoriteStatus">В избранном</span>
										<span v-if="!favoriteStatus">В избранное</span>
									</button>
								</div>
							</div>
							<div class="objectBox">
								<div class="objectBox__text" v-html="objectData.description">
									{{ objectData.description }}
								</div>
								<div class="objectBox-info">
									<div class="objectBox__title">Общая информация</div>
									<div class="objectBox-info__list">
										<div class="objectBox-info__item flex flex-vcenter"
											 v-for="item in objectData.params">
												<div class="objectBox-info__icon"><img :src="'/images/data/' + item.icon" /></div>
												<div class="objectBox-info__header">{{ item.header }}</div>
										</div>
									</div>
								</div>
								<div class="objectBox__table">
									<table>
										<tr v-if="item.header && item.description"
											v-for="item in objectData.chars">
											<td>{{item.header}}</td>
											<td>{{item.description}}</td>
										</tr>
									</table>
								</div>
								<div class="objectBox__map">
									<div class="share">
										<div class="share__title">
											Поделиться:
										</div>
										<ul class="shareList">
											<li class="shareList__item">
												<a href="#">
													<img src="/static/img/fb.svg" alt="">
												</a>
											</li>
											<li class="shareList__item">
												<a href="#">
													<img src="/static/img/vk.svg" alt="">
												</a>
											</li>
										</ul>
									</div>
									<div id="map" v-if="mapOptions.coords">
										<yandex-map
												class="ymap"
												:coords="mapOptions.coords"
												:placemarks="mapOptions.placemarks"
												:scroll-zoom="false"
										>
											<ymap-marker
													marker-type="placemark"
													:coords="mapOptions.coords"
													hint-content="Hint content 1"
													:balloon="{header: 'header', body: 'body', footer: 'footer'}"
													:icon="{color: 'green', glyph: 'cinema'}"
													markerId="1"
											></ymap-marker>
										</yandex-map>
									</div>
								</div>
							</div>
							<div id="map" v-if="mapOptions.coords">
								<yandex-map
										class="ymap"
										:coords="mapOptions.coords"
										:placemarks="mapOptions.placemarks"
										:scroll-zoom="false"
								>
									<ymap-marker
											marker-type="placemark"
											:coords="mapOptions.coords"
											hint-content="Hint content 1"
											:balloon="{header: 'header', body: 'body', footer: 'footer'}"
											:icon="{
											  layout: 'default#image',
											  imageHref: '/static/img/pointsm.svg',
											  imageSize: [43, 55],
											  imageOffset: [-22, -55]
											}"
											markerId="1"
									></ymap-marker>
								</yandex-map>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section v-if="fetchCards" class="grid-carousel">
				<div class="container">
					<div class="section__head">
						<div class="section__title section__title_sm">
							Похожие варианты:
						</div>
						<div class="section__head__right">
							<div class="swiper-controls">
								<div class="swiper-button swiper-button-prev"></div>
								<div class="swiper-button swiper-button-next"></div>
							</div>
						</div>

					</div>
					<grid-slider :slides="fetchCards"></grid-slider>
				</div>
			</section>
		</div>
	</transition>
</template>

<script>
  import '../../compiled-icons/star'
  import GridSlider from '@/components/GridSlider.vue'
  import {ObjectService} from '@/common/api.service'
  import store from '@/store';

  import {
    FETCH_FAVORITE_CARDS,
    ADD_FAVORITE_CARDS,
    REMOVE_FAVORITE_CARDS
  } from '@/store/actions.type'

  export default {
    name: 'Object',
    components: {
      GridSlider
    },
    data: () => ({
      preloader: true,
      mapOptions: {
        coords: '',
        placemarks: [
          {
            coords: [44.948314, 34.100192],
            icon: {
              layout: 'default#image',
              imageHref: '/static/img/point.svg',
              imageSize: [27, 46],
              imageOffset: [-13, -46]
            },
          }
        ],
      },
	  activeThumbs: 0,
      fetchCards: null,
      galleryMain: {
        speed: 500,
      },
      favoriteStatus: false,
      galleryThumbs: {
        speed: 500,
        slidesPerView: 7,
        spaceBetween: 4,
        breakpoints: {
          1200: {
            slidesPerView: 5,
          }
        },
        navigation: {
          nextEl: '.galleryThumbs .swiper-button-next',
          prevEl: '.galleryThumbs .swiper-button-prev',
        },
      },
      objectData: ''
    }),
    computed: {
      markerIcon() {
        return 'assets/location.svg'
      },
      mainurl() {
        return store.state.mainurl;
      },
    },
    methods: {
      slideTo(index) {
        const galleryMainSlider = this.$refs.galleryMainSlider.swiper;
        galleryMainSlider.slideTo(index);
	  },
      formatPrice(value) {
	    if (isNaN(value))
			value = 0
        let val = (value.split(',')[0]/1).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      replaceUrl(url) {
        let newUrl = url.replace(/\s/g, '%20');
        return newUrl;
      },
      checkFavorite() {
        let self = this;

        Object.keys(store.state.favorite.favoriteObjects).forEach((key) => {
          if (key === this.$route.params.objectId) {
            self.favoriteStatus = true;
          } else {
            // self.favoriteStatus = false;
          }
        })
      },
      toggleFavorite() {
        if (store.state.auth.isAuthenticated !== false) {
          let self = this;
          let data = {
            id: this.$route.params.objectId,
            token: store.state.auth.user.token
          };

          if (this.favoriteStatus === false) {
            store.dispatch(ADD_FAVORITE_CARDS, data).then((res) => {
              res === true ? self.favoriteStatus = true : self.favoriteStatus = false;
            })
          } else {
            store.dispatch(REMOVE_FAVORITE_CARDS, data).then((res) => {
              res === true ? self.favoriteStatus = false : self.favoriteStatus = true;
            })
          }
		} else {
          this.$modal.show('sign-in');
		}

      },
      whiteSpaces(value) {
        return value.replace(' ', '%');
      },
      toggleObjectHeader() {
        window.addEventListener('scroll', () => {

          if (this.$route.name === 'Object') {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
              this.$refs.objectHeader.classList.add('is-active')
            } else {
              this.$refs.objectHeader.classList.remove('is-active')
            }
          }

        });
      },
	  showGallery() {
        this.$modal.show('gallery-modal');
	  }
    },
    mounted() {
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      this.checkFavorite();

      ObjectService
        .get(this.$route.params.objectId)
        .then(({data}) => {
          this.objectData = data;
          this.mapOptions.coords = [data.x, data.y];
        }).then(() => {
        this.preloader = false;
      });

      this.$nextTick(() => {
        const galleryMainSlider = this.$refs.galleryMainSlider.swiper;
        // const galleryThumbsSlider = this.$refs.galleryThumbsSlider.swiper;
		const self = this;

		galleryMainSlider.on('slideChange', () => {
          this.activeThumbs = galleryMainSlider.activeIndex;
        });

        // galleryMainSlider.controller.control = galleryThumbsSlider;
        // galleryThumbsSlider.controller.control = galleryMainSlider;

      });

      setTimeout(() => {
        // fixedBlock(this.$refs.galleryWrapper, 80 + 48, 0);
        this.toggleObjectHeader();
      }, 1000)

    },
  }
</script>
