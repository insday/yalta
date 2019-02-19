<template>
	<div class="wizardBox-wrapper">

		<section class="wizardBox" ref="wizardBox" id="wizardBox">

			<WizardScale
					:tab1="wizardOptions.fields.text1"
					:tab2="wizardOptions.fields.text2"
					:tab3="wizardOptions.fields.text3"
					:tab4="wizardOptions.fields.text4"
			/>

			<div class="wizard__body">
				<div class="container">
					<!--<transition name="fade" :duration="{ enter: 500, leave: 500 }">>-->

					<StepOne
							v-if="stepCounter === 1"
							:icon="wizardOptions.fields.icon1"
							:btn="true"
							:wizardOptions="wizardOptions"
					/>

					<!--</transition>-->

					<transition name="fade" :duration="{ enter: 500, leave: 500 }">>
						<div v-if="stepCounter === 2" class="wizard__step wizard__step--content">
							<div class="content">
								<div class="col col_left">
									<div class="contentNav">
										<ul class="contentNav__list">
											<li class="contentNav__item"
												v-for="item, index in wizardOptions.subfields"
												v-if="item.descr_tab === '2'"
												:key="item.descr_header"
												@click="updateCounter(item.descr_tab, index)"
												:class="{active: index === tab2Counter}"
											>
												<span>{{item.descr_header}}</span>
											</li>
										</ul>
									</div>
								</div>
								<div class="col col_center">
									<article v-for="item, index in wizardOptions.subfields"
											 v-if="item.descr_tab === '2'"
											 :class="{active: index === tab2Counter}"
									>
										<h2>{{ item.descr_header }}</h2>
										<div v-html="item.descr_text"></div>
									</article>
								</div>
								<div class="col col_right">
									<icon-box
											:icon="wizardOptions.fields.icon2"
									/>
								</div>
							</div>

							<div class="content-mobile">
								<div class="accordion">
									<v-collapse-group
											v-for="item, index in wizardOptions.subfields"
											v-if="item.descr_tab === '2'"
											:key="item.descr_header"
											:onlyOneActive="true">
										<div class="accordion-item"
										>
											<v-collapse-wrapper>
												<div class="accordion-head" v-collapse-toggle>
													<span>{{item.descr_header}}</span>
												</div>
												<div class="accordion-body" v-collapse-content>
													<div v-html="item.descr_text"></div>
												</div>
											</v-collapse-wrapper>
										</div>
									</v-collapse-group>
								</div>
							</div>
						</div>
					</transition>

					<transition name="fade" :duration="{ enter: 500, leave: 500 }">>
						<div v-if="stepCounter === 3" class="wizard__step wizard__step--content">
							<div class="content">
								<div class="col col_left">
									<div class="contentNav">
										<ul class="contentNav__list">
											<li class="contentNav__item"
												v-for="item, index in wizardOptions.subfields"
												v-if="item.descr_tab === '3'"
												:key="item.descr_header + item.descr_tab"
												@click="updateCounter(item.descr_tab, index)"
												:class="{active: index === tab3Counter}"
											>
												<span>{{item.descr_header}}</span>
											</li>
										</ul>
									</div>
								</div>
								<div class="col col_center">
									<article v-for="item, index in wizardOptions.subfields"
											 v-if="item.descr_tab === '3'"
											 :key="item.descr_header + 1"
											 :class="{active: index === tab3Counter}"
									>
										<h2>{{ item.descr_header }}</h2>
										<div v-html="item.descr_text"></div>
									</article>
								</div>
								<div class="col col_right">
									<icon-box
											:icon="wizardOptions.fields.icon3"
									/>
								</div>
							</div>
							<div class="content-mobile">
								<div class="accordion">
									<v-collapse-group
											v-for="item, index in wizardOptions.subfields"
											v-if="item.descr_tab === '3'"
											:key="item.descr_header"
											:onlyOneActive="true">
										<div class="accordion-item"
										>
											<v-collapse-wrapper>
												<div class="accordion-head" v-collapse-toggle>
													<span>{{item.descr_header}}</span>
												</div>
												<div class="accordion-body" v-collapse-content>
													<div v-html="item.descr_text"></div>
												</div>
											</v-collapse-wrapper>
										</div>
									</v-collapse-group>
								</div>
							</div>
						</div>
					</transition>

					<transition name="fade" :duration="{ enter: 500, leave: 500 }">>
						<div v-if="stepCounter === 4" class="wizard__step wizard__step--content">
							<div class="content">
								<div class="col col_left">
									<div class="contentNav">
										<ul class="contentNav__list">
											<li class="contentNav__item"
												v-for="item, index in wizardOptions.subfields"
												v-if="item.descr_tab === '4'"
												:key="item.descr_header"
												@click="updateCounter(item.descr_tab, index)"
												:class="{active: index === tab4Counter}"
											>
												<span>{{item.descr_header}}</span>
											</li>
										</ul>
									</div>
								</div>
								<div class="col col_center">
									<article v-for="item, index in wizardOptions.subfields"
											 v-if="item.descr_tab === '4'"
											 :class="{active: index === tab4Counter}"
											 :key="item.descr_header + 1"
									>
										<h2>{{ item.descr_header }}</h2>
										<div v-html="item.descr_text"></div>
									</article>
								</div>
								<div class="col col_right">
									<div class="iconBox">
										<icon-box
												:icon="wizardOptions.fields.icon4"
										/>

									</div>
								</div>
							</div>
							<div class="content-mobile">
								<div class="accordion">
									<v-collapse-group
											v-for="item, index in wizardOptions.subfields"
											v-if="item.descr_tab === '4'"
											:key="item.descr_header"
											:onlyOneActive="true">
										<div class="accordion-item"
										>
											<v-collapse-wrapper>
												<div class="accordion-head" v-collapse-toggle>
													<span>{{item.descr_header}}</span>
												</div>
												<div class="accordion-body" v-collapse-content>
													<div v-html="item.descr_text"></div>
												</div>
											</v-collapse-wrapper>
										</div>
									</v-collapse-group>
								</div>
							</div>
						</div>
					</transition>

				</div>
			</div>
		</section>
		<section
				v-if="fetchCards && stepCounter === 1 && catalogTypeSearch && Object.keys(fetchCards).length !== 0"
				class="grid-carousel"
				ref="gridSlider">
			<div class="container">
				<div class="section__head">
					<div class="section__title">
						Жилые дома
					</div>
					<div class="section__head__right">

						<router-link to="/catalogue" class="btn btn-catalog" type="button">
							<svgicon icon="catalogobject" width="33" height="33"></svgicon>
							<span>Полный каталог</span>
						</router-link>
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
</template>

