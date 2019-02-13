import store from '@/store';

const initialState = {
  catalogType: '',
  catalogTypeSearch: '',
  location: 'Любое',
  price: 'Любая',
  squareArea: 'Любая',
  squareBuild: 'Любая',
  floors: 'Любой',
  rooms: 'Любая',
  buildStart: '',
  buildEnd: '',
  options: [],
};

export const state = Object.assign({}, initialState);

export const actions = {};

export const mutations = {
  SET_CATALOG_TYPE (state, value) {
    state.catalogType = value
  },
  SET_CATALOG_TYPE_SEARCH (state, value) {
    state.catalogTypeSearch = value
  },
  SET_LOCATION (state, value) {
    state.location = value
  },
  SET_PRICE (state, value) {
    state.price = value
  },
  SET_SQUARE_AREA (state, value) {
    state.squareArea = value
  },
  SET_SQUARE_BUILD (state, value) {
    state.squareBuild = value
  },
  SET_FLOORS (state, value) {
    state.floors = value
  },
  SET_OPTIONS (state, value) {
    state.options = value
  },
  SET_BUILD_START (state, value) {
    state.buildStart = value
  },
  SET_BUILD_END (state, value) {
    state.buildEnd = value
  },
  SET_ROOMS (state, value) {
    state.rooms = value
  }
};

export const getters = {};


export default {
  state,
  actions,
  mutations,
  getters
}
