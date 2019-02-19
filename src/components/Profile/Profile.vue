<template>
	<div class="page-profile">
		<div class="container">
			<div v-if="isAuthenticated">
				<div class="profile-head">
					<div class="section__title text-center">Личный кабинет</div>
					<button @click="logout" class="btn btn-primary">
						Выйти
					</button>
				</div>
				<div class="profile-body">
					<div class="grid-list"
							v-if="favoriteObjects">
						<div class="grid-item"
							 v-for="card in favoriteObjects"
							 :key="card.id">

							<Card :photo="card.photo"
								  :title="card.title"
								  :id="card.id"
								  :price="card.price"
								  :square="card.square"
								  :location="card.city + ' ' + card.location"
								  :src="card.src"
							/>

						</div>
						<div class="results__button" style="display: none">
							<button class="btn btn-more">
								<svgicon icon="down" width="30" height="30"></svgicon>
								<span>Показать еще</span>
							</button>
						</div>

					</div>
				</div>
			</div>
			<div v-else>
				<h1>Profile - неавторизованный пользователь</h1>
				<button @click="login" class="btn btn-primary">
					Войти
				</button>
			</div>

		</div>
	</div>
</template>

<script>
  import {mapState} from 'vuex';
  import JwtService from '@/common/jwt.service.js'
  import Card from '../Card';
  import {LOGOUT, FETCH_FAVORITE_CARDS} from '@/store/actions.type';

  import store from '@/store';

  export default {
    data: () => ({
	  cardsArr: []
	}),
	components: {
      Card
	},
    computed: {
	  ...mapState({
        isAuthenticated: state => state.auth.isAuthenticated,
        favoriteObjects: state => state.favorite.favoriteObjects
	  })
	},
    methods: {
      login() {
        this.$modal.show('sign-in');
      },
      logout() {
        this.$store
          .dispatch(LOGOUT)
          .then(() => {
            this.$store.state.favorite.favoriteObjects = '';
            this.$router.push({name: 'Home'})
          })
      }
    },
	mounted(){
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      if (JwtService.getToken() !== 'null') {
        store.dispatch(FETCH_FAVORITE_CARDS, {token: JwtService.getToken()});
      }
	}
  }
</script>
