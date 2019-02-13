<template>
	<footer class="footer" v-if="footerData">
		<div class="container">
			<div class="footer__top">
				<div class="footer__column">
					<div class="location">
						<div class="location__icon">
							<img src="/static/img/location.svg" alt="">
						</div>
						<div class="location__desc">
							<p>
								{{ footerData.address }}
							</p>
						</div>
					</div>
				</div>
				<div class="footer__column">
					<a :href="'tel:' + footerData.phone" class="phone">{{footerData.phone}}</a>
					<a :href="'mailto:' + footerData.email" class="mail">{{footerData
						.email}}</a>
				</div>
				<div class="footer__column">
					<button type="button"
							@click="showCallBack"
							class="btn btn-transparent btn-transparent--white">
						Напишите нам
					</button>
				</div>
			</div>
			<div class="footer__bottom">
				<div class="copyright">
          <span>
            © {{ footerData.copyright }}
          </span>
				</div>
				<div class="dev">
					<a href="http://insday.ru" target="_blank" class="dev__link">
						I N S D A Y
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>

  import store from '@/store'

  export default {
    name: 'Footer',
    props: ['footerData'],
	methods: {
      showCallBack() {
        this.$modal.show('call-back');
	  }
	}
  };
</script>
