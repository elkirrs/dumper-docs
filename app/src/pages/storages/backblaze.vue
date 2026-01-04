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
      provider: "Backblaze B2",
      typeKey: ['type: b2'],
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
          key: "region",
          value: "The region where your Backblaze bucket is located",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "access_key",
          value: "The public part of the Access Key User ID",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "secret_key",
          value: "This is the secret part of the key pair (Access Key Secret)",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "bucket",
          value: "The name of your Backblaze Bucket container where the files will be stored",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "endpoint",
          value: "Special endpoint to connect storage.",
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
        cloudflare_storage: {
          type: "b2",
          dir: "dumps",
          region: 'us-east-001',
          access_key: "AKIAEXAMPLEACCESSKEY",
          secret_key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
          bucket: "dumper",
          endpoint: "https://dumper.s3.us-east-001.backblazeb2.com"
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
