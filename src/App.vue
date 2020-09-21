<template>
  <div class="theme-container">
    <TheHeader v-if="isLoggedIn" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheHeader from './components/layout/TheHeader/TheHeader'

export default {
  name: 'App',

  components: {
    TheHeader
  },

  created() {
    if (this.$route.path === '/') {
      this.$router.push({ path: '/login' })
    }
  },

  computed: {
    ...mapState('auth', ['isLoggedIn'])
  }
}
</script>

<style scoped>
.theme-container {
  min-width: 959px;
  max-width: 1920px;
  margin: 0 auto;
  padding-top: 59px;
}
</style>
