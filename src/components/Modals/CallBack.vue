<template>
	<modal name="call-back"
		   :adaptive="true"
		   height="auto"
		   :max-width="464">
		<div class="modal-wrapper">
			<div class="modal-inner">
				<span class="modal-close" @click="hide()">
					<svgicon icon="close" width="20" height="20" class="field__icon"></svgicon>
				</span>
				<div class="modal__head">
					<div class="modal__title">Обратная связь</div>
					<div class="modal__subtitle">Задайте ваш вопрос, и специалист ответит вам</div>
				</div>
				<form action="/" class="form form_main">
					<div class="form__field">
						<div class="form__field-wrapper" :class="{ 'form__field--error': $v.name.$error }">

							<input type="text"
								   class="input"
								   placeholder="Ваше имя"
								   v-model.trim="$v.name.$model"
								   @input="setName($event.target.value)"
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
						<div class="form__field-wrapper" :class="{ 'form__field--error': $v.email.$error }">
							<input type="text"
								   class="input"
								   placeholder="Email"
								   v-model.trim="$v.email.$model"
								   @input="setMail($event.target.value)">
							<svgicon icon="mail" width="17" height="12" class="field__icon"></svgicon>
						</div>
						<div class="error"
							 v-if="!$v.email.email">
							Введите действительный формат почты
						</div>
					</div>
					<div class="form__field">
					<textarea class="input" placeholder="Ваше сообщение"
							  v-model="message"></textarea>
					</div>
					<div class="form__error" v-if="submitStatus === 'ERROR'">
						Похоже, вы неверно заполнили поле
					</div>
					<div class="form__button">
						<button class="btn btn-submit" @click.prevent="submitForm()">Отправить</button>
					</div>
					<div class="form__security">
						<p>
							Регистрируясь, вы принимаете наши <a href="#" target="_blank">Условия</a>
							и согласны с <a href="#" target="_blank">Политикой конфиденциальности</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	</modal>
</template>

<script>
  import '@/compiled-icons/user2'
  import '@/compiled-icons/mail'
  import '@/compiled-icons/close'

  import {required, minLength, email} from 'vuelidate/lib/validators'

  import {ModalForm} from '@/common/api.service'

  export default {
    data: () => ({
      name: '',
      email: '',
      message: '',
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
    },
    methods: {
      setName(value) {
        this.name = value;
        this.$v.email.$touch();
      },
      setMail(value) {
        this.email = value;
        this.$v.mail.$touch();
      },
      hide() {
        this.$modal.hide('call-back');
      },
      submitForm() {
        let payload = {
          name: this.name,
          email: this.email,
          message: this.message,
        };
        let data = new FormData();
        data.append("json", JSON.stringify(payload));


        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
        }

        // ModalForm.post(data)
      }
    }
  }
</script>
