<template>
  <vs-navbar color="primary" shadow text-white fixed>
    <template #left>
      <div class="logo-wrapper">
        <img src="../../../assets/images/logo-transparent.png" />
      </div>
    </template>
    <template #right>
      <vs-navbar-item to="/statistics" :active="$route.name === 'Statistics'">
        Статистика
      </vs-navbar-item>
      <vs-navbar-item to="/applications" :active="$route.name === 'Applications'">
        Приложения
      </vs-navbar-item>
      <vs-navbar-item to="/templates" :active="$route.name === 'Templates'">
        Пуши
      </vs-navbar-item>
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

<style lang="scss" scoped>
.logo-wrapper {
  height: 44px;
  display: flex;
  align-items: center;

  & > img {
    height: 36px;
  }
}
</style>
