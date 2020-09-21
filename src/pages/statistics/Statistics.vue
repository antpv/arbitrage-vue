<template>
  <div>
    <!-- SELECT APPLICATION -->
    <vs-row>
      <vs-col w="12">
        <vs-select
          placeholder="Выберите предложение"
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
                30м нет реги
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
                Регистрации
              </vs-th>
              <vs-th>
                24ч нет депа
              </vs-th>
              <vs-th>
                Регистрации
              </vs-th>
              <vs-th>
                48ч нет депа
              </vs-th>
              <vs-th>
                Регистрации
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in table" :data="tr">
              <vs-td>
                {{ tr.name }}
              </vs-td>
              <vs-td>
                {{ tr.email }}
              </vs-td>
              <vs-td>
                {{ tr.id }}
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
export default {
  name: 'Statistics',

  metaInfo() {
    return {
      title: 'Статистика'
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
      table: []
    }
  },

  computed: {
    tableIsFetched() {
      return this.selectedApplication && this.fetchingApplicationStatistic === false
    }
  }
}
</script>
