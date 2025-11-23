<template>
  <v-card flat class="pa-4 pl-16 yaml-card-item ">

    <!-- Кнопка копирования -->
    <v-btn
      icon
      density="comfortable"
      class="copy-btn"
      color="grey-lighten-1"
      @click="copy"
    >
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>

    <!-- YAML -->
    <pre class="yaml-content pt-5">{{ yamlText }}</pre>

  </v-card>
</template>

<script>
import yaml from "js-yaml";

export default {
  name: "YamlBlock",

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    yamlText() {
      if (!this.item || !this.item.value) return "";
      return yaml.dump(this.item.value, { indent: 2 });
    }
  },

  methods: {
    async copy() {
      await navigator.clipboard.writeText(this.yamlText);
      this.$emit("copy");
    }
  }
};
</script>

<style scoped>
.yaml-card-item {
  background-color: #1e1e2f;
  overflow-x: auto;
  color: #fff;
  font-family: "JetBrains Mono", monospace;
  border-radius: 0;
}

.yaml-content {
  margin: 0;
  font-size: 14px;
  white-space: pre;
  line-height: 1.5;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

</style>
