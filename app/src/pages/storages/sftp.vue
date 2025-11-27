<template>

  <div class="pb-5">
    <h2>SFTP</h2>
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
      typeKey: ['type: sftp'],
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
          key: "key",
          value: "Path to key auth storage server",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "passphrase",
          value: "Passphrase to key auth storage server",
          type: "string",
          required: false,
          info: {text: 'set up if key has passphrase', link: ''}
        },
      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        sftp: {
          type: "sftp",
          dir: './local_directory',
          host: '172.168.139.109',
          port: 22,
          username: 'sftpuser',
          key: '/root/.ssh/id_rsa.pub',
          passphrase: '123456'
        }
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'global',
        value: {
          settings: {
            storages: [
              'sftp'
            ]
          },
          storages: {
            ...this.configBase,
          }
        }
      },
      {
        title: 'Database',
        value: {
          storages: {
            ...this.configBase,
          },
          databases: {
            my_db: {
              title: "My DB MySQL",
              name: "mydb",
              user: "myuser",
              password: "mypassword",
              port: 3306,
              driver: 'mysql',
              server: "srv-mysql",
              format: "sql",
              storages: ["sftp"],
            }
          },
        }
      },
    ]
  },
}
</script>
