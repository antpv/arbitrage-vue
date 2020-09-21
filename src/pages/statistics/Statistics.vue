<template>
  <div>
    <div class="left">
      <vs-select placeholder="Select" v-model="value">
        <vs-option label="Vuesax" value="1">
          Vuesax
        </vs-option>
      </vs-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',

  metaInfo() {
    return {
      title: 'Статистика'
    }
  },

  data() {
    return {
      value: ''
    }
  }
}
</script>
