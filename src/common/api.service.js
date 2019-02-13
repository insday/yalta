import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {API_URL} from '@/common/config'
import JwtService from '@/common/jwt.service'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${JwtService.getToken()}`
  },

  get(resource, slug = '') {
    return Vue.axios
      .get(`${resource}/${slug}`)
      .catch((error) => {
        throw new Error(`[YALTA] ApiService ${error}`)
      })
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },
};

export default ApiService;

export const ObjectService = {
  get(slug) {
    return ApiService.get('object/getbyid', slug)
  }
}

export const ObjectsService = {

  post(id, res) {
    return ApiService.post(`objects/getbyparams/${id}`, res)
  }
}

export const HomeService = {
  get() {
    return ApiService.get('mainpage/get')
  }
}


export const ModalForm = {
  post(data) {
    return ApiService.post('feedback/send', data)
  }
}

export const Layout = {
  get() {
    return ApiService.get('headerfooter/get')
  }
}

export const FieldsForm = {
  get() {
    return ApiService.get('ranges')
  }
}


export const NewsService = {
  get() {
    return ApiService.get('news/get')
  }
}


export const ArticleService = {
  get(slug) {
    return ApiService.get('news/getbyid', slug)
  }
}

export const FavoriteService = {
  get(slug) {
    return ApiService.post('favs/get', slug)
  },
  add(slug) {
    return ApiService.post('favs/add', slug)
  },
  delete(slug) {
    return ApiService.post('favs/del', slug)
  },
}

