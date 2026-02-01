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
        driver: "firebird",
        database: "Fireberd",
        utility: ['gbak'],
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
            info: {text: 'Format list: "fbk"', link: ''}
          },
          {
            key: "port",
            value: "Database connection port",
            type: "integer",
            required: true,
            info: {text: 'Default port 3050', link: ''}
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
              {key: 'skip_issue', value: "The backup won't fall due to minor errors.", type: "boolean", required: false},
              {key: 'fast_and_stable', value: "Faster and more stable", type: "boolean", required: false},
              {key: 'skip_garbage', value: "Does not pull garbage from transactions", type: "boolean", required: false},
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
            value: '$ gbak -c -v /backups/firebird_db.fbk /tmp/test_restore.fdb -user SYSDBA -password password'
          },
        
        ],
      }
    },
    computed: {
      configBase() {
        return {
          title: "Firebird",
          name: "firebird",
          user: "SYSDBA",
          password: "password",
          driver: this.driver,
          server: "srv-firebird",
          format: "fbk",
          storages: ["sftp", 'local', 's3'],
          remove_dump: true,
          dir_remote: "/backups",
        }
      }
    },
    mounted() {
      this.yamlConfig = [
        {
          title: 'Default',
          value: {
            databases: {
              firebird_db: {
                ...this.configBase,
              }
            }
          }
        },
        {
          title: 'archive',
          value: {
            databases: {
              firebird_db: {
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
              firebird_db: {
                ...this.configBase,
                options: {
                  path: "/var/lib/firebird/3.0/data/test100mb.fdb",
                  skip_issue: true,
                  fast_and_stable: true,
                  skip_garbage: true,
                }
              }
            }
          }
        },
        {
          title: 'docker',
          value: {
            databases: {
              firebird_db: {
                ...this.configBase,
                docker: {
                  enabled: true,
                  command: 'docker exec db2 bash -c "{%cmd%}"'
                }
              }
            }
          }
        },
        {
          title: 'shell',
          value: {
            databases: {
              firebird_db: {
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
              firebird_db: {
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
                firebird_db: {
                  ...
                    this.configBase,
                  archive:
                    true,
                  docker:
                    {
                      enabled: true,
                      command:
                        "docker compose --file /var/www/docker-compose.yaml exec -T firebird"
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
                firebird_db: {
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
  