<script>

  import store from '@/store';
  import {mapState} from 'vuex';

  import WizardScale from './WizardScale';
  import StepOne from './Steps/StepOne';
  import GridSlider from '@/components/GridSlider.vue'
  import IconBox from './IconBox';

  import '../../compiled-icons/catalogobject';
  import '../../compiled-icons/arrow-right';
  import '../../compiled-icons/point-card';

  export default {
    name: 'wizard',
    components: {
      WizardScale,
      GridSlider,
      IconBox,
      StepOne,
    },
    props: ['wizardOptions'],
    data: () => ({
      tab2Counter: "1",
      tab3Counter: "4",
      tab4Counter: "7",
      sliderOption: {
        speed: 500,
        spaceBetween: 30,
        slidesPerView: 3,
        simulateTouch: false,
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
      ...mapState({
        stepCounter: state => state.wizard.stepCounter,
        fetchCards: state => state.filterObjects.objects,
        catalogTypeSearch: state => state.filter.catalogTypeSearch
      }),
    },
    updated() {
      // this.$nextTick(() => {
      //   this.$refs.chatScroll.$el.scrollTop = 9999999;
      // });
      // this.$refs.chatScroll.$el.scrollTop = 99999999;
      // this.$refs.chatScroll.update();
    },
    methods: {
      updateCounter(tab, id) {
        switch (tab) {
          case '2':
            this.tab2Counter = id
            break;
          case '3':
            this.tab3Counter = id
            break;
          case '4':
            this.tab4Counter = id
            break;
        }
      }
    }
  };
</script>
