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
      driver: "psql",
      database: "Postgres",
      utility: ['pg_dump', 'pg_restore'],
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
          info: {text: 'Format list: "plain", "dump", "tar"', link: ''}
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
          info: {text: '(Not required if storage set up in global setting)', link: ''}
        },
        {
          key: "encrypt",
          value: "Encrypt database",
          type: "object",
          required: false,
          info: {text: '', link: '#/crypt/database'}
        },
        {key: "shell", value: "Run shell scrypt", type: "object", required: false, info: {text: '', link: '#/shell'}},
        {
          key: "docker",
          value: "Create dump in docker",
          type: "object",
          required: false,
          info: {text: '', link: '#/docker'}
        },
        {
          key: "options",
          value: "Additional options for the database",
          type: "object",
          required: false,
          info: {text: '', link: ''},
          sub: [
            {key: 'source', value: "Full path to dump util", type: "string", required: false},
          ],
        },
        {
          key: "dir_remote",
          value: "Dir remote for dumps",
          type: "string",
          required: false,
          info: {text: 'default value from global settings (if the default value is not set, then "./" is used.)', link: ''}
        },
      ],
      yamlConfig: [],
      restoreDatabase: [
        {title: 'Use this command to restore database:', value: '$ psql -U postgres -d my_db -f my_db.sql'},
        {title: 'If the dump has created with custom mode:', value: '$ pg_restore --clean --create -Fc -d postgres psql_db.dump'},
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "My DB PSQL",
        name: "mydb",
        user: "myuser",
        password: "mypassword",
        port: 5432,
        driver: this.driver,
        server: "srv-psql",
        format: "plain",
        storages: ["sftp"],
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
            psql_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'With archive',
        value: {
          databases: {
            psql_db: {
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
            psql_db: {
              ...this.configBase,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T postgres"
              }
            }
          }
        }
      },
      {
        title: 'With shell',
        value: {
          databases: {
            psql_db: {
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
            psql_db: {
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
            psql_db: {
              ...this.configBase,
              archive: true,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T postgres"
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
            psql_db: {
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
