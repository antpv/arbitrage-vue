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
            flat
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
                Date
              </vs-th>
              <vs-th>
                Installs
              </vs-th>
              <vs-th>
                <div class="subtitle-short">
                  Reg<br />
                  &lt;10 min
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle">
                  <div class="subtitle__title">
                    10 min no reg
                  </div>
                  <div class="subtitle__row">
                    <div class="subtitle__column">
                      Sent
                    </div>
                    <div class="subtitle__column">
                      Open
                    </div>
                    <div class="subtitle__column">
                      Reg
                    </div>
                  </div>
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle">
                  <div class="subtitle__title">
                    24 h no reg
                  </div>
                  <div class="subtitle__row">
                    <div class="subtitle__column">
                      Sent
                    </div>
                    <div class="subtitle__column">
                      Open
                    </div>
                    <div class="subtitle__column">
                      Reg
                    </div>
                  </div>
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle">
                  <div class="subtitle__title">
                    48 h no reg
                  </div>
                  <div class="subtitle__row">
                    <div class="subtitle__column">
                      Sent
                    </div>
                    <div class="subtitle__column">
                      Open
                    </div>
                    <div class="subtitle__column">
                      Reg
                    </div>
                  </div>
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle-short">
                  Dep<br />
                  &lt;10 min
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle">
                  <div class="subtitle__title">
                    30 min no dep
                  </div>
                  <div class="subtitle__row">
                    <div class="subtitle__column">
                      Sent
                    </div>
                    <div class="subtitle__column">
                      Open
                    </div>
                    <div class="subtitle__column">
                      Reg
                    </div>
                  </div>
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle">
                  <div class="subtitle__title">
                    24 h no dep
                  </div>
                  <div class="subtitle__row">
                    <div class="subtitle__column">
                      Sent
                    </div>
                    <div class="subtitle__column">
                      Open
                    </div>
                    <div class="subtitle__column">
                      Reg
                    </div>
                  </div>
                </div>
              </vs-th>
              <vs-th>
                <div class="subtitle">
                  <div class="subtitle__title">
                    48 h no dep
                  </div>
                  <div class="subtitle__row">
                    <div class="subtitle__column">
                      Sent
                    </div>
                    <div class="subtitle__column">
                      Open
                    </div>
                    <div class="subtitle__column">
                      Reg
                    </div>
                  </div>
                </div>
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
                <div class="description-short">
                  N/A
                </div>
              </vs-td>
              <vs-td>
                <div class="subtable">
                  <div class="subtable__row">
                    <div class="subtable__column">
                      {{ tr.NoReg10MinPush }}
                    </div>
                    <div class="subtable__column">
                      N/A
                    </div>
                    <div class="subtable__column">
                      {{ tr.RegsAfter10MinPush }}
                    </div>
                  </div>
                </div>
              </vs-td>
              <vs-td>
                <div class="subtable">
                  <div class="subtable__row">
                    <div class="subtable__column">
                      {{ tr.NoReg24HrsPush }}
                    </div>
                    <div class="subtable__column">
                      N/A
                    </div>
                    <div class="subtable__column">
                      {{ tr.RegsAfter24HrsPush }}
                    </div>
                  </div>
                </div>
              </vs-td>
              <vs-td>
                <div class="subtable">
                  <div class="subtable__row">
                    <div class="subtable__column">
                      {{ tr.NoReg48HrsPush }}
                    </div>
                    <div class="subtable__column">
                      N/A
                    </div>
                    <div class="subtable__column">
                      {{ tr.RegsAfter48HrsPush }}
                    </div>
                  </div>
                </div>
              </vs-td>
              <vs-td>
                <div class="description-short">
                  N/A
                </div>
              </vs-td>
              <vs-td>
                <div class="subtable">
                  <div class="subtable__row">
                    <div class="subtable__column">
                      {{ tr.NoDep30MinPush }}
                    </div>
                    <div class="subtable__column">
                      N/A
                    </div>
                    <div class="subtable__column">
                      {{ tr.DepsAfter30MinPush }}
                    </div>
                  </div>
                </div>
              </vs-td>
              <vs-td>
                <div class="subtable">
                  <div class="subtable__row">
                    <div class="subtable__column">
                      {{ tr.NoDep24HrsPush }}
                    </div>
                    <div class="subtable__column">
                      N/A
                    </div>
                    <div class="subtable__column">
                      {{ tr.DepsAfter24HrsPush }}
                    </div>
                  </div>
                </div>
              </vs-td>
              <vs-td>
                <div class="subtable">
                  <div class="subtable__row">
                    <div class="subtable__column">
                      {{ tr.NoDep48HrsPush }}
                    </div>
                    <div class="subtable__column">
                      N/A
                    </div>
                    <div class="subtable__column">
                      {{ tr.DepsAfter48HrsPush }}
                    </div>
                  </div>
                </div>
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
    const fromDate = this.$moment()
      .subtract(10, 'days')
      .format('YYYY-MM-DD')
    const toDate = this.$moment().format('YYYY-MM-DD')

    return {
      applications,
      currentPage: 1,
      max: 1,
      selectedApplication: '',
      fetchingApplicationStatistic: false,
      reloadApplicationStatistic: false,
      table: [],
      dateFilters: {
        fromDate,
        toDate
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

.subtitle {
  display: flex;
  flex-direction: column;

  &__title {
    text-align: center;
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.subtitle,
.subtable {
  width: 120px;

  &__row {
    display: flex;
    justify-content: space-between;
    flex: 1 1 1;
  }

  &__column {
    margin-right: 5px;
    margin-left: 5px;
    text-align: center;
    flex: 1;
  }
}

.subtitle-short {
  text-align: center;
  margin: 0 auto;
}
.description-short {
  text-align: center;
  margin: 0 auto;
}
</style>
