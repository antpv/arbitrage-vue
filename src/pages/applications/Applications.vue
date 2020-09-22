<template>
  <div>
    <!-- SELECT APPLICATION -->
    <vs-row>
      <vs-col w="12">
        <vs-button @click="openAddModal">
          Добавить
        </vs-button>
      </vs-col>
    </vs-row>

    <!-- TABLE -->
    <vs-row :style="{ marginTop: '15px' }">
      <vs-col w="12">
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                Bundle
              </vs-th>
              <vs-th>
                Offer
              </vs-th>
              <vs-th>
                Дефолтный язык пушей
              </vs-th>
              <vs-th>
                Ссылка на магазин
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in applications" :data="tr">
              <vs-td>
                {{ tr.bundle }}
              </vs-td>
              <vs-td>
                <template v-if="isValidUrl(tr.offer)">
                  <a :href="tr.offer" target="_blank">
                    {{ tr.offer }}
                  </a>
                </template>
                <template v-else>
                  {{ tr.offer }}
                </template>
              </vs-td>
              <vs-td>
                {{ tr.defaultLanguage }}
              </vs-td>
              <vs-td>
                <template v-if="isValidUrl(tr.link)">
                  <a :href="tr.link" target="_blank">
                    {{ tr.link }}
                  </a>
                </template>
                <template v-else>
                  {{ tr.link }}
                </template>
              </vs-td>
            </vs-tr>
          </template>
          <template v-if="currentPage !== max" #footer>
            <vs-pagination v-model="currentPage" :length="$vs.getLength(table, max)" />
          </template>
          <template #notFound>
            Нет записей
          </template>
        </vs-table>
      </vs-col>
    </vs-row>

    <!-- CREATE APPLICATION -->
    <vs-dialog width="400px" not-center v-model="addModalVisible">
      <template #header>
        <h4 class="not-margin">
          Новое приложение
        </h4>
      </template>

      <div class="form-container">
        <div class="form-container__row">
          <vs-input v-model="form.bundle" placeholder="Бандл">
            <template
              v-if="formErrors['bundle'] && formErrors['bundle'].length > 0"
              #message-danger
            >
              {{ formErrors['bundle'].join(', ') }}
            </template>
          </vs-input>
        </div>

        <div class="form-container__row">
          <vs-input v-model="form.offer" type="password" placeholder="Оффер">
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
          <vs-button @click="closeAddModal" dark transparent>
            Отмена
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import isValidUrl from '@/utils/isValidUrl'

export default {
  name: 'Applications',

  metaInfo() {
    return {
      title: 'Приложения'
    }
  },

  watch: {
    addModalVisible(isVisible) {
      if (isVisible === false) this.resetForm()
    }
  },

  data() {
    const applications = []

    return {
      currentPage: 1,
      max: 1,
      applications,
      addModalVisible: false,
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
    tableIsFetched() {
      return this.selectedApplication && this.fetchingApplicationStatistic === false
    },

    formIsValid() {
      return Object.values(this.formErrors).every(errors => errors.length === 0)
    }
  },

  methods: {
    isValidUrl,

    openAddModal() {
      this.addModalVisible = true
    },

    closeAddModal() {
      this.addModalVisible = false
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
        this.applications.push(payload)
        this.formRequest = false
        this.resetForm()
        this.closeAddModal()
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
