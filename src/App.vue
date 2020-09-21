<template>
  <div class="theme-container">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader/TheHeader'

export default {
  name: 'App',

  components: {
    TheHeader
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
