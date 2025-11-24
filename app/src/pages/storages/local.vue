<template>

  <div class="pb-5">
    <h2>Local</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Uploading a file to the local machine where dumper is running
    </v-alert>
  </div>

  <div class="pb-5">
    <h2>Config keys</h2>
    <Chip :items="typeKey"/>
    <List :items="configKeys"/>
  </div>

  <div class="pb-5">
    <YamlViewer :configObject="yamlConfig"/>

  </div>

</template>


<script>
export default {
  data() {
    return {
      typeKey: ['type: local'],
      snackbar: false,
      configKeys: [
        {
          key: "type",
          value: "Type storage",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "dir",
          value: "Using creating a backup with docker",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        local: {
          dir: './local_directory',
        }
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'global',
        value: {
          storages: {
            ...this.configBase,
          }
        }
      },
    ]
  },
}
</script>
