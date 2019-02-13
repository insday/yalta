<template>
	<div class="filter">
		<div class="filter__checkboxs">
			<div class="form__column" v-for="item, index in radioButtons"
				 :key="item.title">
				<v-collapse-wrapper>
					<div class="filter__head" v-collapse-toggle>
						<div class="filter__icon">
							<img :src="item.icon" alt="">
						</div>
						<div class="filter__title">
							{{ item.title }}
						</div>
					</div>
					<div class="filter__wrapper" v-collapse-content>
						<div class="form__radio" v-for="button in item.list"
							 :key="button.title">
							<input type="radio" v-model="catalogTypeSearch"
								   name="catalogType"
								   @change="changeType(index+1)"
								   :value="button.val"
								   :data-category="item.title"
								   :id="'catalogType' + button.id">
							<label :for="'catalogType' + button.id"
								   class="form__radio__inner">
								<div class="form__radio__value">
									{{ button.title }}
								</div>
							</label>
						</div>
					</div>
				</v-collapse-wrapper>
			</div>
		</div>
		<div class="filter__fields"
			 v-if="catalogTypeSearch"
			 id="filterRow"
			 ref="filterFields">

			<div class="filter__top">
				<div class="form__row">
					<div class="form-group"
						 v-if="key == catalogType"
						 v-for="(item, key) in fields">
						<div class="form__select"
							 v-if="itm.type === 'dropdown'"
							 v-for="(itm, key2) in item.ranges">
							<label class="label">
								{{itm.name}}
							</label>

							<v-select
									:options="itm.values"
									v-if="key2 == 'city'"
									v-model="city"
							/>
							<v-select
									:options="itm.values"
									v-if="key2 == 'price'"
									v-model="price"
							/>
							<v-select
									:options="itm.values"
									v-if="key2 == 'square'"
									v-model="squareArea"
							/>
							<v-select
									:options="itm.values"
									v-if="key2 == 'lsquare'"
									v-model="squareBuild"
							/>

							<v-select
									:options="itm.values"
									v-if="key2 == 'floor'"
									v-model="floors"
							/>

							<v-select
									:options="itm.values"
									v-if="key2 == 'rooms'"
									v-model="rooms"
							/>
						</div>
					</div>

					<div class="filter__right">
						<button class="btn btn-primary" @click="scrollTo">Найти
						</button>
					</div>
				</div>

			</div>
			<div class="filter__bottom">
				<div class="filter__left"
					 v-for="(item, key) in fields"
					 v-if="key == catalogType"
				>
					<div class="form__checkbox"
						 v-for="(itm, index) in item.ranges"
						 v-if="itm.type == 'checkbox'"
						 :key="itm.title">

						<label
								v-if="itm.type == 'checkbox'"
								:for="'filter' + index">
							<input type="checkbox"
								   :value="itm.name"
								   v-model="formOptions"
								   :id="'filter' + index">
							<span class="checkbox__target"></span>
							<span>
											   {{ itm.name }}
										   </span>
						</label>
					</div>
				</div>
				<div class="filter__right">
					<span class="btn btn-moreSearch" @click="showModal()">
						<img src="static/img/filtericon.svg" alt="">
						<span>Расширенный поиск</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import store from '@/store'
  import {mapState} from 'vuex';
  import {FETCH_FILTER_CARDS} from '@/store/actions.type';
  import animateScrollTo from 'animated-scroll-to';

  const options = {
    speed: 700,
    offset: -80,
  };

  export default {
    name: 'FilterForm',
    data: () => ({
      radioButtons: [
        {
          icon: '/static/img/builds.svg',
          title: 'Готовые квартиры',
          list: [
            {
              val: 'Квартиры на вторичном рынке',
              id: 4,
              title: 'Квартиры на вторичном рынке',
            },
            {
              val: 'Квартиры новые от застройщика',
              id: 5,
              title: 'Квартиры новые от застройщика',
            },
          ],
        },
        {
          icon: '/static/img/uchastki.svg',
          title: 'Земельные участки',
          list: [
            {
              val: 'Участки под жилую недвижимость',
              id: 1,
              title: 'Участки под жилую недвижимость',
            },
            {
              val: 'Участки под коммерческие объекты',
              title: 'Участки под коммерческие объекты',
            },
          ],
        },
        {
          icon: '/static/img/cityscape.svg',
          title: 'Недвижимость',
          list: [
            {
              val: 'Дом для жилья',
              id: 2,
              title: 'Готовые  жилые дома',
            },
            {
              val: 'Здание под бизнес',
              id: 3,
              title: 'Коммерческие объекты',
            },
          ],
        },
      ],
    }),
    computed: {
      ...
        mapState({
          fields: state => state.fieldsform.fields,
        }),
      catalogType:
        {
          get() {
            if (store.state.route.query.catalogType) {
              return store.state.route.query.catalogType;
            } else {
              return store.state.filter.catalogType;
            }
          }
          ,
          set(value) {
            store.commit('SET_CATALOG_TYPE', value)
          }
        }
      ,
      catalogTypeSearch: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.catalogTypeSearch;
          } else {
            return store.state.filter.catalogTypeSearch;
          }
        }
        ,
        set(value) {
          store.commit('SET_CATALOG_TYPE_SEARCH', value)
        }
      }
      ,
      city: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.city;
          } else {
            return store.state.filter.location;
          }
        }
        ,
        set(value) {
          store.commit('SET_LOCATION', value)
        }
      }
      ,
      squareArea: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.area;
          } else {
            return store.state.filter.squareArea;
          }
        }
        ,
        set(value) {
          store.commit('SET_SQUARE_AREA', value)
        }
      }
      ,
      squareBuild: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.squareBuild;
          } else {
            return store.state.filter.squareBuild;
          }
        }
        ,
        set(value) {
          store.commit('SET_SQUARE_BUILD', value)
        }
      }
      ,
      price: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.price;
          } else {
            return store.state.filter.price;
          }
        }
        ,
        set(value) {
          store.commit('SET_PRICE', value)
        }
      }
      ,
      floors: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.floors;
          } else {
            return store.state.filter.floors;
          }
        }
        ,
        set(value) {
          store.commit('SET_FLOORS', value)
        }
      }
      ,
      rooms: {
        get() {
          if (store.state.route.query.catalogType) {
            return store.state.route.query.rooms;
          } else {
            return store.state.filter.rooms;
          }
        }
        ,
        set(value) {
          store.commit('SET_ROOMS', value)
        }
      }
      ,
      formOptions: {
        get() {
          return store.state.filter.options;
        }
        ,
        set(value) {
          store.commit('SET_OPTIONS', value)
        }
      }
      ,
    }
    ,
    methods: {
      showModal() {
        this.$modal.show('catalog-modal');
      }
      ,
      changeType(data) {
        store.commit('SET_CATALOG_TYPE', data);
		store.dispatch(FETCH_FILTER_CARDS);

        setTimeout(function () {
          animateScrollTo(document.querySelector('.filter__fields'), options);
        }, 500);

      }
      ,
      scrollTo() {
        this.$modal.hide('catalog-modal');

        setTimeout(() => {
          this.$refs.filterFields.scrollIntoView({block: "start", behavior: 'smooth'})
        }, 500)
      }


    },
	mounted() {

	}
  }
</script>
