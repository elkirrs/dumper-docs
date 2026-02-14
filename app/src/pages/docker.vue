<template>

  <div class="pb-5">
    <h2>Docker</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Configuration docker command. This docker configuration can be used in several locations.
      Priority in the global -> server -> database parameters.
      If the global setting is set and you do not need to use script execution
      for one of the databases or the server, you need to set
      <Chip :items="['docker.enabled = false']"/>
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
      typeKey: ['docker'],
      snackbar: false,
      configKeys: [
        {
          key: "enabled",
          value: "Using creating a backup with docker",
          type: "boolean",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "command",
          value: "Command for interactive connect docker container ",
          type: "string",
          required: false,
          info: {text: '', link: ''},
          sub: [
            {key: '{%cmd%}', value: "A variable in the docker command", type: "string", required: false, info: {
              text: 'Example: docker exec --user db2inst1 db2 bash -c "source /database/config/db2inst1/sqllib/db2profile && {%cmd%}"', link: ''}
            },
          ]
        },
      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        docker: {
          enable: true,
          command: "docker compose --file /var/www/docker-compose.yaml exec -T postgres",
        }
      }
    },
    configCustom() {
      return {
        docker: {
          enable: true,
          command: 'docker exec --user db2inst1 db2 bash -c "source /database/config/db2inst1/sqllib/db2profile && {%cmd%}"',
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
      {
        title: 'with env',
        value: {
          databases: {
            db_two: {
              title: "My DB IBM Db2 #1",
              name: "mydb",
              user: "myuser",
              password: "mypassword",
              port: 50000,
              driver: 'db2',
              server: "srv-db2",
              format: "0.db2",
              storages: ["sftp"],
              remove_dump: true,
              ...this.configCustom,
            }
          }
        }
      },
    ]
  },
}
</script>
