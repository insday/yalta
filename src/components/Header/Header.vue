<template>
	<header class="header" ref="header">
		<div class="box_contacts" v-if="contacts">
			<button class="btn btn-close" @click="toggleContacts">
			</button>
			<div class="phone" v-if="contacts.phone">
				<a :href="'tel:' + contacts.phone">{{contacts.phone}}</a>
			</div>
			<div class="mail" v-if="contacts.email">
				<a :href="'mailto:' + contacts.email">{{contacts.email}}</a>
			</div>
			<div class="address" v-if="contacts.address">
				<p>{{contacts.address}}</p>
			</div>
		</div>
		<div class="header__inner">
			<div class="header__left">
				<div class="header__logo logo">
					<router-link to="/">
						<img :src=headerData.logo />
					</router-link>
				</div>
				<Nav :menu=menu />
			</div>
			<div class="header__right">
				<div class="header__wrapper">
					<div class="header__phone">
						<a :href="'tel:' + headerData.phone"
						   class="phone">{{ headerData.phone}}</a>
					</div>
					<Socials :socials=socials />
					<button class="btn btn-transparent" @click="toggleContacts()">{{ headerData.button_text }}</button>
					<a href="#" class="btn btn-login"
							v-if="!isAuthenticated"
							@click.prevent="showModal()">
						<div class="btn__value">
							{{favoriteCounter}}
						</div>
						<span>Избранные <br />объекты</span>
					</a>
					<router-link :to="{name: 'Profile'}" class="btn btn-login"
							v-if="isAuthenticated">
						<div class="btn__value">
							{{favoriteCounter}}
						</div>
						<span>Избранные <br />объекты</span>
					</router-link>
				</div>
				<button class="btn btn-burger" ref="burger" @click="toggle">
					<span></span>
					<span></span>
				</button>
			</div>
			<a :href="'tel:' + headerData.phone" class="btn btn-phone-call">
				<svgicon icon="phone-call" width="30" height="30"></svgicon>
			</a>
		</div>
		<div class="mobileMenu" ref="mobileMenu">
			<ul class="menu">
				<li v-for="item in menu">
					<router-link :to=item.url>
						{{ item.url_text }}
					</router-link>

					<a :href="item.url"
					   v-if="item.url === '/#wizardBox'"

					>
						213
					</a>
				</li>
				<li>
					<router-link :to="{name: 'Profile'}"
								 @click="showModal()"
								 v-if="!isAuthenticated">
						<span>Личный кабинет</span>
					</router-link>
					<router-link :to="{name: 'Profile'}"
								 v-if="isAuthenticated">
						<span>Личный кабинет</span>
					</router-link>
				</li>
			</ul>
			<div class="mobileMenu__bottom">
				<a :href="'tel:' + headerData.phone"
				   class="phone">{{ headerData.phone}}</a>
				<div class="row">
					<Socials :socials=socials />
					<button class="btn btn-transparent" @click="toggleContacts()">{{ headerData.button_text }}</button>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
  import Nav from "./Nav";
  import Socials from "./Socials";
  import '@/compiled-icons/phone-call.js'
  import store from '@/store'
  import {mapState} from 'vuex';


  export default {
    name: "Header",
	props: ['headerData', 'menu', 'socials'],
    components: {
      Nav,
      Socials
    },
	computed: {
      ...mapState({
        isAuthenticated: state => state.auth.isAuthenticated,
		contacts: state => state.layout.footer,
		favoriteObjects: state => state.favorite.favoriteObjects,
		favoriteCounter: state => state.favorite.favoriteCounter,
      })
	},
    methods: {
      showModal() {
        this.$modal.show('sign-in');
      },
      toggleContacts() {
        document.getElementById('app').classList.toggle('is-show-contacts');
      },
      toggle() {
        this.$refs.header.classList.toggle('is-active');
        this.$refs.burger.classList.toggle('is-active');
        this.$refs.mobileMenu.classList.toggle('is-active');
      }
    },
  };
</script>
