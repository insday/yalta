import router from '@/router';

import {FETCH_FILTER_CARDS, FETCH_FILTER_CARDS_QUERY, FETCH_FILTER_CARDS_ROUTER} from '@/store/actions.type';
import {SET_FILTER_CARDS} from '@/store/mutation.type';
import {ObjectsService} from "@/common/api.service";

import store from '@/store';


const initialState = {
  submitFlag: false,
  objects: []
};

export const state = Object.assign({}, initialState);

export const actions = {
  [FETCH_FILTER_CARDS](context, slug) {
    let filterData = store.state.filter;
    let payload = {
      catalogType: filterData.catalogType,
      catalogTypeSearch: filterData.catalogTypeSearch,
      city: filterData.location,
      price: filterData.price,
      area: filterData.squareArea,
      rooms: filterData.rooms,
      options: filterData.formOptions,
      floors: filterData.floors
    };

    let data = new FormData();
    data.append("json", JSON.stringify(payload));

    ObjectsService.post(filterData.catalogType, data)
      .then(({data}) => {
        if (data !== '') {
          context.commit(SET_FILTER_CARDS, data)
        } else {
          context.commit(SET_FILTER_CARDS, '')
        }
      })
  },
  [FETCH_FILTER_CARDS_ROUTER](context, slug) {
    let filterData = store.state.filter;
    let payload = {
      catalogType: filterData.catalogType,
      catalogTypeSearch: filterData.catalogTypeSearch,
      city: filterData.location,
      price: filterData.price,
      area: filterData.squareArea,
      rooms: filterData.rooms,
      options: filterData.formOptions,
      floors: filterData.floors
    };

    let data = new FormData();
    data.append("json", JSON.stringify(payload));

    router.push({query: payload});

    ObjectsService.post(filterData.catalogType, data)
    .then(({data}) => {
      if (data !== '') {
        context.commit(SET_FILTER_CARDS, data)
      } else {
        context.commit(SET_FILTER_CARDS, '')
      }
    })
  },
  [FETCH_FILTER_CARDS_QUERY](context, slug) {
    let filterData = store.state.route.query;
    let payload = {
      catalogType: filterData.catalogType,
      catalogTypeSearch: filterData.catalogTypeSearch,
      city: filterData.city,
      price: filterData.price,
      area: filterData.area,
      rooms: filterData.rooms,
      options: filterData.options
    };

    let data = new FormData();
    data.append("json", JSON.stringify(payload));

    ObjectsService.post(filterData.catalogType, data)
      .then(({data}) => {
        if (data !== '') {
          context.commit(SET_FILTER_CARDS, data)
        } else {
          context.commit(SET_FILTER_CARDS, '')
        }
      })
  }
};

export const mutations = {
  [SET_FILTER_CARDS](state, cards) {
    state.objects = cards;
    
    cards === '' ? state.submitFlag = true : state.submitFlag = false;
    
  }
};

export const getters = {};


export default {
  state,
  actions,
  mutations,
  getters
}
