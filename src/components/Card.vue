<template>
	<router-link :to="{name: 'Object', params: { objectId: id }}" class="card card_place">
		<div class="card__photo"
			 v-if="photo"
			 :style="{ backgroundImage: `url('${replaceUrl(photo)}')` }">
		</div>
		<div class="card__body">
			<div class="card__title">
				{{ title }}
			</div>
			<div class="card__location">
				<svgicon icon="point-card" width="14" height="18"></svgicon>
				<span>
					{{ location }}
				</span>
			</div>
			<div class="card__descr" v-if="descr">
				{{descr | truncate(150, '...')}}
			</div>
			<div class="card__info infoPlace">
				<div class="card__info__item infoPlace__item" v-if="square">
					<div class="card__info__icon infoPlace__icon">
						<svgicon :icon="'area'" width="24" height="24"></svgicon>
					</div>
					<div class="card__info__value infoPlace__value">
						{{square.split(' ')[0]}}
						<span v-if="square.split(' ')[1]">{{ square.split(' ')[1] }}</span>
						<span v-else-if="!square.split(' ')[1]"> кв. м.</span>
					</div>
				</div>
				<div class="card__info__item infoPlace__item">
					<div class="card__info__icon infoPlace__icon">
						<svgicon :icon="'price'" width="24" height="24"></svgicon>
					</div>
					<div class="card__info__value infoPlace__value item-price">
						{{ formatPrice(price) }}
					</div>
				</div>
			</div>
			<div class="card__bottom">
          <span class="btn btn-link">
            Подробнее
            <svgicon icon="arrow-right" width="36" height="8"></svgicon>
          </span>
			</div>
		</div>
	</router-link>
</template>

<script>
  import '../compiled-icons/area';
  import '../compiled-icons/price';

  export default {
    name: 'Card',
    props: {
      filterText: String,
      descr: String,
      id: {},
      photo: {
        type: String,
      },
      title: {},
      location: {
        type: String,
      },
      square: {},
      price: {},
      src: {
        required: true,
      },
    },
	methods: {
      replaceUrl(url) {
        let newUrl = url.replace(/\s/g, '%20');
        return '/images/data/' + newUrl;
      },
      formatPrice(value) {
	    if (typeof (value) === 'undefined') return;
        let val = (value.split(',')[0]/1).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
	}
  };
</script>
