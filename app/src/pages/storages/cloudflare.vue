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
      provider: "Cloudflare R2",
      typeKey: ['type: r2'],
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
          value: "The region where your Cloudflare bucket is located",
          type: "string",
          required: false,
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
          value: "The name of your Cloudflare Bucket container where the files will be stored",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "account_id",
          value: "Cloudflare Account Id",
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
          type: "r2",
          dir: "dumps",
          access_key: "AKIAEXAMPLEACCESSKEY",
          secret_key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
          bucket: "dumper",
          account_id: "dumper-cli",
          endpoint: "https://dumper-cli.r2.cloudflarestorage.com"
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
