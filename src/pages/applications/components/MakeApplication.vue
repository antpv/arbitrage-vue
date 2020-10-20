<template>
  <vs-dialog width="400px" not-center v-model="visibleModel">
    <template #header>
      <h4 class="no-margin">
        {{ isEditMode ? 'Редактировать приложение' : 'Новое приложение' }}
      </h4>
    </template>

    <div class="form-container">
      <div class="form-container__row" v-for="(value, property) in form" :key="property">
        <vs-input v-model="form[property]" :label="property" block>
          <template v-if="formErrors[property] && formErrors[property].length > 0" #message-danger>
            {{ formErrors[property].join(', ') }}
          </template>
        </vs-input>
      </div>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button
          @click="() => (isEditMode ? updateApplication() : makeApplication())"
          :loading="formRequest"
          gradient
        >
          {{ isEditMode ? 'Редактировать' : 'Создать' }}
        </vs-button>
        <vs-button @click="close" dark transparent>
          Отмена
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'

export default {
  name: 'MakeApplication',

  props: {
    visible: {
      type: Boolean,
      required: true
    },

    isEditMode: {
      type: Boolean,
      default: false
    },

    editedPayload: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  watch: {
    visible(isVisible) {
      if (isVisible && this.isEditMode) {
        this.setEditedPayloadValuesInForm()
      } else if (isVisible === false) {
        this.resetForm()
      }
    }
  },

  data() {
    return {
      form: {
        AmplitudeId: '',
        AppsflyerId: '',
        BundleId: '',
        FacebookId: '',
        MagicCheckerId: '',
        Name: '',
        PushApiKey: '',
        UserXId: ''
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
    setEditedPayloadValuesInForm() {
      const properties = [
        'AmplitudeId',
        'AppsflyerId',
        'BundleId',
        'FacebookId',
        'MagicCheckerId',
        'Name',
        'PushApiKey',
        'UserXId'
      ]

      properties.forEach(property => {
        const value = this.editedPayload[property]

        if (value !== undefined) {
          console.log(`Set "${value}" for ${property}`)
          this.form[property] = value
        }
      })
    },

    close() {
      this.$emit('close')
    },

    resetForm() {
      this.form = {
        AmplitudeId: '',
        AppsflyerId: '',
        BundleId: '',
        FacebookId: '',
        MagicCheckerId: '',
        Name: '',
        PushApiKey: '',
        UserXId: ''
      }
      this.formErrors = {}
    },

    validateForm() {
      const errors = {}

      for (const key in this.form) errors[key] = []

      const requiredProperties = [
        'AmplitudeId',
        'AppsflyerId',
        'BundleId',
        'FacebookId',
        'MagicCheckerId',
        'Name',
        'PushApiKey',
        'UserXId'
      ]

      requiredProperties.forEach(property => {
        if (!this.form[property].length) {
          errors[property].push('Значение обязательно')
        }
      })

      this.formErrors = errors
    },

    makeApplication() {
      this.validateForm()

      if (this.formIsValid === false) return

      const payload = Object.assign({}, this.form)

      this.formRequest = true

      ApplicationsService.createApplication(payload)
        .then(() => {
          console.log('created')
        })
        .catch(() => {
          this.$vs.notification({
            color: 'danger',
            title: 'Ошибка',
            text: 'Не удалось создать приложение'
          })
        })
        .finally(() => {
          this.formRequest = false
        })
    },

    updateApplication() {
      this.validateForm()

      if (this.formIsValid === false) return

      const payload = Object.assign({}, this.form)

      this.formRequest = true

      ApplicationsService.editApplication(this.editedPayload.ID, payload)
        .then(() => {
          console.log('edited')
        })
        .catch(() => {
          this.$vs.notification({
            color: 'danger',
            title: 'Ошибка',
            text: 'Не удалось обновить приложение'
          })
        })
        .finally(() => {
          this.formRequest = false
        })
    }
  }
}
</script>
