<template>
  <div>
    <!-- SELECT APPLICATION -->
    <vs-row>
      <vs-col w="12">
        <vs-button @click="() => openFormModal()">
          Добавить
        </vs-button>
      </vs-col>
    </vs-row>

    <!-- TABLE -->
    <vs-row :style="{ marginTop: '15px' }">
      <vs-col w="12">
        <vs-table ref="table" striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                BundleId
              </vs-th>
              <vs-th>
                Name
              </vs-th>
              <vs-th>
                AppsflyerId
              </vs-th>
              <vs-th>
                FacebookId
              </vs-th>
              <vs-th>
                MagicCheckerId
              </vs-th>
              <vs-th>
                PushApiKey
              </vs-th>
              <vs-th>
                UserXId
              </vs-th>
              <vs-th>
                CreatedAt
              </vs-th>
              <vs-th>
                UpdatedAt
              </vs-th>
              <vs-th />
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="tr.ID" v-for="tr in applications" :data="tr">
              <vs-td>
                {{ tr.BundleId }}
              </vs-td>
              <vs-td>
                {{ tr.Name }}
              </vs-td>
              <vs-td class="break-all">
                {{ tr.AppsflyerId }}
              </vs-td>
              <vs-td class="break-all">
                {{ tr.FacebookId }}
              </vs-td>
              <vs-td class="break-all">
                {{ tr.MagicCheckerId }}
              </vs-td>
              <vs-td class="break-all">
                {{ tr.PushApiKey }}
              </vs-td>
              <vs-td class="break-all">
                {{ tr.UserXId }}
              </vs-td>
              <vs-td>
                {{ momentProvider(tr.CreatedAt).format('DD.MM.YYYY') }}
              </vs-td>
              <vs-td>
                {{ momentProvider(tr.UpdatedAt).format('DD.MM.YYYY') }}
              </vs-td>
              <vs-td>
                <div class="flex-end">
                  <vs-button flat size="small" @click="openFormModal(tr)">
                    Редактировать
                  </vs-button>
                </div>
              </vs-td>
              <!-- <vs-td>
                <template v-if="isValidUrl(tr.offer)">
                  <a :href="tr.offer" target="_blank">
                    {{ tr.offer }}
                  </a>
                </template>
                <template v-else>
                  {{ tr.offer }}
                </template>
              </vs-td> -->
              <!-- <vs-td>
                <template v-if="isValidUrl(tr.link)">
                  <a :href="tr.link" target="_blank">
                    {{ tr.link }}
                  </a>
                </template>
                <template v-else>
                  {{ tr.link }}
                </template>
              </vs-td> -->
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
    <MakeApplication
      :visible="formModalVisible"
      :editedPayload="formModalPayload"
      :isEditMode="formModalPayload !== null"
      @close="closeFormModal"
      @success="payload => applications.push(payload)"
    />
  </div>
</template>

<script>
import MakeApplication from './components/MakeApplication'
// import isValidUrl from '@/utils/isValidUrl'

export default {
  name: 'Applications',

  metaInfo() {
    return {
      title: 'Приложения'
    }
  },

  components: {
    MakeApplication
  },

  mounted() {
    this.setLoader()

    this.$store.dispatch('applications/getApplications').finally(() => {
      this.unsetLoader()
    })
  },

  data() {
    return {
      currentPage: 1,
      max: 1,
      formModalVisible: false,
      formModalPayload: null
    }
  },

  computed: {
    tableIsFetched() {
      return this.selectedApplication && this.fetchingApplicationStatistic === false
    },

    applications() {
      return this.$store.state.applications.applications
    }
  },

  methods: {
    // isValidUrl,

    momentProvider(date) {
      return this.$moment(date)
    },

    setLoader() {
      this._loadingCallback = this.$vs.loading({ target: this.$refs.table })
    },

    unsetLoader() {
      this._loadingCallback && this._loadingCallback.close()
    },

    openFormModal(payload = null) {
      this.formModalPayload = payload ? Object.assign({}, payload) : null
      this.formModalVisible = true
    },

    closeFormModal() {
      this.formModalPayload = null
      this.formModalVisible = false
    }
  }
}
</script>
