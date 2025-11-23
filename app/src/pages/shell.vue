<template>

  <div class="pb-5">
    <h2>Shell script</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Configuration shell script. This shell script configuration can be used in several locations.
      Priority in the global -> server -> database parameters.
      If the global setting is set and you do not need to use script execution
      for one of the databases or the server, you need to set
      <Chip :items="['shell.enabled = false']"/>
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
      typeKey: ['shell'],
      snackbar: false,
      configKeys: [
        {
          key: "enabled",
          value: "Using run shell script befor and after create dump",
          type: "boolean",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "after",
          value: "Run shell script after create dump",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "before",
          value: "Run shell script before create dump",
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
        shell: {
          enable: true,
          after: 'echo "run script before create dump',
          before: 'echo "run script after create dump',
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
            ...this.configBase,
          }
        }
      },
      {
        title: 'server',
        value: {
          servers: {
            srv_one: {
              title: "Server #1",
              name: "server_one",
              host: "10.234.23.45",
              port: 22,
              user: "user_server",
              key: '/root/.ssh/id_rsa.pub',
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'database',
        value: {
          databases: {
            db_one: {
              title: "My DB PSQL #1",
              name: "mydb",
              user: "myuser",
              password: "mypassword",
              port: 5432,
              driver: 'psql',
              server: "srv-psql",
              format: "plain",
              storages: ["sftp"],
              remove_dump: true,
              ...this.configBase,
            }
          }
        }
      },
    ]
  },
}
</script>
