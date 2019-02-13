import Vue from 'vue';

import {FETCH_NEWS} from '@/store/actions.type';
import {SET_NEWS} from '@/store/mutation.type';
import {NewsService} from "@/common/api.service";


const initialState = {
  newsObjects: []
};

export const state = Object.assign({}, initialState);

export const actions = {
  [FETCH_NEWS] (state) {
    NewsService.get()
      .then(({data}) => {
          state.commit(SET_NEWS, data);
      })
  }
};

export const mutations = {
  [SET_NEWS] (state, news) {
    state.newsObjects = news
  }
};

export const getters = {};


export default {
  state,
  actions,
  mutations,
  getters
}
