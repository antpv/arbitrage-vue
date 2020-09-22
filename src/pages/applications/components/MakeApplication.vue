<template>
  <vs-dialog width="400px" not-center v-model="visibleModel">
    <template #header>
      <h4 class="not-margin">
        Новое приложение
      </h4>
    </template>

    <div class="form-container">
      <div class="form-container__row">
        <vs-input v-model="form.bundle" placeholder="Бандл">
          <template v-if="formErrors['bundle'] && formErrors['bundle'].length > 0" #message-danger>
            {{ formErrors['bundle'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <div class="form-container__row">
        <vs-input v-model="form.offer" placeholder="Оффер">
          <template v-if="formErrors['offer'] && formErrors['offer'].length > 0" #message-danger>
            {{ formErrors['offer'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <div class="form-container__row">
        <vs-input v-model="form.defaultLanguage" placeholder="Дефольный язык">
          <template
            v-if="formErrors['defaultLanguage'] && formErrors['defaultLanguage'].length > 0"
            #message-danger
          >
            {{ formErrors['defaultLanguage'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <div class="form-container__row">
        <vs-input v-model="form.link" placeholder="Ссылка">
          <template v-if="formErrors['link'] && formErrors['link'].length > 0" #message-danger>
            {{ formErrors['link'].join(', ') }}
          </template>
        </vs-input>
      </div>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="makeApplication" :loading="formRequest" gradient>
          Создать
        </vs-button>
        <vs-button @click="close" dark transparent>
          Отмена
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  name: 'MakeApplication',

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    addModalVisible(isVisible) {
      if (isVisible === false) this.resetForm()
    }
  },

  data() {
    return {
      form: {
        bundle: '',
        offer: '',
        defaultLanguage: '',
        link: ''
      },
      formRequest: false,
      formErrors: {}
    }
  },

  computed: {
    visibleModel: {
      get() {
        return this.visible
      },
      set() {
        this.close()
      }
    },

    formIsValid() {
      return Object.values(this.formErrors).every(errors => errors.length === 0)
    }
  },

  methods: {
    close() {
      this.$emit('close')
    },

    resetForm() {
      this.form = {
        bundle: '',
        offer: '',
        defaultLanguage: '',
        link: ''
      }
      this.formErrors = {}
    },

    validateForm() {
      const { bundle, offer, defaultLanguage, link } = this.form
      const errors = {}

      for (const key in this.form) errors[key] = []

      if (!bundle.length) {
        errors['bundle'].push('Значение обязательно')
      }

      if (!offer.length) {
        errors['offer'].push('Значение обязательно')
      }

      if (!defaultLanguage.length) {
        errors['defaultLanguage'].push('Значение обязательно')
      }

      if (!link.length) {
        errors['link'].push('Значение обязательно')
      }

      this.formErrors = errors
    },

    makeApplication() {
      this.validateForm()

      if (this.formIsValid === false) return

      const payload = Object.assign({}, this.form)

      this.formRequest = true

      setTimeout(() => {
        this.$emit('success', payload)
        this.formRequest = false
        this.resetForm()
        this.close()
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  &__row {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
