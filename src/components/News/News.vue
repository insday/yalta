<template>
	<transition name="component-fade" mode="out-in">
		<div class="page-news">
			<section class="news">
				<div class="container">
					<div class="section__title">Новости</div>
					<ul class="newsPagination">
						<li class="newsPagination__item is-active"
							v-if="newsArr"
							v-for="(value, key) in newsArr"
							:key="key"
							>
							<span>{{key}}</span>
						</li>
					</ul>

					<div class="newsList">
						<news-item
								v-if="newsArr[2018].news"
								v-for="(item, index) in newsArr[2018].news"
								:key="index"
								:announce="item.announce"
								:date="item.date"
								:single-data="item"
								:title="item.header"
								:id="item.id"
						/>
					</div>
				</div>
			</section>
		</div>
	</transition>
</template>

<script>

  import {mapState} from 'vuex';

  import store from '@/store'
  import {FETCH_NEWS} from '@/store/actions.type'
  import NewsItem from '@/components/News/NewsItem'

  export default {
    components: {
      NewsItem,
    },
    mounted() {
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      if (store.state.news.newsObjects.length === 0) {
        store.dispatch(FETCH_NEWS);
      }
    },
    computed: {
      ...mapState({
        newsArr: state => state.news.newsObjects
      }),
    }
  }
</script>
