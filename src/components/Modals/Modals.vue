<template>
	<div>
		<CallBack />
		<SignUp />
		<SignIn />
		<CatalogModal />
		<gallery-modal/>

	</div>
</template>

<script>
	import CallBack from './CallBack'
	import SignUp from './SignUp'
	import SignIn from './SignIn'
	import CatalogModal from './CatalogModal'
	import GalleryModal from './Gallery'

  export default {
	components: {
      CallBack,
      SignUp,
      SignIn,
      GalleryModal,
      CatalogModal,
	}
  }
</script>
