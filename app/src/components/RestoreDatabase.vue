<template>
  <h2>{{ title }}</h2>

  <div v-for="item in items" class="pb-8">
    <p>{{ item.title }}</p>
    <v-alert
      border="start"
      color="dark"
    >
      {{ item.value }}
    </v-alert>
  </div>

</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: "Restore Database"
    }
  },
}
</script>
