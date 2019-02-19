<template>
	<transition name="component-fade" mode="out-in">
		<div class="page-news">
			<section class="news">
				<div class="container">
					<div class="section__title">Новости</div>
					<ul class="newsPagination">
						<li class="newsPagination__item"
							v-if="newsArr"
							v-for="(value, key, index) in newsArr"
							:key="key"
							:class="{'is-active': key === activeIndex}"
							@click="changeCategory(key)"
							>
							<span>{{key}}</span>
						</li>
					</ul>

					<div class="newsList">

						<news-item
								v-if="currentYear.news"
								v-for="(item, index) in currentYear.news"
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
    data: () => ({
	  activeIndex: '2018',
	  currentYear: {}
    }),
    components: {
      NewsItem,
    },
    computed: {
      ...mapState({
        newsArr: state => state.news.newsObjects
      }),
    },
	methods: {
      changeCategory(key) {
        this.activeIndex = key;
        this.currentYear = this.newsArr[key];
	  }
	},
    mounted() {
      document.querySelector('.header').classList.remove('is-active');
      document.querySelector('.btn-burger').classList.remove('is-active');
      document.querySelector('.mobileMenu').classList.remove('is-active');

      if (store.state.news.newsObjects.length === 0) {
        store.dispatch(FETCH_NEWS).then(() => {
          this.currentYear = this.newsArr[Number(this.activeIndex)];
		});
      } else {
        this.currentYear = this.newsArr[Number(this.activeIndex)];
	  }
    },

  }
</script>
