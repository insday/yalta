import store from '@/store'
import {FETCH_FAVORITE_CARDS, ADD_FAVORITE_CARDS, REMOVE_FAVORITE_CARDS} from '@/store/actions.type';
import {SET_FAVORITE_CARDS, ADD_TO_FAVORITE_CARDS, REMOVE_FAVORITE_CARD} from '@/store/mutation.type';
import {FavoriteService} from "@/common/api.service";

const initialState = {
  favoriteObjects: {},
  favoriteCounter: 0
};

export const state = Object.assign({}, initialState);

export const actions = {

  [FETCH_FAVORITE_CARDS](context, slug) {
    let data = new FormData();
    data.append("json", JSON.stringify(slug));
    FavoriteService.get(data)
      .then(({data}) => {

        if (data !== '') {
          context.commit(SET_FAVORITE_CARDS, data)
        } else {
          // context.commit(SET_FILTER_CARDS, '')
        }
      })
  },

  [ADD_FAVORITE_CARDS](context, slug) {
    let data = new FormData();
    data.append("json", JSON.stringify(slug));

    return FavoriteService.add(data)
      .then(({data}) => {
        if (data !== 1) {
          console.log('Добавлено в избранное');
          context.commit('ADD_TO_FAVORITE_CARDS', slug);
          return true;
        } else {
          console.log('Ошибка при добавлении в избранное');
          return false;
        }
      })
  },

  [REMOVE_FAVORITE_CARDS](context, slug) {
    let data = new FormData();
    data.append("json", JSON.stringify(slug));

    return FavoriteService.delete(data)
      .then(({data}) => {
        if (data !== 1) {
          context.commit('REMOVE_FAVORITE_CARD', slug.id);
          console.log('Удалено из избранного');
          return true;
        } else {
          console.log('Ошибка при добавлении в избранное');
          return false;
        }
      })
  }
};

export const mutations = {
  [SET_FAVORITE_CARDS](state, value) {
    state.favoriteObjects = value;

    state.favoriteCounter = Object.keys(state.favoriteObjects).length;
  },

  [REMOVE_FAVORITE_CARD](state, value) {
    delete state.favoriteObjects[value];
    state.favoriteCounter = Object.keys(state.favoriteObjects).length;
  },

  [ADD_TO_FAVORITE_CARDS](state, value) {
    state.favoriteObjects[value.id] = {
      object: true
    };
    state.favoriteCounter = Object.keys(state.favoriteObjects).length;
  },
};

export const getters = {};


export default {
  state,
  actions,
  mutations,
  getters
}
