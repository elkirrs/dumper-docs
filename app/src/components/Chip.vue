<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<template>
  <span v-for="(item, i) in items" :key="i">
    <v-chip label>
      <strong>{{ item }}</strong>
    </v-chip>

    <span v-if="i < items.length - 1">, </span>
  </span>
</template>
