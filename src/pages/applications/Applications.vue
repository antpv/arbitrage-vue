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
    <MakeApplication
      :visible="addModalVisible"
      @close="closeAddModal"
      @success="payload => applications.push(payload)"
    />
  </div>
</template>

<script>
import MakeApplication from './components/MakeApplication'
import isValidUrl from '@/utils/isValidUrl'

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

  data() {
    const applications = []

    return {
      currentPage: 1,
      max: 1,
      applications,
      addModalVisible: false
    }
  },

  computed: {
    tableIsFetched() {
      return this.selectedApplication && this.fetchingApplicationStatistic === false
    }
  },

  methods: {
    isValidUrl,

    openAddModal() {
      this.addModalVisible = true
    },

    closeAddModal() {
      this.addModalVisible = false
    }
  }
}
</script>
