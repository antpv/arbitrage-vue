<template>
  <vs-dialog width="400px" not-center v-model="visibleModel">
    <template #header>
      <h4 class="no-margin">
        Новый шаблон
      </h4>
    </template>

    <div class="form-container">
      <!-- Application -->
      <div class="form-container__row">
        <vs-select
          :key="selectKey"
          placeholder="App"
          v-model="form.AppId"
          :loading="applicationsIsFetching"
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
        <vs-input v-model="form.Title" placeholder="Title">
          <template v-if="formErrors['Title'] && formErrors['Title'].length > 0" #message-danger>
            {{ formErrors['Title'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <!-- Message -->
      <div class="form-container__row">
        <vs-input v-model="form.Message" placeholder="Message">
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
        <vs-input v-model="form.Type" placeholder="Type">
          <template v-if="formErrors['Type'] && formErrors['Type'].length > 0" #message-danger>
            {{ formErrors['Type'].join(', ') }}
          </template>
        </vs-input>
      </div>

      <!-- SubType -->
      <div class="form-container__row">
        <vs-input v-model="form.SubType" placeholder="SubType">
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
        <vs-button @click="makeTemplate" :loading="formRequest" gradient>
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
import { mapState } from 'vuex'
import TemplatesService from '@/services/TemplatesService'

export default {
  name: 'MakeTemplate',

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    visible(isVisible) {
      if (isVisible === false) this.resetForm()
      else this.$store.dispatch('applications/getApplications').then(this.forceSelectRerender)
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
      const { Title, Message, Type, SubType, AppId } = this.form
      const errors = {}

      for (const key in this.form) {
        errors[key] = []
      }

      if (!Title.length) {
        errors['Title'].push('Значение обязательно')
      }

      if (!Message.length) {
        errors['Message'].push('Значение обязательно')
      }

      if (!Type.length) {
        errors['Type'].push('Значение обязательно')
      }

      if (!SubType.length) {
        errors['SubType'].push('Значение обязательно')
      }

      if (AppId === '') {
        errors['AppId'].push('Значение обязательно')
      }

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
        .finally(() => {
          this.formRequest = false
        })

      // setTimeout(() => {
      //   this.$emit('success', payload)
      //   this.formRequest = false
      //   this.resetForm()
      //   this.close()
      // }, 500)
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
