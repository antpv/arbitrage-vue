<template>
  <div>
    <!-- SELECT APPLICATION -->
    <vs-row>
      <vs-col w="12">
        <vs-button
          @click="openAddModal"
        >
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
                {{ tr.offer }}
              </vs-td>
              <vs-td>
                {{ tr.defaultLanguagle }}
              </vs-td>
              <vs-td>
                {{ tr.link }}
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
    <vs-dialog not-center v-model="addModalVisible">
      <template #header>
        <h4 class="not-margin">
          Новое приложение
        </h4>
      </template>

      <div class="form-container">
        <div class="form-container__row">
          <vs-input v-model="form.bundle" placeholder="Бандл" />
        </div>

        <div class="form-container__row">
          <vs-input v-model="form.offer" type="password" placeholder="Оффер" />
        </div>

        <div class="form-container__row">
          <vs-input v-model="form.defaultLanguage" placeholder="Дефольный язык" />
        </div>

        <div class="form-container__row">
          <vs-input v-model="form.link" state="danger" placeholder="Ссылка" />
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
export default {
  name: 'Applications',

  metaInfo() {
    return {
      title: 'Приложения'
    }
  },

  data() {
    const applications = [
      {
        bundle: 'game.jeen.hd',
        offer: 'https://store.websnews.website/T1HZv7',
        defaultLanguagle: 'PL',
        link: 'play.google.com/id=com.game'
      }
    ]

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
      formRequest: false
    }
  },

  computed: {
    tableIsFetched() {
      return this.selectedApplication && this.fetchingApplicationStatistic === false
    }
  },

  methods: {
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
    },

    makeApplication() {
      const payload = Object.assign({}, this.form)

      this.formRequest = true

      setTimeout(() => {
        this.applications.push(payload)
        this.formRequest =  false
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
