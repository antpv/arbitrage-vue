<template>
  <vs-navbar color="primary" shadow text-white fixed>
    <template #left>
      <vs-navbar-item @click="$router.push('/statistics')" :active="$route.name === 'Statistics'">
        Статистика
      </vs-navbar-item>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
