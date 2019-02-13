import Vue from 'vue';

import {FETCH_LAYOUT} from '@/store/actions.type';
import {SET_HEADER, SET_FOOTER, SET_SOCIALS, SET_MENU} from '@/store/mutation.type';
import {Layout} from '@/common/api.service'


const initialState = {
  header: null,
  footer: null,
  menu: null,
  socials: null,
};

export const state = Object.assign({}, initialState);

export const actions = {

  [FETCH_LAYOUT](context) {

    return Layout.get()
      .then(({data}) => {
        context.commit(SET_FOOTER, data[48].fields[48]);
        context.commit(SET_HEADER, data[48].fields[41]);
        context.commit(SET_SOCIALS, data[48].subfields[42]);
        context.commit(SET_MENU, data[48].subfields[43]);
      });

  }

};

export const mutations = {

  [SET_FOOTER](state, value) {
    state.footer = value;
  },

  [SET_HEADER](state, value) {
    state.header = value;
  },

  [SET_MENU](state, value) {
    state.menu = value;
  },

  [SET_SOCIALS](state, value) {
    state.socials = value;
  },
};

export const getters = {
  footer(state) {
    return state.footer
  },
  header(state) {
    return state.header
  },
  menu(state) {
    return state.menu
  },
  socials(state) {
    return state.socials
  }
};


export default {
  state,
  actions,
  mutations,
  getters
}
