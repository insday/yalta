<template>
	<transition name="component-fade" mode="out-in">
		<div class="page-home">
			<Hero :offerInfo="offerInfo" :sliders="sliders" :mainurl="mainurl"/>
			<Wizard :mainurl="mainurl" :wizardOptions="wizardOptions" v-if="wizardOptions"/>
			<Advantages :advantagesData="advantagesData"/>
		</div>
	</transition>
</template>

<script>
  import Hero from './Hero/Hero';
  import Wizard from '../Wizard/Wizard';
  import Advantages from '../Home/Advantages';
  import {HomeService} from '@/common/api.service';
  import store from '@/store'

  // import Vue from 'vue'
  // import '@/plugins/fullpage.js'
  // import FullPage from 'vue-fullpage.js';
  // import fullPageMixin from 'vue-fullpage.js';

  export default {
    name: 'Home',
    // mixins: [fullPageMixin],
    components: {
      // FullPage,
      Hero,
      Wizard,
      Advantages,
    },
    data: () => ({
      // options1: {
      //   anchors: ['page1', 'page2', 'page3'],
      //   verticalCentered: false,
      //   css3: true,
      //   sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
      // },
      offerInfo: null,
      wizardOptions: null,
      advantagesData: null,
      advantagesOptions: '',
      sliders: '',
      headerData: null,
    }),
    mounted() {
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      HomeService.get()
        .then(({data}) => {
          let self = this;

          Object.keys(data).forEach(function (key) {

            switch (key) {
              case '44':
                self.wizardOptions = data[key];
              case '49':
                self.offerInfo = data[key].fields;
                self.sliders = data[key].subfields;
              case '51':
                self.advantagesData = data[key];
            }
          });
        })
    },
    computed: {
      mainurl: () => {
        return store.state.mainurl;
      }
    }
  };
</script>
