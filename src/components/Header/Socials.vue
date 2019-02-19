<template>
	<ul class="socials">
		<li class="socials__item" :key="item.sicon" v-for="item in socials">
			<a :href=item.surl class="socials__link">
				<img :src="item.sicon" alt="">
			</a>
		</li>
	</ul>

</template>

<script>
	import store from '@/store';

  export default {
    name: 'Socials',
    props: ['socials']
  };
</script>
