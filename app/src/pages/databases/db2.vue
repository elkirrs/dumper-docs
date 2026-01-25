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
    <v-alert variant="text" type="warning" density="compact">
      <p>
        If you are using docker, you must have a backup path similar to the path to the server.</p>
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
      driver: "db2",
      database: "IBM Db2",
      utility: ['db2'],
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
          value: "Database name",
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
        {
          key: "driver",
          value: "Driver database",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "format",
          value: "Database dump format",
          type: "string",
          required: true,
          info: {text: 'Format list: "0.db2"', link: ''}
        },
        {
          key: "port",
          value: "Database connection port",
          type: "integer",
          required: true,
          info: {text: 'Default port 50000', link: ''}
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
            {key: 'backup_mode', value: "Backup mode", type: "string", required: false, info: {
              text: 'List option: "offline", "online". Defailt value: "offline"', link: ""}
            },
          ],
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
        {
          title: 'Use this command to restore database:',
          value: '$ db2 restore db appdb'
        },
      
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "IBM Db2",
        name: "ibmdb2",
        driver: this.driver,
        server: "srv-db2",
        format: "0.db2",
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
            ibm_db2_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'archive',
        value: {
          databases: {
            ibm_db2_db: {
              ...this.configBase,
              archive: true
            }
          }
        }
      },
      {
        title: 'options',
        value: {
          databases: {
            ibm_db2_db: {
              ...this.configBase,
              options: {
                backup_mode: "online",
              }
            }
          }
        }
      },
      {
        title: 'docker',
        value: {
          databases: {
            ibm_db2_db: {
              ...this.configBase,
              docker: {
                enabled: true,
                command: 'docker exec --user db2inst1 db2 bash -c "source /database/config/db2inst1/sqllib/db2profile && {%cmd%}"'
              }
            }
          }
        }
      },
      {
        title: 'shell',
        value: {
          databases: {
            ibm_db2_db: {
              ...this.configBase,
              shell: {
                enabled: true,
                after: 'command runs after create dump',
                before: 'command runs before create dump',
              }
            }
          }
        }
      },
      {
        title: 'encrypt',
        value: {
          databases: {
            ibm_db2_db: {
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
        title: 'All',
        value:
          {
            databases: {
              ibm_db2_db: {
                ...
                  this.configBase,
                archive:
                  true,
                docker:
                  {
                    enabled: true,
                    command:
                      "docker compose --file /var/www/docker-compose.yaml exec -T influxdb"
                  }
                ,
                shell: {
                  enabled: true,
                  after:
                    'command runs after create dump',
                  before:
                    'command runs before create dump',
                }
                ,
                encrypt: {
                  enabled: true,
                  type:
                    'aes',
                  password:
                    '123456',
                }
              }
            }
          }
      }
      ,
      {
        title: 'disabled',
        value:
          {
            databases: {
              ibm_db2_db: {
                ...
                  this.configBase,
                archive:
                  false,
                docker:
                  {
                    enabled: false,
                  }
                ,
                shell: {
                  enabled: false,
                }
                ,
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
