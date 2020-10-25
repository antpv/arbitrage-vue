<template>
  <div class="full-size-space-between">
    <div class="full-size-space-between__row">
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
      <vs-row :style="{ marginTop: '15px' }">
        <vs-col w="12">
          <vs-table ref="table" striped>
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
                        Dep
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
                        Dep
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
                        Dep
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
                        Dep
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
                        Dep
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
                        Dep
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

    <div v-show="table.length" class="full-size-space-between__row">
      <div class="statistics" ref="statistics">
        <div class="statistics__column" v-for="index in 10" :key="index">
          <div class="statistics__content" v-if="(index > 3 && index < 7) || index > 7">
            <div class="subtable">
              <div class="subtable__row">
                <div class="subtable__column" v-for="index in 3" :key="index" />
              </div>
              <div class="label">
                <template v-if="index == 4">
                  10 min no reg
                </template>
                <template v-else-if="index == 5">
                  24 h no reg
                </template>
                <template v-else-if="index == 6">
                  48 h no reg
                </template>
                <template v-else-if="index == 8">
                  30 min no dep
                </template>
                <template v-else-if="index == 9">
                  24 h no dep
                </template>
                <template v-else-if="index == 10">
                  48 h no dep
                </template>
              </div>
            </div>
          </div>
          <div class="statistics__content" v-else />
        </div>
      </div>
    </div>
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

  created() {
    this.$store.dispatch('applications/getApplications').then(this.forceSelectRerender)

    window.addEventListener('resize', this.setTotalColumnsWidth)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setTotalColumnsWidth)
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
    },

    filteredTable() {
      this.setTotalData()

      this.$nextTick(() => {
        this.setTotalColumnsWidth()
      })
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
      selectKey: 0,
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
    },

    totalInstalls() {
      return this.calculateTotal('Installs')
    }
  },

  methods: {
    setTotalColumnsWidth() {
      const table = this.$refs.table.$el
      const statistics = this.$refs.statistics
      const originalThs = table.querySelectorAll('thead > tr > th')
      const cloneThs = statistics.querySelectorAll('.statistics__column')

      Array.prototype.forEach.call(originalThs, (th, index) => {
        const width = getComputedStyle(th).width
        const cloneColumn = cloneThs[index]

        cloneColumn.style.width = width
      })
    },

    setTotalData() {
      const statistics = this.$refs.statistics
      const columns = statistics.querySelectorAll('.statistics__column')

      Array.prototype.forEach.call(columns, (column, index) => {
        const content = column.querySelector('.statistics__content')

        if (index === 1) {
          // Installs
          content.innerHTML = this.calculateTotal('Installs')
        } else if (index === 2) {
          // NoReg10MinPush
          content.innerHTML = 'N/A'
        } else if (index === 3) {
          // 10 min no reg
          const [sent, open, dep] = column.querySelectorAll('.subtable__column')

          sent.innerHTML = this.calculateTotal('NoReg10MinPush')
          open.innerHTML = 'N/A'
          dep.innerHTML = this.calculateTotal('RegsAfter10MinPush')
        } else if (index === 4) {
          // 24 h no reg
          const [sent, open, dep] = column.querySelectorAll('.subtable__column')

          sent.innerHTML = this.calculateTotal('NoReg24HrsPush')
          open.innerHTML = 'N/A'
          dep.innerHTML = this.calculateTotal('RegsAfter24HrsPush')
        } else if (index === 5) {
          // 48 h no reg
          const [sent, open, dep] = column.querySelectorAll('.subtable__column')

          sent.innerHTML = this.calculateTotal('NoReg48HrsPush')
          open.innerHTML = 'N/A'
          dep.innerHTML = this.calculateTotal('RegsAfter48HrsPush')
        } else if (index === 6) {
          // Dep < 10 min
          content.innerHTML = 'N/A'
        } else if (index === 7) {
          // 30 min no dep
          const [sent, open, dep] = column.querySelectorAll('.subtable__column')

          sent.innerHTML = this.calculateTotal('NoDep30MinPush')
          open.innerHTML = 'N/A'
          dep.innerHTML = this.calculateTotal('DepsAfter30MinPush')
        } else if (index === 8) {
          // 24 h no dep
          const [sent, open, dep] = column.querySelectorAll('.subtable__column')

          sent.innerHTML = this.calculateTotal('NoDep24HrsPush')
          open.innerHTML = 'N/A'
          dep.innerHTML = this.calculateTotal('DepsAfter24HrsPush')
        } else if (index === 9) {
          // 48 h no dep
          const [sent, open, dep] = column.querySelectorAll('.subtable__column')

          sent.innerHTML = this.calculateTotal('NoDep48HrsPush')
          open.innerHTML = 'N/A'
          dep.innerHTML = this.calculateTotal('DepsAfter48HrsPush')
        }
      })
    },

    calculateTotal(propName) {
      return this.table.reduce((sum, value) => {
        return sum + value[propName]
      }, 0)
    },

    momentProvider(date) {
      return this.$moment(date)
    },

    forceSelectRerender() {
      this.selectKey += 1
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

.label {
  margin-top: 5px;
  text-align: center;
  color: #84b59f;
  padding-top: 5px;
}

.subtitle-short {
  text-align: center;
  margin: 0 auto;
}
.description-short {
  text-align: center;
  margin: 0 auto;
}

.full-size-space-between {
  height: calc(100vh - 89px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__row {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.statistics {
  background-color: transparent;
  margin-bottom: 15px;
  padding: 10px 0;
  border-top: 1px solid rgba(46, 82, 102, 0.15);
  color: rgb(46, 82, 102);
  font-size: 13.3px;
  display: flex;
  align-items: flex-start;

  &__column {
    display: inline-block;
  }

  &__content {
    display: inline-block;
    padding: 0 12px;
    overflow: hidden;
    text-align: center;
  }
}
</style>
