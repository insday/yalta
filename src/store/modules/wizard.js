import Vue from 'vue';

const initialState = {
  stepCounter: 1,
  steps: [
    {
      id: 1,
      title: 'Подбор объекта в каталоге',
      state: true,
    },
    {
      id: 2,
      title: 'Сопровождение на территории',
      state: false,
    },
    {
      id: 3,
      title: 'Подготовка документов и проведение сделки',
      state: false,
    },
    {
      id: 4,
      title: 'Помощь в строительстве и обслуживании',
      state: false,
    },
  ]
};

export const state = Object.assign({}, initialState);

export const actions = {};

export const mutations = {
  SET_NEW_STEP (state, step) {
    state.steps.forEach(function (item, index) {
      state.stepCounter = step;

      if (item.id === step) {
        item.state = true
      } else if (item.id > step) {
        item.state = false
      } else if(item.id < step) {
        item.state = true
      }
    })
  },
};

export const getters = {};


export default {
  state,
  actions,
  mutations,
  getters
}
