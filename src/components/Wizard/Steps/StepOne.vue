<template>
	<div class="wizard__step wizard__step--1"
		 id="wizardStep1">
		<div class="wizard__left" v-in-viewport.once>

			<Agent :name="wizardOptions.fields.name"
				   :photo="mainurl + wizardOptions.fields.photo"
				   :description="wizardOptions.fields.occup"/>

			<form class="form wizardCatalog">
				<div class="inner" ref="inner"
					 :style="{transform: 'translateY(' + valTransform +'px)'}">
					<div class="wizardCatalog__box wizardCatalog__box--1"
						 ref="box1">
						<div class="wizardCatalog__box-inner"
							 @click="gotoBox('up', 1)"></div>
						<div class="wizardCatalog__title">
							В нашем каталоге вы можете выбрать объект, входящий в
							вашу
							сферу
							интересов:
						</div>
						<div class="wizardCatalog__form">
							<div class="wizardCatalog__type"
								 v-for="(item, index) in catalogTypeArr"
								 :key="item.title">
								<div class="form__radio">
									<input type="radio"
										   name="catalogType"
										   :value="index+1"
										   v-model="catalogType"
										   @change="changeType(index+1)"
										   :id="'catalogType' + index">
									<label :for="'catalogType' + index"
										   class="form__radio__inner">
										<div class="form__radio__icon">
											<img :src=item.icon alt="">
										</div>
										<div class="form__radio__value">
											{{ item.title }}
										</div>
									</label>
								</div>
							</div>
						</div>

					</div>
					<div class="wizardCatalog__box wizardCatalog__box--2"
						 ref="box2"
						 v-if="catalogType === 1" v-in-viewport.once>
						<div class="wizardCatalog__box-inner"
							 @click="gotoBox('up',2)"></div>
						<div class="wizardCatalog__title">
									<span v-if="catalogType === 1">Вы ищете квартиру для
										жизни или проект под бизнес?</span>
						</div>

						<div class="wizardCatalog__form">
							<div class="wizardCatalog__type"
								 v-if="catalogType === 1"
								 v-for="(item, index) in step2Rooms"
								 :key="item.title">
								<div class="form__radio">
									<input type="radio"
										   v-model="catalogTypeSearch"
										   :value="item.title"
										   name="catalogTypeSearch"
										   :id="'step2' +
                    index">
									<label :for="'step2' + index"
										   class="form__radio__inner">
										<div class="form__radio__icon"
											 v-if="item.icon">
											<img :src=item.icon alt="">
										</div>
										<div class="form__radio__value">
											{{ item.title }}
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="wizardCatalog__box wizardCatalog__box--2"
						 ref="box2"
						 v-if="catalogType === 3" v-in-viewport.once>
						<div class="wizardCatalog__box-inner"
							 @click="gotoBox('up',2)"></div>
						<div class="wizardCatalog__title">
											<span v-if="catalogType === 3">Вы ищете здание для жизни
										или проект под бизнес?</span>
						</div>

						<div class="wizardCatalog__form">
							<div class="wizardCatalog__type"
								 v-if="catalogType === 3"
								 v-for="(item, index) in step2Builds"
								 :key="item.title">
								<div class="form__radio">
									<input type="radio"
										   v-model="catalogTypeSearch"
										   :value="item.title"
										   name="catalogTypeSearch"
										   :id="'step2' +
                    index">
									<label :for="'step2' + index"
										   class="form__radio__inner">
										<div class="form__radio__icon"
											 v-if="item.icon">
											<img :src=item.icon alt="">
										</div>
										<div class="form__radio__value">
											{{ item.title }}
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="wizardCatalog__box wizardCatalog__box--2"
						 ref="box2"
						 v-if="catalogType === 2" v-in-viewport.once>
						<div class="wizardCatalog__box-inner"
							 @click="gotoBox('up',2)"></div>
						<div class="wizardCatalog__title">
											<span v-if="catalogType === 2">Вы ищете участок для
										жизни
										или проект под бизнес?</span>
						</div>

						<div class="wizardCatalog__form">
							<div class="wizardCatalog__type"
								 v-if="catalogType === 2"
								 v-for="(item, index) in step2Uchastki"
								 :key="item.title">
								<div class="form__radio">
									<input type="radio"
										   v-model="catalogTypeSearch"
										   :value="item.title"
										   name="catalogTypeSearch"
										   :id="'step2' +
                    index">
									<label :for="'step2' + index"
										   class="form__radio__inner">
										<div class="form__radio__icon"
											 v-if="item.icon">
											<img :src=item.icon alt="">
										</div>
										<div class="form__radio__value">
											{{ item.title }}
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="wizardCatalog__box wizardCatalog__box--3"
						 ref="box3"
						 v-in-viewport.once
						 v-if="catalogTypeSearch">
						<div class="wizardCatalog__box-inner"
							 @click="gotoBox('up',3)"></div>
						<div class="wizardCatalog__title">

									<span v-if="catalogType === 1">Укажите основные
										параметры вашей квартиры:</span>
							<span v-if="catalogType === 3">Укажите основные параметры вашего дома:</span>
							<span v-if="catalogType === 2">Укажите основные
										параметры вашего участка:</span>
						</div>
						<div class="wizardCatalog__form" v-for="(item, key) in fields"
							 v-if="key == catalogType"
						>

							<div class="form__select"
								 v-if="key == 'price' || key == 'square' || key == 'city'"
								 v-for="(itm, key) in item.ranges">

								<label class="label">
									{{ itm.name }}
								</label>
								<v-select
										v-model="area"
										v-if="key === 'square'"
										:value="1"
										:options="itm.values">
								</v-select>
								<v-select
										v-model="location"
										v-if="key === 'city'"
										:options="itm.values">
								</v-select>
								<v-select
										v-model="price"
										v-if="key === 'price'"
										:options="itm.values">
								</v-select>
							</div>
						</div>

					</div>
					<div class="wizardCatalog__button"
						 v-if="location && catalogTypeSearch" v-in-viewport.once>
						<button @click.prevent="submitForm()"
								class="btn btn-primary btn--lg"
								type="button">Показать
							варианты
						</button>
					</div>
				</div>
			</form>
		</div>
		<div class="wizard__right">
			<icon-box
					:icon="icon"
					:btn="btn"
			/>
		</div>
	</div>
