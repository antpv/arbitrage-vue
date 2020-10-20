<template>
  <div>
    <!-- TABLE -->
    <vs-row>
      <vs-col w="12">
        <vs-table striped>
          <template #thead>
            <vs-tr>
              <vs-th>
                Название
              </vs-th>
              <vs-th v-for="language in languages" :key="language.name">
                {{ language }}
              </vs-th>
              <vs-th>
                Комментарий
              </vs-th>
              <vs-th />
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in pushList" :data="tr">
              <vs-td>
                {{ tr.name }}
              </vs-td>
              <vs-td v-for="language in languages" :key="language">
                <div class="language-description">
                  <div class="language-description__title">
                    {{ getLanguageProp(tr, language, 'title') }}
                  </div>
                  <div class="language-description__description">
                    {{ getLanguageProp(tr, language, 'description') }}
                  </div>
                </div>
              </vs-td>
              <vs-td>
                {{ tr.comment }}
              </vs-td>
              <vs-td>
                <div class="flex-end">
                  <vs-button flat size="small" @click="openEditModal(tr)">
                    Редактировать
                  </vs-button>
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

    <!-- CREATE APPLICATION -->
    <EditPush
      :visible="editModalVisible"
      :editedPush="editedPush"
      @close="closeEditModal"
      @success="() => {}"
    />
  </div>
</template>

<script>
import EditPush from './components/EditPush'
import onlyUnique from '@/utils/onlyUnique'
import makeFakeId from '@/utils/makeFakeId'

export default {
  name: 'PushList',

  metaInfo() {
    return {
      title: 'Приложения'
    }
  },

  components: {
    EditPush
  },

  data() {
    const pushList = [
      {
        name: 'dep_48h',
        comment: 'Через 10 минут после установки если не было регистрации',
        languages: [
          {
            languageName: 'DE',
            description:
              'Beenden Sie eine Registrierung und erhalten Sie einen Bonus von 1000 € für die erste Einzahlung und 125 Freispiele als Geschenk. 💷',
            title: 'Willkommen ❗️',
            id: makeFakeId()
          },
          {
            languageName: 'PL',
            description:
              'Zakończ rejestrację i otrzymaj bonus w wysokości 4000 zł przy pierwszym depozycie oraz 125 darmowych spinów w prezencie 💷',
            title: 'Witamy❗️',
            id: makeFakeId()
          }
        ]
      }
    ]
    const languages = pushList
      .map(push => {
        return push.languages.map(language => language.languageName)
      })
      .flat()
      .filter(onlyUnique)

    return {
      currentPage: 1,
      max: 1,
      pushList,
      languages,
      editModalVisible: false,
      editedPush: null
    }
  },

  methods: {
    openEditModal(push) {
      this.editedPush = push
      this.editModalVisible = true
    },

    closeEditModal() {
      this.editedPush = null
      this.editModalVisible = false
    },

    getLanguageProp(tr, targetLanguage, propName) {
      const languagePayload = tr.languages.find(
        language => language.languageName === targetLanguage
      )

      return languagePayload ? languagePayload[propName] : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.language-description {
  &__title {
    font-size: 0.8rem;
    font-weight: bold;
    --vs-color: var(--vs-primary);
    margin-bottom: 5px;
  }
}
</style>
