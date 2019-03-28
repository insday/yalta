<template>
	<modal name="sign-in"
		   :adaptive="true"
		   height="auto"
		   :max-width="464">
		<div class="modal-inner">
				<span class="modal-close" @click="hide()">
					<svgicon icon="close"
							 width="20"
							 height="20"
							 class="field__icon"></svgicon>
				</span>
			<div class="modal__head">
				<div class="logo text-center"><span>Дипломат</span></div>
			</div>
			<div class="form__r">
				<div class="form__title">
					<span>Войдите через соцсети</span>
				</div>

				<div class="authSocials">
					<div class="authSocials__item">
						<a href="#"
						   class="authSocials__link authSocials__link--vk">
							<svg width="29" height="17" viewBox="0 0 29 17" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path d="M28.7362 15.1599C28.6269 15.0468 28.1897 13.9155 25.8942 11.7659C23.4894 9.39011 23.8173 9.84265 26.6593 5.76983C28.4083 3.28088 29.1735 1.81014 28.9548 1.13134C28.7362 0.565669 27.4245 0.678803 27.4245 0.678803L23.0521 0.791937C23.0521 0.791937 22.7242 0.678803 22.5056 0.905071C22.287 1.0182 22.0684 1.35761 22.0684 1.35761C22.0684 1.35761 21.4125 3.16775 20.538 4.86476C18.5705 8.25877 17.8053 8.37191 17.4773 8.25877C16.7122 7.6931 16.9308 6.22236 16.9308 5.20416C16.9308 1.92328 17.4774 0.56567 15.947 0.226268C15.5098 0.113134 15.1819 -1.07893e-07 13.8702 -1.07893e-07C12.3398 -1.07893e-07 11.0281 1.0115e-07 10.2629 0.339402C9.71638 0.565669 9.38847 1.13134 9.60709 1.13134C9.93502 1.24447 10.5909 1.35761 10.9188 1.81014C11.356 2.48894 11.356 3.84655 11.356 3.84655C11.356 3.84655 11.684 7.6931 10.7002 8.25877C10.1536 8.59817 9.27915 7.91937 7.6395 4.86476C6.76503 3.28088 6.10918 1.58387 6.10918 1.58387C6.10918 1.58387 5.99988 1.24447 5.78127 1.0182C5.45334 0.791937 5.1254 0.678803 5.1254 0.678803L0.971626 0.791937C0.971626 0.791937 0.315783 0.791937 0.0971639 1.13134C-0.121455 1.35761 0.0971639 1.92328 0.0971639 1.92328C0.0971639 1.92328 3.26712 9.72951 6.98364 13.6892C10.4815 17.1963 14.3074 16.9701 14.3074 16.9701H15.947C15.947 16.9701 16.4936 16.8569 16.7122 16.6307C16.9308 16.2913 16.9308 15.8387 16.9308 15.8387C16.9308 15.8387 16.8215 13.4629 17.9146 13.1235C19.0077 12.7841 20.3194 15.4993 21.7404 16.4044C22.8335 17.1963 23.708 16.9701 23.708 16.9701L27.5338 16.8569C27.6431 16.9701 29.72 16.8569 28.7362 15.1599Z"
									  fill="white"/>
							</svg>
						</a>
					</div>

					<div class="authSocials__item">
						<a href="#"
						   class="authSocials__link authSocials__link--fb">
							<svg width="13" height="25" viewBox="0 0 13 25" fill="none"
								 xmlns="http://www.w3.org/2000/svg">
								<path d="M8.26684 8.19444V5.83333C8.26684 4.72222 8.40462 4.16667 10.058 4.16667H12.4003V0H8.68018C4.2712 0 2.75561 2.08333 2.75561 5.55556V8.33333H0V12.5H2.75561V25H8.26684V12.5H11.9869L12.538 8.33333H8.26684V8.19444Z"
									  fill="white"/>
							</svg>
						</a>
					</div>

					<div class="authSocials__item">
						<a href="#"
							class="authSocials__link authSocials__link--google">
							<img src="/static/img/google.png" alt="">
						</a>
					</div>
				</div>
			</div>

			<div class="form__r">
				<div class="form__title">
					<span>Или используйте почту</span>
				</div>
				<form action="/" class="form form_main">

					<div class="form__error">
						<span class="error" v-if="formErr && Object.keys(formErr).length">{{formErr}}</span>
					</div>
					<div class="form__field">
						<div class="form__field-wrapper"
							 :class="{ 'form__field--error': $v.email.$error }">
							<input type="text"
								   class="input"
								   placeholder="Email"
								   @blur="setMail($event.target.value)">
							<svgicon icon="mail" width="17" height="12"
									 class="field__icon"></svgicon>
						</div>
						<div class="error"
							 v-if="!$v.email.email">
							Введите действительный формат почты
						</div>
					</div>
					<div class="form__field">
						<div class="form__field-wrapper"
							 :class="{ 'form__field--error': $v.password.$error }">
							<input type="password"
								   class="input"
								   placeholder="Пароль"
								   v-model.trim="$v.password.$model"
								   @blur="setPassword($event.target.value)">
							<svgicon icon="password" width="16" height="16"
									 class="field__icon"></svgicon>
						</div>
					</div>
					<div class="form__error" v-if="submitStatus === 'ERROR'">
						Похоже, вы неверно заполнили поле
					</div>
					<div class="form__field">
						<div class="form__checkbox">
							<label for="checkAuth">
								<input type="checkbox" id="checkAuth" value="Запомнить меня">
								<span class="checkbox__target"></span> <span>
										   Запомнить меня
									   </span></label></div>
					</div>
					<div class="form__button">
						<button class="btn btn-submit" @click.prevent="submitForm()">Войти на сайт
						</button>
					</div>
					<div class="form__auth">
						Еще нет аккаунта? <a href="#" @click.prevent="showSignUp()">
						Зарегистрируйтесь
					</a>
					</div>
				</form>
			</div>

		</div>
	</modal>
</template>

<script>
  import {mapGetters} from 'vuex';

  import '@/compiled-icons/user2'
  import '@/compiled-icons/mail'
  import '@/compiled-icons/password'
  import '@/compiled-icons/close'

  import {LOGIN, REGISTER} from '@/store/actions.type'

  import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'

  export default {
    data: () => ({
      email: '',
      password: '',
      submitStatus: null,
	  hashTarget: ''
    }),
    computed: {
      ...mapGetters({
        formErr: 'isError'
      }),
    },
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      setMail(value) {
        this.email = value;
        this.$v.email.$touch();
      },
      setPassword(value) {
        this.password = value;
        this.$v.password.$touch();
      },
      hide() {
        this.$modal.hide('sign-in');
      },
      showSignUp() {
        this.$modal.hide('sign-in');
        this.$modal.show('sign-up');
      },
      submitForm() {

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK';

          this.$store.dispatch(LOGIN, {
            login: this.email,
            password: this.password,
          })
            .then(() => {
              this.$router.push({name: 'Profile'});
              this.$modal.hide('sign-in');
              this.$modal.hide('sign-up');
            });
        }
      }
    }
  }
</script>
