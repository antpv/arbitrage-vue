<template>
  <div>
    <!-- SELECT APPLICATION -->
    <vs-row>
      <vs-col w="12">
        <div class="actions">
          <vs-select
            placeholder="Выберите приложение"
            class="actions__action"
            v-model="selectedApplication"
            :loading="fetchingApplicationStatistic"
          >
            <vs-option
              v-for="application in applications"
              :key="application.value"
              :label="application.label"
              :value="application.value"
            >
              {{ application.label }}
            </vs-option>
          </vs-select>
          <vs-input type="date" class="actions__action" v-model="dateFilters.fromDate" />
          <vs-input type="date" class="actions__action" v-model="dateFilters.toDate" />
          <vs-button
            v-if="selectedApplication"
            :loading="reloadApplicationStatistic"
            class="actions__action"
            @click="reload"
          >
            Обновить
          </vs-button>
          <vs-button v-if="hasFilters" class="actions__action" flat @click="resetDateFilters">
            Сбросить фильтры
          </vs-button>
        </div>
      </vs-col>
    </vs-row>

    <!-- TABLE -->
    <vs-row v-if="tableIsFetched" :style="{ marginTop: '15px' }">
      <vs-col w="12">
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                Дата
              </vs-th>
              <vs-th>
                Установки
              </vs-th>
              <vs-th>
                10м нет реги
              </vs-th>
              <vs-th>
                Регистрации
              </vs-th>
              <vs-th>
                24ч нет реги
              </vs-th>
              <vs-th>
                Регистрации
              </vs-th>
              <vs-th>
                48ч нет реги
              </vs-th>
              <vs-th>
                Регистрации
              </vs-th>
              <vs-th>
                30м нет депа
              </vs-th>
              <vs-th>
                Депы
              </vs-th>
              <vs-th>
                24ч нет депа
              </vs-th>
              <vs-th>
                Депы
              </vs-th>
              <vs-th>
                48ч нет депа
              </vs-th>
              <vs-th>
                Депы
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in filteredTable" :data="tr">
              <vs-td>
                {{ momentProvider(tr.CreatedAt).format('DD.MM.YYYY') }}
              </vs-td>
              <vs-td>
                {{ tr.Installs }}
              </vs-td>
              <vs-td>
                {{ tr.NoReg10MinPush }}
              </vs-td>
              <vs-td>
                {{ tr.RegsAfter10MinPush }}
              </vs-td>
              <vs-td>
                {{ tr.NoReg24HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.RegsAfter24HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.NoReg48HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.RegsAfter48HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.NoDep30MinPush }}
              </vs-td>
              <vs-td>
                {{ tr.DepsAfter30MinPush }}
              </vs-td>
              <vs-td>
                {{ tr.NoDep24HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.DepsAfter24HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.NoDep48HrsPush }}
              </vs-td>
              <vs-td>
                {{ tr.DepsAfter48HrsPush }}
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
  </div>
</template>

<script>
import StatisticsService from '@/services/StatisticsService'

export default {
  name: 'Statistics',

  metaInfo() {
    return {
      title: 'Статистика'
    }
  },

  watch: {
    selectedApplication(value) {
      if (value) {
        this.fetchingApplicationStatistic = true

        StatisticsService.getStatistics()
          .then(results => {
            this.table = results
          })
          .finally(() => {
            this.fetchingApplicationStatistic = false
          })
      }
    }
  },

  data() {
    const applications = [{ label: 'game.jeen.hd', value: 'game.jeen.hd' }]

    return {
      applications,
      currentPage: 1,
      max: 1,
      selectedApplication: '',
      fetchingApplicationStatistic: false,
      reloadApplicationStatistic: false,
      table: [],
      dateFilters: {
        fromDate: '',
        toDate: ''
      }
    }
  },

  computed: {
    tableIsFetched() {
      return this.selectedApplication && this.fetchingApplicationStatistic === false
    },

    hasFilters() {
      const { fromDate, toDate } = this.dateFilters

      return fromDate && toDate
    },

    filteredTable() {
      const { fromDate, toDate } = this.dateFilters

      if (this.hasFilters) {
        return this.table.filter(push => {
          return (
            this.$moment(push.CreatedAt).isSameOrAfter(fromDate) &&
            this.$moment(push.CreatedAt).isSameOrBefore(toDate)
          )
        })
      }

      return this.table
    }
  },

  methods: {
    momentProvider(date) {
      return this.$moment(date)
    },

    resetDateFilters() {
      this.dateFilters = {
        toDate: '',
        fromDate: ''
      }
    },

    reload() {
      this.reloadApplicationStatistic = true

      StatisticsService.getStatistics()
        .then(results => {
          this.table = results
        })
        .finally(() => {
          this.reloadApplicationStatistic = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;

  &__action {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
