import Vue from 'vue';
import {FETCH_FIELDS_FORM} from '@/store/actions.type';
import {SET_FIELDS_FORM} from '@/store/mutation.type';
import {FieldsForm} from '@/common/api.service'

const initialState = {
  fields: {}
};

export const state = Object.assign({}, initialState);

export const actions = {
  [FETCH_FIELDS_FORM](context) {

    return FieldsForm.get()
      .then(({data}) => {
        context.commit(SET_FIELDS_FORM, data)
      });

  }
};

export const mutations = {

  [SET_FIELDS_FORM](state, value) {
    state.fields = value;
  },
};

export const getters = {};


export default {
  state,
  actions,
  mutations,
  getters
}
