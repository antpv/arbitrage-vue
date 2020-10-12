<template>
  <div>
    <!-- TOP PANEL -->
    <vs-row>
      <vs-col w="12">
        <div class="actions">
          <vs-button
            :loading="reloadTemplates"
            class="actions__action"
            @click="reload"
          >
            Обновить
          </vs-button>
        </div>
      </vs-col>
    </vs-row>

    <!-- TABLE -->
    <vs-row :style="{ marginTop: '15px' }">
      <vs-col w="12">
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                Date
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in table" :data="tr">
              <vs-td>
                {{ momentProvider(tr.CreatedAt).format('DD.MM.YYYY') }}
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
import TemplatesService from '@/services/TemplatesService'

export default {
  name: 'Templates',

  metaInfo() {
    return {
      title: 'Шаблоны'
    }
  },

  created() {
    this.fetchingTemplates = true

    TemplatesService.getTemplates()
      .then(results => {
        this.table = results
      })
      .finally(() => {
        this.fetchingTemplates= false
      })
  },

  data() {
    return {
      currentPage: 1,
      max: 1,
      fetchingTemplates: false,
      reloadTemplates: false,
      table: []
    }
  },

  methods: {
    momentProvider(date) {
      return this.$moment(date)
    },

    reload() {
      this.reloadTemplates = true

      TemplatesService.getTemplates()
        .then(results => {
          this.table = results
        })
        .finally(() => {
          this.reloadTemplates = false
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
