<template>
  <div class="login-container">
    <div class="login-container__row">
      <vs-input v-model="username" placeholder="Пользователь" required />
    </div>

    <div class="login-container__row">
      <vs-input v-model="password" type="password" placeholder="Пароль" required />
    </div>

    <div class="login-container__row">
      <vs-button @click="handleLogin" :loading="request">
        Авторизация
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  metaInfo() {
    return {
      title: 'Авторизация'
    }
  },

  data() {
    return {
      username: 'test',
      password: 'test',
      request: false
    }
  },

  computed: {
    isEmpty() {
      return this.username.trim() === '' && this.password.trim() === ''
    }
  },

  methods: {
    handleLogin() {
      if (this.isEmpty) return

      clearTimeout(this.timerId)

      this.request = true

      this.timerId = setTimeout(() => {
        if (this.username === 'test' && this.password === 'test') {
          this.$store.commit('auth/setAuth', true)

          this.$router.push('/statistics')
        } else {
          this.$vs.notification({
            color: 'danger',
            title: 'Ошибка',
            text: 'Введите корректные данные'
          })
        }

        this.request = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: calc(100vh - 89px);
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__row {
    width: 200px;
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
