<template>
	<div class="page-single">
		<section class="single">
			<div class="container">
				<!--<div class="section__head">-->
					<!--<div class="section__title">Новости</div>-->

					<!--<div class="page-nav">-->
						<!--<div class="page-nav__item page-nav__item-prev" :class="{'is-hidden': article.prev === ''}">-->
							<!--<router-link :to="{name: 'Single', params: { singleId: article.prev }}">-->

							<!--</router-link>-->
						<!--</div>-->
						<!--<div class="page-nav__item page-nav__item-next" :class="{'is-hidden': article.next === ''}">-->
							<!--<router-link :to="{name: 'Single', params: { singleId: article.next }}">-->

							<!--</router-link>-->
						<!--</div>-->
					<!--</div>-->
				<!--</div>-->

				<div class="single__body">
					<router-link to="/events" class="single-close btn btn-close">
						<svgicon icon="close"
								 width="31"
								 height="31"
								 class="close-icon"></svgicon>
					</router-link>
					<h1>{{article.header}}</h1>
					<span class="date">{{article.date}}</span>
					<div v-html="article.text"></div>
					<img :src="mainurl + article.picture" alt="">
					<div	v-if="article.text_d"
							v-html="article.text_d"></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
  import {ArticleService} from '@/common/api.service.js';
  import store from '@/store';
  import '@/compiled-icons/close'

  export default {
    data: () => ({
      article: '',
    }),
    computed: {
      mainurl: () => {
        return store.state.mainurl;
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.path !== from.path) {
          ArticleService
            .get(this.$route.params.singleId)
            .then(({data}) => {
              this.article = data;
            });
        }
      }
    },
    mounted() {
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      ArticleService
        .get(this.$route.params.singleId)
        .then(({data}) => {
          this.article = data;
        });
    }
  }
</script>
