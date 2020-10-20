<template>
  <div>
    <!-- TOP PANEL -->
    <vs-row>
      <vs-col w="12">
        <div class="actions">
          <!-- <vs-button :loading="templatesIsReloading" class="actions__action" @click="reload" flat>
            Обновить
          </vs-button> -->
          <vs-button @click="() => openFormModal()">
            Добавить
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
                Title
              </vs-th>
              <vs-th>
                Type
              </vs-th>
              <vs-th>
                SubType
              </vs-th>
              <vs-th>
                Message
              </vs-th>
              <vs-th>
                App
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
            <vs-tr :key="tr.ID" v-for="tr in templates" :data="tr">
              <vs-td>
                {{ tr.Title }}
              </vs-td>
              <vs-td>
                {{ tr.Type }}
              </vs-td>
              <vs-td>
                {{ tr.SubType }}
              </vs-td>
              <vs-td>
                {{ tr.Message }}
              </vs-td>
              <vs-td>
                {{ tr.App }}
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
            </vs-tr>
          </template>
          <template v-if="currentPage !== max" #footer>
            <vs-pagination v-model="currentPage" :length="$vs.getLength(templates, max)" />
          </template>
          <template #notFound>
            Нет записей
          </template>
        </vs-table>
      </vs-col>
    </vs-row>

    <!-- CREATE APPLICATION -->
    <MakeTemplate
      :visible="formModalVisible"
      :editedPayload="formModalPayload"
      :isEditMode="formModalPayload !== null"
      @close="closeFormModal"
      @success="payload => templates.push(payload)"
    />
  </div>
</template>

<script>
import MakeTemplate from './components/MakeTemplate'
import TemplatesService from '@/services/TemplatesService'

export default {
  name: 'Templates',

  metaInfo() {
    return {
      title: 'Шаблоны'
    }
  },

  components: {
    MakeTemplate
  },

  created() {
    this.fetchingTemplates = true

    TemplatesService.getTemplates()
      .then(results => {
        this.templates = results
      })
      .finally(() => {
        this.fetchingTemplates = false
      })
  },

  data() {
    return {
      currentPage: 1,
      max: 1,
      fetchingTemplates: false,
      templatesIsReloading: false,
      templates: [],
      formModalVisible: false,
      formModalPayload: null
    }
  },

  methods: {
    momentProvider(date) {
      return this.$moment(date)
    },

    reload() {
      this.templatesIsReloading = true

      TemplatesService.getTemplates()
        .then(results => {
          this.templates = results
        })
        .catch(() => {
          this.$vs.notification({
            color: 'danger',
            title: 'Ошибка',
            text: 'Не удалось получить шаблоны'
          })
        })
        .finally(() => {
          this.templatesIsReloading = false
        })
    },

    openFormModal(payload = null) {
      this.formModalPayload = Object.assign({}, payload)
      this.formModalVisible = true
    },

    closeFormModal() {
      this.formModalPayload = null
      this.formModalVisible = false
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
