<template>
  <vs-dialog width="400px" not-center v-model="visibleModel">
    <template #header>
      <h4 class="no-margin">
        {{ isEditMode ? 'Редактировать пуш' : 'Новый пуш' }}
      </h4>
    </template>

    <div class="form-container">
      <!-- Application -->
      <div class="form-container__row">
        <vs-select
          :key="selectKey"
          label="App"
          v-model="form.AppId"
          :loading="applicationsIsFetching"
          block
        >
          <vs-option
            v-for="application in applications"
            :key="application.ID"
            :value="application.ID"
            :label="application.BundleId"
          >
            {{ application.BundleId }}
          </vs-option>

          <template v-if="formErrors['AppId'] && formErrors['AppId'].length > 0" #message-danger>
            {{ formErrors['AppId'].join(', ') }}
          </template>
        </vs-select>
      </div>

      <!-- Title -->
      <div class="form-container__row">
        <vs-input v-model="form.Title" label="Title" block>
          <template v-if="formErrors['Title'] && formErrors['Title'].length > 0" #message-danger>
            {{ formErrors['Title'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <!-- Message -->
      <div class="form-container__row">
        <vs-input v-model="form.Message" label="Message" block>
          <template
            v-if="formErrors['Message'] && formErrors['Message'].length > 0"
            #message-danger
          >
            {{ formErrors['Message'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <!-- Type -->
      <div class="form-container__row">
        <vs-input v-model="form.Type" label="Type" block>
          <template v-if="formErrors['Type'] && formErrors['Type'].length > 0" #message-danger>
            {{ formErrors['Type'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <!-- SubType -->
      <div class="form-container__row">
        <vs-input v-model="form.SubType" label="SubType" block>
          <template
            v-if="formErrors['SubType'] && formErrors['SubType'].length > 0"
            #message-danger
          >
            {{ formErrors['SubType'].join(', ') }}
          </template>
        </vs-input>
      </div>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button
          @click="() => (isEditMode ? updateTemplate() : makeTemplate())"
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
import { mapState } from 'vuex'
import TemplatesService from '@/services/TemplatesService'

export default {
  name: 'MakeTemplate',

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
      if (isVisible) {
        this.$store.dispatch('applications/getApplications').then(this.forceSelectRerender)

        if (this.isEditMode) {
          this.setEditedPayloadValuesInForm()
        }
      } else {
        this.resetForm()
      }
    }
  },

  data() {
    return {
      form: {
        Title: '',
        Message: '',
        Type: '',
        SubType: '',
        AppId: ''
      },
      selectKey: 0,
      formRequest: false,
      formErrors: {}
    }
  },

  computed: {
    ...mapState('applications', {
      applications: state => state.applications,
      applicationsIsFetching: state => state.request
    }),

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
      const properties = ['Title', 'Message', 'Type', 'SubType', 'AppId']

      properties.forEach(property => {
        const value = this.editedPayload[property]

        if (value !== undefined) {
          this.form[property] = value
        }
      })
    },

    forceSelectRerender() {
      this.selectKey += 1
    },

    close() {
      this.$emit('close')
    },

    resetForm() {
      this.form = {
        Title: '',
        Message: '',
        Type: '',
        SubType: '',
        AppId: ''
      }
      this.formErrors = {}
    },

    validateForm() {
      const { AppId } = this.form
      const errors = {}
      const requiredProperties = ['Title', 'Message', 'Type', 'SubType']

      for (const key in this.form) {
        errors[key] = []
      }

      if (AppId === '') {
        errors['AppId'].push('Значение обязательно')
      }

      requiredProperties.forEach(property => {
        if (!this.form[property].length) {
          errors[property].push('Значение обязательно')
        }
      })

      this.formErrors = errors
    },

    makeTemplate() {
      this.validateForm()

      if (this.formIsValid === false) return

      const payload = Object.assign({}, this.form)

      this.formRequest = true

      TemplatesService.createTemplate(payload)
        .then(() => {
          console.log('created')
        })
        .catch(() => {
          this.$vs.notification({
            color: 'danger',
            title: 'Ошибка',
            text: 'Не удалось создать пуш'
          })
        })
        .finally(() => {
          this.formRequest = false
        })

      // setTimeout(() => {
      //   this.$emit('success', payload)
      //   this.formRequest = false
      //   this.resetForm()
      //   this.close()
      // }, 500)
    },

    updateTemplate() {
      this.validateForm()

      if (this.formIsValid === false) return

      const payload = Object.assign({}, this.form)

      this.formRequest = true

      TemplatesService.editTemplate(this.editedPayload.ID, payload)
        .then(() => {
          console.log('edited')
        })
        .catch(() => {
          this.$vs.notification({
            color: 'danger',
            title: 'Ошибка',
            text: 'Не удалось обновить пуш'
          })
        })
        .finally(() => {
          this.formRequest = false
        })
    }
  }
}
</script>
