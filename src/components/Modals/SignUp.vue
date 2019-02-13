<template>
	<modal name="sign-up"
		   :adaptive="true"
		   height="auto"
		   :max-width="464">
		<div class="modal-inner">
				<span class="modal-close" @click="hide()">
					<svgicon icon="close" width="20" height="20" class="field__icon"></svgicon>
				</span>
			<div class="modal__head">
				<div class="logo text-center"><span>Дипломат</span></div>
				<div class="modal__subtitle">
					Зарегистрируйтесь, чтобы получить доступ к избранному
				</div>
			</div>
			<form action="/" class="form form_main">
				<div class="form__field">
					<div class="form__field-wrapper"
						 :class="{ 'form__field--error': $v.name.$error }">

						<input type="text"
							   class="input"
							   placeholder="Ваше имя"
							   v-model.trim="$v.name.$model"
							   @blur="setName($event.target.value)"
						>
						<svgicon icon="user2" width="15" height="18" class="field__icon"></svgicon>
					</div>
					<div class="error"
						 v-if="!$v.name.minLength">
						Имя должно содержать не менее
						{{$v.name.$params.minLength.min}}
						букв.
					</div>
				</div>

				<div class="form__field">
					<div class="form__field-wrapper"
						 :class="{ 'form__field--error': $v.email.$error }">
						<input type="text"
							   class="input"
							   placeholder="Email"
							   v-model.trim="$v.email.$model"
							   @blur="setMail($event.target.value)">
						<svgicon icon="mail" width="17" height="12" class="field__icon"></svgicon>
					</div>
					<div class="error"
						 v-if="!$v.email.email">
						Введите действительный формат почты
					</div>
				</div>
				<div class="form__field">
					<div class="form__field-wrapper"
						 :class="{ 'form__field--error': $v.password.$error }">
						<input type="text"
							   class="input"
							   placeholder="Пароль"
							   v-model.trim="$v.password.$model"
							   @blur="setPassword($event.target.value)">
						<svgicon icon="password" width="16" height="16"
								 class="field__icon"></svgicon>
					</div>
					<!--<div class="error"-->
					<!--v-if="!$v.password.required">-->
					<!--Обязательное поле-->
					<!--</div>-->
				</div>
				<div class="form__field">
					<div class="form__field-wrapper"
						 :class="{ 'form__field--error': $v.passwordRe.$error }">
						<input type="text"
							   class="input"
							   placeholder="Повторите пароль"
							   v-model.trim="$v.passwordRe.$model"
							   @blur="setPasswordRe($event.target.value)">
						<svgicon icon="password" width="16" height="16"
								 class="field__icon"></svgicon>
					</div>
					<div class="error" v-if="!$v.passwordRe.sameAsPassword">Не совпадают введенные
						пароли
					</div>
				</div>
				<div class="form__error" v-if="submitStatus === 'ERROR'">
					Похоже, вы неверно заполнили поле
				</div>
				<div class="form__button">
					<button class="btn btn-submit" @click.prevent="submitForm()">Создать аккаунт
					</button>
				</div>
				<div class="form__security">
					<p>
						Регистрируясь, вы принимаете наши <a href="#" target="_blank">Условия</a>
						и согласны с <a href="#" target="_blank">Политикой конфиденциальности</a>
					</p>
				</div>
				<div class="form__auth">
					Уже есть аккаунт? <a href="#" @click.prevent="showSignIn()">
					Войдите на сайт
				</a>
				</div>
			</form>
		</div>
	</modal>
</template>

<script>
  import '@/compiled-icons/user2'
  import '@/compiled-icons/mail'
  import '@/compiled-icons/password'
  import '@/compiled-icons/close'

  import { REGISTER } from '@/store/actions.type'

  import {required, minLength, email, sameAs} from 'vuelidate/lib/validators'

  import {ModalForm} from '@/common/api.service'

  export default {
    data: () => ({
      name: '',
      email: '',
      password: '',
      passwordRe: '',
      submitStatus: null
    }),
    validations: {
      name: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6)
      },
      passwordRe: {
        sameAsPassword: sameAs('password')
      }
    },
    methods: {
      setName(value) {
        this.name = value;
        this.$v.name.$touch();
      },
      setMail(value) {
        this.email = value;
        this.$v.email.$touch();
      },
      setPassword(value) {
        this.password = value;
        this.$v.password.$touch();
      },
      setPasswordRe(value) {
        this.passwordRe = value;
        this.$v.passwordRe.$touch();
      },
      hide() {
        this.$modal.hide('sign-up');
      },
      showSignIn() {
        this.$modal.hide('sign-up');
        this.$modal.show('sign-in');
      },
      submitForm() {
        let payload = {
          name: this.name,
          email: this.email,
          message: this.message,
        };
        let data = new FormData();
        data.append("json", JSON.stringify(payload));

        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK';

          this.$store.dispatch(REGISTER, {
            login: this.email,
            name: this.name,
            password: this.password,
            password2: this.passwordRe,
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
