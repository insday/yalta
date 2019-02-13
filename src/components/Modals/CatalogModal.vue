<template>
	<modal name="catalog-modal"
		   :adaptive="true"
		   height="auto"
		   width="100%"
		   :max-width="1136">
		<div class="modal-wrapper">

			<div class="modal-inner">
				<span class="modal-close" @click="hide()">
					<svgicon icon="close" width="20" height="20" class="field__icon"></svgicon>
				</span>
				<div class="modal__head">
					<div class="modal__title">Расширенный поиск</div>
				</div>
				<div class="modal-catalog-form">
					<div class="form-filter">
						<div class="form-body"
							 v-show="index == catalogType"
							 v-for="(item, index) in fields">
							<div class="form__row" v-for="itm in item.advranges">
								<div class="form__row-wrapper" v-if="itm.type === 'checkbox'">
									<div class="form__left">
										<label>{{itm.name}}</label>
									</div>
									<div class="form__right">
										<div class="form-checkbox-row">
											<div class="form__checkbox"
												 v-for="(i, index) in itm.values">
												<label :for="'filteradv' + index">
													<input type="checkbox"
														   v-model="formOptions"
														   :id="'filteradv' + index"
														   value="С фотографиями">
													<span class="checkbox__target"></span>
													<span>{{i}}</span>
												</label>
											</div>
										</div>
									</div>
								</div>
								<div class="form__row-wrapper" v-if="itm.type === 'list'">
									<div class="form__left">
										<label>Тип дома</label>
									</div>
									<div class="form__right">
										<div class="form-checkbox-row" >
											<div class="form-checkbox-label" v-for="i in itm.values">
												<input type="checkbox" name="">
												<span class="form-checkbox-label__button">{{i}}</span>
											</div>
										</div>
									</div>
								</div>
								<div class="form__row-wrapper" v-if="itm.type === 'range'">
									<div class="form__left">
										<label>{{itm.name}}</label>
									</div>
									<div class="form__right">
										<div class="form-fields-from-to">
											<div class="form__field">
												<input type="text" class="input" v-model="buildStart">
												<span>От</span>
											</div>
											<div class="form__field">
												<input type="text" class="input" v-model="buildEnd">
												<span>До</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--<div class="form__row">-->
							<!--<div class="form__left">-->
								<!--<label>Населеный пункт</label>-->
							<!--</div>-->
							<!--<div class="form__right">-->
								<!--<v-select-->
										<!--:options="item1">-->
								<!--</v-select>-->
							<!--</div>-->
						<!--</div>-->

						<!--<div class="form__row">-->
							<!--<div class="form__left">-->
								<!--<label>Материалы дома</label>-->
							<!--</div>-->
							<!--<div class="form__right form-multiple">-->
								<!--<v-select-->
										<!--:multiple="true"-->
										<!--:options="item1">-->
								<!--</v-select>-->
							<!--</div>-->
						<!--</div>-->
						<div class="form__bottom">
							<button class="btn btn-success" @click="scrollTo">Показать варианты</button>
							<button class="btn btn-text">
								Сбросить фильтры
							</button>
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
  import {FETCH_FILTER_CARDS} from '@/store/actions.type';
  import {mapState} from 'vuex';

  export default {
    data: () => ({
      item1: ['Симферополь', 'Симферополь1', 'Симферополь2']
    }),
    computed: {
      ...mapState({
        catalogType: state => state.filter.catalogType,
        fields: state => state.fieldsform.fields
      }),
      formOptions: {
        get() {
          return store.state.filter.options;
        },
        set(value) {
          store.commit('SET_OPTIONS', value)
        }
      },
      buildStart: {
        get() {
          return store.state.filter.buildStart;
        },
        set(value) {
          store.commit('SET_BUILD_START', value)
        }
      },
      buildEnd: {
        get() {
          return store.state.filter.buildEnd;
        },
        set(value) {
          store.commit('SET_BUILD_END', value)
        }
      },
    },
    methods: {
      hide() {
        this.$modal.hide('catalog-modal');
      },
      scrollTo() {
        this.fetchSend();
        this.$modal.hide('catalog-modal');
      },
      fetchSend() {
        store.dispatch(FETCH_FILTER_CARDS);
      },
    }
  }
</script>
