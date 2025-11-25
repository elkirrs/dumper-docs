<template>
  <v-list density="compact">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
    >
      <template #title>
        <div class="config-row" :style="{ marginLeft: indent + 'px' }">

          <v-icon
            size="6"
            class="mr-3"
          >
            mdi-circle
          </v-icon>

          <Chip v-if="item?.key" :items="[item.key]" />
          <span v-if="item?.key"> — </span>
          <span class="value">{{ item.value }}</span>
        </div>
      </template>

      <template #subtitle>
        <div :style="{ marginLeft: (indent + 15) + 'px' }">
          <span v-if="item?.type" class="value">&#8203; Type: <strong>{{ item.type }}</strong></span>
          <span v-if="item?.type" class="value">&#8203; Required: <strong>{{ item.required }}</strong></span>

          <span v-if="item.info?.text" class="value">&#8203; {{ item.info.text }}</span>

          <span v-if="item.info?.link" class="value">, more info:
            <a :href="item.info.link" class="info-link">link</a>
          </span>
        </div>
      </template>

      <List
        v-if="item.sub && item.sub.length"
        :items="item.sub"
        :level="level + 1"
      />
    </v-list-item>
  </v-list>
</template>

<script>
import Chip from "@/components/Chip.vue";

export default {
  name: "List",

  components: { Chip },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    level: {
      type: Number,
      default: 0,
    }
  },

  computed: {
    indent() {
      return this.level * 20;
    }
  }
};
</script>
