<template>
	<div id="app">
		<Header :headerData="headerData" :menu="menuData" :socials="socialsData"/>
		<div class="out-content">
			<router-view/>
		</div>
		<Footer :footerData="footerData"/>
		<Modals/>

	</div>
</template>

<script>
  import Header from './components/Header/Header';
  import Footer from './components/Footer';
  import Modals from '@/components/Modals/Modals';

  import store from '@/store'
  import JwtService from '@/common/jwt.service.js'

  import {FETCH_LAYOUT, CHECK_AUTH, FETCH_FAVORITE_CARDS} from '@/store/actions.type';
  import {SET_AUTH} from '@/store/mutation.type';

  export default {
    name: 'App',
    data: () => ({
      footerData: '',
      headerData: '',
      menuData: '',
      socialsData: ''
    }),
    components: {
      Header,
      Modals,
      Footer,
    },
    mounted() {
      let self = this;
      let storeGetters = store.getters;

      if (store.state.auth.isAuthenticated !== false ) {
        store.commit(SET_AUTH, JwtService.getToken());
        store.dispatch(FETCH_FAVORITE_CARDS, {token: JwtService.getToken()});
      }

      if (
        self.footerData === '' &&
        self.headerData === '' &&
        self.menuData === '' &&
        self.socialsData === '') {

        store.dispatch(FETCH_LAYOUT)
          .then(() => {
            self.footerData = storeGetters.footer;
            self.headerData = storeGetters.header;
            self.menuData = storeGetters.menu;
            self.socialsData = storeGetters.socials;
          });
      }

    }
  };
</script>

<style lang="scss">
	@import 'assets/sass/app';
</style>