</template>

<script>
  import {mapState} from 'vuex';
  import animateScrollTo from 'animated-scroll-to';

  const options = {
    speed: 800,
    offset: -150,
  };

  import store from '@/store';
  import IconBox from '../IconBox';
  import Agent from '@/components/Wizard/Agent'
  import {FETCH_FILTER_CARDS, FETCH_FIELDS_FORM} from '@/store/actions.type';


  export default {
    props: ['icon', 'btn', 'wizardOptions', 'mainurl'],

    data: () => ({
      formSelects: [
        {
          label: 'Расположение',
          model: 'location',
          options: ['Симферополь', 'Феодосия', 'Ялта', 'Судак', 'Алушта', 'Балаклава', 'Симеиз']
        },
        {
          label: 'Цена, Р',
          model: 'price',
          options: ['1 млн — 2,5 млн', '1.5 млн — 2,5 млн', '2 млн — 2,5 млн']
        },
        {
          label: 'Площадь, м2',
          model: 'area',
          options: ['50 — 350', '100 — 450', '150 — 350']
        },
      ],
      catalogTypeArr: [
        {
          icon: '/static/img/cityscape.svg',
          title: 'Квартиры',
        },
        {
          icon: '/static/img/uchastki.svg',
          title: 'Участки',
        },
        {
          icon: '/static/img/builds.svg',
          title: 'Здания',
        },
      ],
      step2Builds: [
        {
          title: 'Дом для жилья',
        },
        {
          title: 'Здание под бизнес',
        },
      ],
      step2Uchastki: [
        {
          title: 'Участки под жилую недвижимость',
        },
        {
          title: 'Участки под коммерческие объекты',
        },
      ],
      step2Rooms: [
        {
          title: 'Квартиры на вторичном рынке',
        },
        {
          title: 'Квартиры новые от застройщика',
        },
      ],
      valueType: '',
    }),

    components: {
      IconBox,
      Agent,
    },

    computed: {

      heightBox1() {
        return this.$refs.box1.offsetHeight;
      },
      heightBox2() {
        return this.$refs.box2.offsetHeight;
      },
      heightBox3() {
        return this.$refs.box3.offsetHeight;
      },
      catalogType: {
        get() {
          return store.state.filter.catalogType;
        },
        set(value) {
          this.gotoBox('down', 1);
          store.commit('SET_CATALOG_TYPE_SEARCH', '');
          store.commit('SET_CATALOG_TYPE', value);
        }
      },
      catalogTypeSearch: {
        get() {
          return store.state.filter.catalogTypeSearch;
        },
        set(value) {
          this.gotoBox('down', 2);
          store.commit('SET_CATALOG_TYPE_SEARCH', value)
        }
      },
      location: {
        get() {
          return store.state.filter.location;
        },
        set(value) {
          store.commit('SET_LOCATION', value)
        }
      },
      area: {
        get() {
          return store.state.filter.area;
        },
        set(value) {
          store.commit('SET_SQUARE_AREA', value)
        }
      },
      price: {
        get() {
          return store.state.filter.price;
        },
        set(value) {
          store.commit('SET_PRICE', value)
        }
      },
      ...mapState({
        valTransform: state => state.valTransform,
        stepCounter: state => state.wizard.stepCounter,
        fields: state => state.fieldsform.fields,
        fetchCards: state => state.filterObjects.objects
      }),
    },
    watch: {},

    methods: {
      innerTransform(direction, value) {

        if (direction === 'down') {
          store.state.valTransform -= value;
        }

        if (direction === 'up') {
          store.state.valTransform += value;
        }

      },
      gotoBox(direction, index) {

        if (direction === 'down') {
          switch (index) {
            case 1:
              if (!this.$refs.box1.classList.contains('is-hidden')) {
                this.$refs.box1.classList.add('is-hidden');
                this.innerTransform(direction, (this.heightBox1 + 60));
                break;
              }
            case 2:
              if (!this.$refs.box2.classList.contains('is-hidden')) {
                this.$refs.box2.classList.add('is-hidden');
                this.innerTransform(direction, (this.heightBox2 + 60));
                break;
              }
            case 3:

              break;
          }
        }

        if (direction === 'up') {
          switch (index) {
            case 1:
              if (this.$refs.box1.classList.contains('is-hidden') && direction === 'up') {
                this.$refs.box1.classList.remove('is-hidden');
                this.innerTransform(direction, this.heightBox1 + 60);
                store.commit('SET_CATALOG_TYPE', '');
                break;
              }
            case 2:
              if (this.$refs.box2.classList.contains('is-hidden')) {
                this.$refs.box2.classList.remove('is-hidden');
                this.innerTransform(direction, this.heightBox2 + 60);
                store.commit('SET_CATALOG_TYPE_SEARCH', '');
                break;
              }
            case 3:
              break;
          }
        }


      },
      transformBox(value) {
        this.$refs.inner.style.transform = `translateY(-${value + 50}px)`;
      },

      changeType(data) {
        this.valueType = data;
      },

      submitForm() {

        let filterData = store.state.filter;

        let payload = {
          catalogType: filterData.catalogType,
          catalogTypeSearch: filterData.catalogTypeSearch,
          location: filterData.location,
          price: filterData.price,
          area: filterData.squareArea,
          rooms: filterData.rooms,
          options: filterData.formOptions
        };

        let data = new FormData();

        data.append("json", JSON.stringify(payload));
        store.dispatch(FETCH_FILTER_CARDS, {
          type: this.valueType,
          data: data
        }).then(() => {
          setTimeout(function () {
            animateScrollTo(document.querySelector('.grid-carousel'), options);
          }, 300);
		})

      },
    },

    mounted() {
      store.dispatch(FETCH_FIELDS_FORM);
    }
  }
</script>
