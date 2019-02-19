import Vue from 'vue';
import Vuex from 'vuex';

import filter from './modules/filter';
import wizard from './modules/wizard';
import layout from './modules/layout';
import filterObjects from './modules/filterObjects';
import news from './modules/news';
import auth from './modules/auth';
import fieldsform from './modules/fieldsform';
import favorite from './modules/favorite';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    valTransform: 0,
  },
  modules: {
    filter,
    wizard,
    layout,
    filterObjects,
    news,
    auth,
    fieldsform,
    favorite,
  },
});

