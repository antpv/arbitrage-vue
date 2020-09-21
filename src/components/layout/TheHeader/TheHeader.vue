<template>
  <vs-navbar color="primary" shadow text-white fixed>
    <template #left>
      <vs-navbar-item
        @click="$route.path !== '/statistics' && $router.push('/statistics')"
        :active="$route.name === 'Statistics'"
      >
        Статистика
      </vs-navbar-item>
      <vs-navbar-item
        @click="$route.path !== '/applications' && $router.push('/applications')"
        :active="$route.name === 'Applications'"
      >
        Приложения
      </vs-navbar-item>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
