<template>
  <vs-navbar color="primary" shadow text-white fixed>
    <template #left>
      <vs-navbar-item to="/statistics" :active="$route.name === 'Statistics'">
        Статистика
      </vs-navbar-item>
      <vs-navbar-item to="/pushlist" :active="$route.name === 'PushList'">
        Пуши
      </vs-navbar-item>
      <vs-navbar-item to="/applications" :active="$route.name === 'Applications'">
        Приложения
      </vs-navbar-item>
      <vs-navbar-item to="/templates" :active="$route.name === 'Templates'">
        Шаблоны
      </vs-navbar-item>
    </template>
    <template #right>
      <vs-navbar-item @click="handleLogout">
        Выйти
      </vs-navbar-item>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  name: 'TheHeader',

  methods: {
    handleLogout() {
      this.$store.commit('auth/setAuth', false)
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
