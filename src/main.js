import '@/plugins/polyfill.js';
import Vue from 'vue';
import App from './App';
import { sync } from 'vuex-router-sync'
import router from './router';
import store from './store';
import vSelect from './plugins/Select';
import inViewportDirective from 'vue-in-viewport-directive'
import YmapPlugin from 'vue-yandex-maps'
import VueAffix from 'vue-affix';
import VueProgressiveImage from 'vue-progressive-image'
import ApiService from './common/api.service'
import * as VueGoogleMaps from 'vue2-google-maps'
import vmodal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import vhCheck from 'vh-check';
const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
import VueSVGIcon from 'vue-svgicon';
import vueSmoothScroll from 'vue-smooth-scroll'
import VueCollapse from 'vue2-collapse'

sync(store, router);

Vue.use(VueCollapse);
Vue.use(vueSmoothScroll);
Vue.use(VueAwesomeSwiper);
Vue.use(VueSVGIcon);
Vue.use(Vuelidate);
Vue.use(vmodal);


vhCheck('browser-address-bar');

// import VueFullpage from 'vue-fullpage'
// Vue.use(VueFullpage);


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAx7epVPgE5H-G4DiGr-tQa89qltkNxHxs',
    libraries: 'places',
  },
});

ApiService.init();

Vue.use(VueProgressiveImage);
Vue.use(VueAffix);
Vue.component('v-select', vSelect);
Vue.directive('in-viewport', inViewportDirective);
Vue.use(YmapPlugin);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
});


function update_viewport_width(first) {
  var doc_width = document.documentElement.clientWidth;
  var doc_height = document.documentElement.clientHeight;
  var screen_size = (first) ? doc_width : Math.max(doc_width, doc_height);

  if (screen_size > 767) {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1000');
  }
}

update_viewport_width(true);

window.addEventListener('orientationchange', function () {
  update_viewport_width();
});


var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);
