import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import {LOGIN, LOGOUT, REGISTER, CHECK_AUTH, UPDATE_USER} from '@/store/actions.type'
import {SET_AUTH, PURGE_AUTH, SET_ERROR} from '@/store/mutation.type';

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  isError(state) {
    return state.errors
  }
}

const actions = {
  [LOGIN](context, credentials) {
    let data = new FormData();
    data.append("json", JSON.stringify(credentials));

    return new Promise((resolve) => {
      ApiService
        .post('users/auth', data)
        .then(({data}) => {
          if (data.err === true) {
            context.commit(SET_ERROR, data.err_text)
          } else {
            context.commit(SET_AUTH, data.token);
            resolve(data)
          }
        })
        .catch((data) => {
          console.log('catch auth')
        })
    })
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER](context, credentials) {
    let data = new FormData();
    data.append("json", JSON.stringify(credentials));

    return new Promise((resolve, reject) => {
      ApiService
        .post('users/save', data)
        .then(({data}) => {
          context.commit(SET_AUTH, data.token);
          resolve(data)
        })
        .catch(res => {
          console.log(res)
          // context.commit(SET_ERROR, response.data.err_text)
        })
    })
  },
  [CHECK_AUTH](context, credentials) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      let data = new FormData();
      data.append("json", JSON.stringify(credentials));

        ApiService
          .post('users/auth', data)
          .then(({data}) => {
            context.commit(SET_AUTH, data.token);
            resolve(data)
          })
          .catch(({response}) => {
            // context.commit(SET_ERROR, response.data.errors)
          })
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [UPDATE_USER](context, payload) {
    const {email, username, password, image, bio} = payload

    const user = {
      email,
      username,
      bio,
      image
    }
    if (password) {
      user.password = password
    }

    return ApiService
      .put('user', user)
      .then(({data}) => {
        context.commit(SET_AUTH, data.user);
        return data
      })
  }
}

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_AUTH](state, user) {
    if (user !== 'null') {
      state.isAuthenticated = true;
      state.user.token = user;
      state.errors = {};
      JwtService.saveToken(state.user.token)
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
