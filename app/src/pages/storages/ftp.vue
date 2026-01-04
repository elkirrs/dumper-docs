<template>

  <div class="pb-5">
    <h2>{{ this.provider }}</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Uploading a file to the remote storage server
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
      provider: "FTP",
      typeKey: ['type: ftp'],
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
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "host",
          value: "The IP address server or domain name",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "port",
          value: "Connection port to remote server",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "username",
          value: "Username for auth connection server",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "password",
          value: "Password for auth connection server",
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
        ftp: {
          type: "ftp",
          dir: './local_directory',
          host: '172.168.139.109',
          port: 21,
          username: 'ftpuser',
          password: '123456',
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
