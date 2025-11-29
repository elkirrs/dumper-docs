<template>
  <h2>{{ title }}</h2>

  <div v-for="item in items" class="pb-8">
    <p>
      <template v-for="(part, index) in tokenize(item.title)" :key="index">
        <Chip v-if="part.type === 'chip'" :items="[part.text]" />
        <span v-else>{{ part.text }}</span>
      </template>
    </p>
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
  methods: {
    tokenize(value) {
      if (!value) return [];

      const result = [];
      const regex = /%([^%]+)%/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        const textBefore = value.slice(lastIndex, match.index);
        if (textBefore) {
          result.push({ type: "text", text: textBefore });
        }

        result.push({ type: "chip", text: match[1] });
        lastIndex = regex.lastIndex;
      }

      const textAfter = value.slice(lastIndex);
      if (textAfter) {
        result.push({ type: "text", text: textAfter });
      }

      return result;
    }
  }

}
</script>
