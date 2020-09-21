<template>
  <vs-navbar color="primary" shadow text-white fixed>
    <template #left>
      <vs-navbar-item active>
        Статистика
      </vs-navbar-item>
    </template>
    <template #right>
      <vs-navbar-item>
        Выйти
      </vs-navbar-item>
    </template>
  </vs-navbar>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
