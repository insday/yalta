<template>
	<transition name="component-fade" mode="out-in">
		<div class="page-catalog">
			<section class="section catalog" :class="{'showMap': showMap}">
				<div class="container">
					<div class="section__title">
						Каталог объектов
					</div>
					<form class="form form--filter" @submit.prevent="fetchForm()">
						<FilterForm/>
					</form>
					<div class="results"
						 ref="resultsBox"
						 id="results" v-if="fetchCards.length !== 0">
						<div class="col col_left">
							<button class="btn btn-map" ref="btnMap" @click="toggleMap()">
								<img src="/static/img/map-btn.svg" alt="">
							</button>
							<div class="results__title">
								{{ declOfNum(Object.keys(fetchCards).length, ['Найден',
								'Найдено', 'Найдено']) }}
								{{ Object.keys(fetchCards).length }}
								{{ declOfNum(Object.keys(fetchCards).length, ['объект',
								'объекта', 'объектов']) }}:
							</div>
							<div class="results__list">
								<div class="results__item"
									 v-for="(card, index) in fetchCards"
									 :key="card.id">

									<Card :photo="replaceUrl('/images/data/' + card.photo)"
										  :title="card.title"
										  :id="card.id"
										  :price="card.price"
										  :square="card.square"
										  :descr="card.description"
										  :location="card.city + ' ' + card.location"
										  :src="card.src"
										  class="card_place--row"
									/>

								</div>
								<div class="results__button" style="display: none">
									<button class="btn btn-more">
										<svgicon icon="down" width="30" height="30"></svgicon>
										<span>Показать еще</span>
									</button>
								</div>

							</div>
						</div>
						<div class="col col_right">
							<button class="btn btn-return" type="button" @click="toggleMap()">Назад к списку</button>
							<affix
									class="resultsMap"
									ref="map"
									relative-element-selector="#results"
									style="width: 100%"
									:offset="{ top: 78, bottom: 0 }"
							>

								<room-map
										@bounds:changed=""
										:rooms="fetchCards"
										:hovered-room="hoveredRoom"
										:center="center"
										:markersArr="markers"
										:lat="centerMap.lat"
										:lng="centerMap.lng"
								></room-map>
							</affix>
						</div>

					</div>
					<div class="results"
						 ref="resultsBox"
						 id="results" v-else>
						<div class="col col_left">
							<div class="results__title" v-if="submitFlag !== false">Ничего не
								найдено...
							</div>
						</div>

					</div>
				</div>
			</section>
		</div>
	</transition>
</template>

<script>
  import {TheMask} from 'vue-the-mask';

  import RoomMap from './RoomMap'

  import Card from '../Card';
  import FilterForm from './Filter'
  import '@/compiled-icons/down';
  import store from '@/store'
  import {mapState} from 'vuex';

  import {
    FETCH_FILTER_CARDS_ROUTER,
    FETCH_FILTER_CARDS_QUERY,
    FETCH_FIELDS_FORM
  } from '@/store/actions.type';

  var timer;

  export default {
    name: 'Catalog',
    components: {
      TheMask,
      Card,
      RoomMap,
      FilterForm
    },
    data: () => ({
	  showMap: false,
      markersArr: null,
      hoveredRoom: null,
      centerMap: {
        lat: 0,
        lng: 0,
      }
    }),
    methods: {
      toggleMap() {
        console.log(123)
        if (this.showMap === false) {
          this.showMap = true
		} else {
          this.showMap = false;
		}
	  },
      replaceUrl(url) {
        let newUrl = url.replace(/\s/g, '%20');
        return newUrl;
      },
      fetchForm(route) {

        if (route) {
          store.dispatch(FETCH_FILTER_CARDS_QUERY);
        } else {
          store.dispatch(FETCH_FILTER_CARDS_ROUTER);
        }

      },
      declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
      },
    },
    computed: {
      center() {
        return {
          lat: this.centerMap.lat,
          lng: this.centerMap.lng
        }
      },
      ...mapState({
        submitFlag: state => state.filterObjects.submitFlag,
        fetchCards: state => state.filterObjects.objects,
        mainurl: state => state.mainurl,
        fields: state => state.fieldsform.fields,
      }),
      markers() {
        const self = this;
        let arrMarkers = [];
        Object.keys(self.fetchCards).forEach(function (key) {
          let value = self.fetchCards[key];
          if (value.x !== undefined) {
            arrMarkers.push({
              icon: {
                url: '/static/img/pointsm.svg',
                size: {width: 27, height: 46, f: 'px', b: 'px'},
                scaledSize: {width: 27, height: 46, f: 'px', b: 'px'}
              }, position: {lat: Number(value.x), lng: Number(value.y)}
            });
          }
        });

        this.markersArr = [];
        this.markersArr = arrMarkers;

        return arrMarkers;
      }
    },
    mounted() {
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      store.dispatch(FETCH_FIELDS_FORM);

      if (store.state.route.query.catalogType) {
        store.commit('SET_CATALOG_TYPE', store.state.route.query.catalogType);
        store.commit('SET_CATALOG_TYPE_SEARCH', store.state.route.query.catalogTypeSearch);
        this.fetchForm(true)
      }
    },
  };
</script>
