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
      driver: "elastic",
      database: "Elastic Search",
      utility: ['curl'],
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
          value: "Database name (repository name)",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "user",
          value: "Database user's name (for auth)",
          type: "string",
          required: false,
          info: {text: 'required if set password', link: ''}
        },
        {
          key: "password",
          value: "Database user's password (for auth)",
          type: "string",
          required: false,
          info: {text: 'required if set user', link: ''}
        },
        {
          key: "token",
          value: "Database token (for auth)",
          type: "string",
          required: false,
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
          info: {text: 'Format list: "tar"', link: ''}
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
            {key: 'ca_crt_path', value: "Path to file a CA that elasticsearch trusts", type: "string", required: false},
            {key: 'crt_path', value: "Path to file client certificate", type: "string", required: false},
            {key: 'key_path', value: "Path to file private key", type: "string", required: false},
            {key: 'key_pass', value: "Password for key proivate", type: "string", required: false},
            {key: 'snap_path', value: "Path to snapshot dir", type: "string", required: false, info: {text: "Default set from dir_remote"}},
            {key: 'indices', value: "Create the dump include only indexes from this list", type: "array", required: false},
            {
              key: 'ignore_unavailable',
              value: "Allows you to take a snapshot, even if some indexes are missing or unavailable.", 
              type: "bool", 
              required: false,
              info: {text: "Default value: false"}
            },
            {
              key: 'include_global_state', 
              value: "Determines whether to include the global cluster state in the snapshot", 
              type: "bool", 
              required: false,
              info: {text: "Default value: false"}
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
          title: 'Use this command to restore database',
          value: '$ curl -X POST "http://localhost:9200/_snapshot/my-repository/snap_2/_restore"'
        },
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "Elastic Search DB",
        name: "testks",
        driver: this.driver,
        server: "srv-elasticsearch",
        format: "tar",
        storages: ["sftp", 'local'],
        remove_dump: true,
        dir_remote: "/opt/elasticsearch-backups",
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'Default',
        value: {
          databases: {
            elasticsearch_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'archive',
        value: {
          databases: {
            elasticsearch_db: {
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
            elasticsearch_db: {
              ...this.configBase,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T elasticsearch"
              }
            }
          }
        }
      },
      {
        title: 'shell',
        value: {
          databases: {
            elasticsearch_db: {
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
            elasticsearch_db: {
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
              elasticsearch_db: {
                ...
                  this.configBase,
                archive:
                  true,
                docker:
                  {
                    enabled: true,
                    command:
                      "docker compose --file /var/www/docker-compose.yaml exec -T elasticsearch"
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
              elasticsearch_db: {
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
