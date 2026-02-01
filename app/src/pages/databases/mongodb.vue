<template>

  <div class="pb-5">
    <h2>{{ database }}</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      <p>
        Dumper uses
        <Chip :items="utility"/>
        utility to backup {{ database }} database.
      </p>
      <p>The first step is to install the utility to create a database dump for your env.</p>
      <p>The final backup file will always be archived.</p>
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
      driver: "mongo",
      database: "MongoDB",
      utility: ['mongodump'],
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
          info: {text: 'Format list: "bson", "archive"', link: ''}
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
          key: "options",
          value: "Additional options for the database",
          type: "object",
          required: false,
          info: {text: '', link: ''},
          sub: [
            {key: 'auth_source', value: "Auth source", type: "string", required: false},
            {key: 'ssl', value: "SSL/TLS", type: "boolean", required: false},
            {key: 'source', value: "Full path to dump util", type: "string", required: false},
            {
              key: 'inc_tables',
              value: "Create a table dump include only tables from this list.",
              type: "array",
              required: false
            },
            {
              key: 'exc_tables',
              value: "Create a table dump, excluding tables from this list",
              type: "array",
              required: false
            },
          ],
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
          key: "dir_remote",
          value: "Dir remote for dumps",
          type: "string",
          required: false,
          info: {
            text: 'default value from global settings (if the default value is not set, then "./" is used.)',
            link: ''
          }
        },
      ],
      yamlConfig: [],
      restoreDatabase: [
        {title: 'Use this command to restore database:', value: '$ mongorestore --db=my_db /backup/my_db'},
        {title: 'If the dump has created with archive mode:', value: '$ mongorestore --archive=backup.archive'},
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "My DB MongoDB",
        name: "mydb",
        user: "myuser",
        password: "mypassword",
        port: 3306,
        driver: this.driver,
        server: "srv-mongo-db",
        format: "bson",
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
            mongo_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'options',
        value: {
          databases: {
            mongo_db: {
              ...this.configBase,
              options: {
                auth_source: 'admin',
                ssl: true
              }
            }
          }
        }
      },
      {
        title: 'archive',
        value: {
          databases: {
            mongo_db: {
              ...this.configBase,
              archive: true
            }
          }
        }
      },
      {
        title: 'docker',
        value: {
          databases: {
            mongo_db: {
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
        title: 'shell',
        value: {
          databases: {
            mongo_db: {
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
        title: 'encrypt',
        value: {
          databases: {
            mongo_db: {
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
        title: 'include table',
        value: {
          databases: {
            mongo_db: {
              ...this.configBase,
              options: {
                inc_table: [
                  'table_1',
                  'table_2',
                ]
              }
            }
          }
        }
      },
      {
        title: 'exclude table',
        value: {
          databases: {
            mongo_db: {
              ...this.configBase,
              options: {
                exc_table: [
                  'table_1',
                  'table_2',
                ]
              }
            }
          }
        }
      },

      {
        title: 'All',
        value: {
          databases: {
            mongo_db: {
              ...this.configBase,
              archive: true,
              options: {
                auth_source: 'admin',
                ssl: true
              },
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
        title: 'disabled',
        value: {
          databases: {
            mongo_db: {
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
