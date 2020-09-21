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
body {
  padding: 0;
  margin: 0 auto;
  background-color: #f4f7f8;
}

.theme-container {
  max-width: 1080px;
  margin: 0 auto;
  padding-top: 60px;
}
</style>
