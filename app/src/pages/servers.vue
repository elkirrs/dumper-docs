<template>

  <div class="pb-5">
    <h2>Servers</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Configuration servers
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
      typeKey: ['servers'],
      snackbar: false,
      configKeys: [
        {
          key: "title",
          value: "Human-readable database name",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "name",
          value: "Server name",
          type: "string",
          required: false,
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
          value: "Connection port",
          type: "integer",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "user",
          value: "Username for connection server",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "password",
          value: "Password for auth connection server",
          type: "string",
          required: false,
          info: {text: 'if not set key', link: ''}
        },
        {
          key: "key",
          value: "Key for auth connection server",
          type: "string",
          required: false,
          info: {text: 'If not set password. Required if not set global', link: ''}
        },
        {
          key: "conf_path",
          value: "Path to remote config",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "shell",
          value: "Run shell scrypt in server",
          type: "object",
          required: false,
          info: {text: 'This script will work if database script not set', link: '#/shell'}
        },
      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        title: "Server #1",
        name: "server_one",
        host: "10.234.23.45",
        port: 22,
        user: "user_server",
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'default',
        value: {
          servers: {
            server_one: {
              ...this.configBase,
              key: '/root/.ssh/id_rsa.pub'
            },
            server_two: {
              ...this.configBase,
              password: '123456'
            }
          }
        }
      },
      {
        title: 'remote cfg',
        value: {
          servers: {
            server_one: {
              ...this.configBase,
              key: '/root/.ssh/id_rsa.pub',
              conf_path: '/root/conf/rem.yaml',
            }
          }
        }
      },
      {
        title: 'shell',
        value: {
          servers: {
            server_one: {
              ...this.configBase,
              key: '/root/.ssh/id_rsa.pub',
              shell: {
                enabled: true,
                after: 'echo "run script before create dump',
                before: 'echo "run script after created dump',
              }
            }
          }
        }
      },
      {
        title: 'without shell',
        value: {
          servers: {
            server_one: {
              ...this.configBase,
              key: '/root/.ssh/id_rsa.pub',
              shell: {
                enabled: false,
              }
            }
          }
        }
      },
    ]
  },
}
</script>
