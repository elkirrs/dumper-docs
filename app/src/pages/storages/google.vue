<template>

  <div class="pb-5">
    <h2>{{ this.provider }}</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Uploading a file to the {{ this.provider }} storage
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
      provider: "Google Cloud Storage",
      typeKey: ['type: gcs'],
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
          value: "Remote dir for save dump file",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "bucket",
          value: "The name of your Google Cloud Storage Bucket container where the files will be stored",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "credentials",
          value: "JSON text of the Google Cloud Storage credentials",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "credentials_file",
          value: "Path to the Google Cloud Storage credentials file",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        gcs_storage: {
          type: "gcs",
          dir: "dumps",
          bucket: "dumper",
          credentials: '{ text credentials }',
          credentials_file: "https://path_to_credentials_file",
        }
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'Default',
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
