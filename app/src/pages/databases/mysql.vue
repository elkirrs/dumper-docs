<template>

  <div class="pb-5">
    <h2>{{ database }}</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Dumper uses
      <Chip :items="utility"/>
      utility to backup {{ database }} database
    </v-alert>
  </div>

  <div class="pb-5">
    <h2>Config keys</h2>
    <Chip :items='["driver: " + driver]'/>
    <List :items="configKeys"/>
  </div>

  <div class="pb-5">
    <YamlViewer :configObject="yamlConfig"/>
  </div>

  <div class="pb-5">
    <RestoreDatabase :items="restoreDatabase"/>
  </div>

</template>


<script>
import RestoreDatabase from "@/components/RestoreDatabase.vue";

export default {
  components: {RestoreDatabase},
  data() {
    return {
      driver: "mysql",
      database: "MySQL",
      utility: ['mysqldump'],
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
          value: "Database name (by default, the key name)",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {key: "user", value: "Database username", type: "string", required: true, info: {text: '', link: ''}},
        {
          key: "password",
          value: "Database user's password",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "server",
          value: "The link to the server from the servers section list",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {key: "port", value: "Database connection port", type: "integer", required: true, info: {text: '', link: ''}},
        {key: "driver", value: "Driver database", type: "string", required: true, info: {text: '', link: ''}},
        {
          key: "format",
          value: "Database dump format",
          type: "string",
          required: true,
          info: {text: 'Format list: "sql"', link: ''}
        },
        {
          key: "archive",
          value: "Archiving a backup file",
          type: "boolean",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "remove_dump",
          value: "Remove dump file after created (default true)",
          type: "boolean",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "storages",
          value: "Storage list when the dump need to upload",
          type: "array",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "encrypt",
          value: "Encrypt database",
          type: "object",
          required: false,
          info: {text: '', link: '/crypt/database'}
        },
        {key: "shell", value: "Run shell scrypt", type: "object", required: false, info: {text: '', link: '/shell'}},
        {
          key: "docker",
          value: "Create dump in docker",
          type: "object",
          required: false,
          info: {text: '', link: '/docker'}
        },
      ],
      yamlConfig: [],
      restoreDatabase: [
        {title: 'Use this command to restore database:', value: '$ mysql -u root -p my_database < backup.sql'},
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "My DB MySQL",
        name: "mydb",
        user: "myuser",
        password: "mypassword",
        port: 3306,
        driver: this.driver,
        server: "srv-mysql",
        format: "sql",
        storages: ["sftp", 'local'],
        remove_dump: true,
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'Default',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'With archive',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
              archive: true
            }
          }
        }
      },
      {
        title: 'With docker',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T mysql"
              }
            }
          }
        }
      },
      {
        title: 'With shell',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
              shell: {
                enabled: true,
                after: 'echo "run script before create dump',
                before: 'echo "run script after create dump',
              }
            }
          }
        }
      },
      {
        title: 'With encrypt',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
              encrypt: {
                enabled: true,
                type: 'aes',
                password: '123456',
              }
            }
          }
        }
      },
      {
        title: 'With All',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
              archive: true,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T mysql"
              },
              shell: {
                enabled: true,
                after: 'echo "run script before create dump',
                before: 'echo "run script after create dump',
              },
              encrypt: {
                enabled: true,
                type: 'aes',
                password: '123456',
              }
            }
          }
        }
      },
      {
        title: 'With disabled',
        value: {
          databases: {
            mysql_db: {
              ...this.configBase,
              archive: false,
              docker: {
                enabled: false,
              },
              shell: {
                enabled: false,
              },
              encrypt: {
                enabled: false,
              }
            }
          }
        }
      }
    ]
  },
}
</script>
