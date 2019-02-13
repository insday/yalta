<template>
	<affix class="wizardScale"
		   relative-element-selector="#wizardBox"
		   style="width: 100%"
		   :offset="{ top: 0, bottom: 0 }"
		   :data-counter="stepCounter"
		   ref="wizardScale">

		<div class="container">

			<div @click="changeStep(stepIndex, 'prev')"
				 :class="{'is-disabled': stepIndex === 1}"
				 class="wizardButton wizardButton--prev"></div>
			<div
					@click="changeStep(stepIndex, 'next')"
					:class="{'is-disabled': stepIndex === 4}"
					class="wizardButton wizardButton--next"></div>

			<div class="wizardScale-bg">
				<span></span>
			</div>

			<div class="wizardScale__list">

				<div class="wizardScale__item"
					 :key="index"
					 @click="changeStep(el+1)"
					 v-for="item, index, el in this.$props">

					<a href="#wizardBox"
					   v-smooth-scroll="{duration: 1000}"></a>

					<div class="wizardScale__number">
						{{ el+1 }}
					</div>

					<div class="wizardScale__title">
						{{ item }}
					</div>

				</div>
			</div>
		</div>
	</affix>
</template>

<script>
  import store from '@/store';
  import {mapState} from 'vuex';

  export default {
    name: 'wizard-scale',
    props: ['tab4', 'tab3', 'tab2', 'tab1'],
    data: () => ({
	  stepIndex: 1
	}),
    computed: {
      ...mapState({
        steps: state => state.wizard.steps,
        stepCounter: state => state.wizard.stepCounter
      }),
    },
    mounted() {

    },
    methods: {
      changeStep(step, direction) {

       if (window.innerWidth >= 767) {
         store.commit('SET_NEW_STEP', step);

         if (step !== '1') {
           this.$refs.wizardScale.$el.scrollLeft = 290 * (step - 1);
         } else this.$refs.wizardScale.$el.scrollLeft = 0;
	   } else {
         if (step <= 0) {
           this.stepIndex = 1;
           return false;
         }

         if (step >= 5) {
           this.stepIndex = 4;
           return false;
         }

         if (direction === 'next') {
           this.stepIndex++
         }

         if (direction === 'prev') {
           this.stepIndex--
         }

         store.commit('SET_NEW_STEP', this.stepIndex);
	   }

      }
    }
  };
</script>
