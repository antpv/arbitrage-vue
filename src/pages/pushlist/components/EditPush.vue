<template>
  <vs-dialog width="400px" not-center v-model="visibleModel">
    <template #header>
      <h4 class="not-margin">
        Редактировать пуш
      </h4>
    </template>

    <div class="form-container" v-if="hasData">
      <div
        class="form-container__language-section"
        v-for="(language, index) in form.languages"
        :key="language.id"
      >
        <div class="form-container__row">
          <vs-input v-model="form.languages[index].languageName" placeholder="Язык" />
        </div>
        <div class="form-container__row">
          <vs-input v-model="form.languages[index].title" placeholder="Заголовок" />
        </div>
        <div class="form-container__row">
          <vs-input v-model="form.languages[index].description" placeholder="Содержимое" />
        </div>
        <div class="form-container__row">
          <vs-button size="small" color="danger" flat @click.stop="removeLanguage(language.id)">
            Удалить
          </vs-button>
        </div>
      </div>

      <div class="form-container__row">
        <vs-button flat @click="addNewLanguage">
          Добавить язык
        </vs-button>
      </div>

      <div class="form-container__row">
        <vs-input v-model="form.comment" placeholder="Комментарий">
          <template
            v-if="formErrors['comment'] && formErrors['comment'].length > 0"
            #message-danger
          >
            {{ formErrors['comment'].join(', ') }}
          </template>
        </vs-input>
      </div>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="editPush" :loading="formRequest" gradient>
          Применить
        </vs-button>
        <vs-button @click="close" dark transparent>
          Отмена
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import makeFakeId from '@/utils/makeFakeId'

export default {
  name: 'EditPush',

  props: {
    visible: {
      type: Boolean,
      required: true
    },

    editedPush: {
      type: Object,
      required: false
    }
  },

  watch: {
    visible(isVisible) {
      if (isVisible === false) this.resetForm()
    },

    editedPush(payload) {
      if (payload) this.setForm(payload)
    }
  },

  data() {
    return {
      form: {
        name: '',
        comment: '',
        languages: []
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
    },

    hasData() {
      return new Boolean(this.editedPush)
    }
  },

  methods: {
    close() {
      this.$emit('close')
    },

    resetForm() {
      this.form = {
        comment: '',
        languages: []
      }
      this.formErrors = {}
    },

    setForm(payload) {
      this.form.comment = payload.comment
      this.form.languages = payload.languages.map(languagePayload =>
        Object.assign({}, languagePayload)
      )
    },

    addNewLanguage() {
      this.form.languages.push({ languageName: '', description: '', title: '', id: makeFakeId() })
    },

    removeLanguage(id) {
      this.form.languages = this.form.languages.filter(language => language.id !== id)
    },

    validateForm() {
      const errors = {}

      for (const key in this.form) errors[key] = []

      this.formErrors = errors
    },

    editPush() {
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
  &__language-section {
    border-bottom: 1px solid rgba(var(--vs-gray-3), 1);
    padding-bottom: 15px;
    padding-top: 15px;

    &:first-child {
      padding-top: 0;
    }
  }

  &__row {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
