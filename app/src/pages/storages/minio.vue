<template>

  <div class="pb-5">
    <h2>MinIO</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Uploading a file to the MinIO storage
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
      typeKey: ['type: minio'],
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
          key: "region",
          value: "The region where your MinIO bucket is located",
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
          value: "The name of your MinIO Bucket container where the files will be stored.",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "endpoint",
          value: "The address or IP of the connection to the MinIO.",
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
        minio_storage: {
          type: "minio",
          region: "us-east-1",
          access_key: "AKIAEXAMPLEACCESSKEY",
          secret_key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
          bucket: "my-dump-bucket",
          endpoint: "https://minio-server.net"
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
