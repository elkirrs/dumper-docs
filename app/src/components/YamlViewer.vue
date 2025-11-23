<template>
  <div class="d-flex align-center justify-space-between">
    <h2>{{ title }}</h2>
  </div>

  <div class="pt-5 pb-5 yaml-narrow">

    <!-- Показываем только если есть данные -->
    <v-card class="yaml-card pb-5" v-if="safeList.length">

      <!-- Tabs -->
      <v-tabs
        v-if="hasTabs"
        v-model="tab"
        density="compact"
        color="primary"
        grow
      >
        <v-tab
          v-for="item in safeList"
          :key="item.title"
          :value="item.title"
          :text="item.title"
        />
      </v-tabs>

      <!-- Tabs content -->
      <v-tabs-window v-if="hasTabs" v-model="tab">
        <v-tabs-window-item
          v-for="item in safeList"
          :key="item.title"
          :value="item.title"
        >
          <YamlBlock :item="item" @copy="showSnackbar"/>
        </v-tabs-window-item>
      </v-tabs-window>

      <!-- Single YAML -->
      <div v-else>
        <YamlBlock :item="safeList[0]" @copy="showSnackbar"/>
      </div>

    </v-card>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      location="top center"
      color="secondary"
    >
      YAML copied!
    </v-snackbar>
  </div>
</template>

<script>
import YamlBlock from "@/components/YamlBlock.vue";

export default {
  name: "YamlViewer",

  components: {YamlBlock},

  props: {
    configObject: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: "Example"
    }
  },

  data() {
    return {
      snackbar: false,
      tab: null,
    };
  },

  computed: {
    safeList() {
      return Array.isArray(this.configObject)
        ? this.configObject.filter(i => i && i.value)
        : [];
    },

    hasTabs() {
      return this.safeList.length > 1;
    }
  },

  mounted() {
    if (this.safeList.length) {
      this.tab = this.safeList[0].title;
    }
  },

  methods: {
    showSnackbar() {
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.yaml-card {
  background-color: #1e1e2f;
  color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.yaml-narrow {
  max-width: 100%;
}
</style>
