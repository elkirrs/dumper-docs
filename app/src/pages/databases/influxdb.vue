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
      driver: "influxdb",
      database: "Influx Data",
      utility: ['influx'],
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
          info: {text: 'For version 2.x', link: ''}
        },
        {
          key: "format",
          value: "Database dump format",
          type: "string",
          required: true,
          info: {text: 'Format list: "tar"', link: ''}
        },
        {
          key: "token",
          value: "Token auth to database",
          type: "string",
          required: true,
          info: {text: 'For version 2.x', link: ''}
        },
        {
          key: "port",
          value: "Database connection port",
          type: "integer",
          required: true,
          info: {text: 'For version 2.x', link: ''}
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
            {key: 'version', value: "Version Influx DB", type: "string", required: false, info: {text: "Support versions: 2.x, 3.x"}},
            {
              key: "org",
              value: "Organization name",
              type: "string",
              required: false,
              info: {text: 'For version 2.x', link: ''}
            },
            {
              key: "org_id",
              value: "Organization ID",
              type: "string",
              required: false,
              info: {text: 'For version 2.x', link: ''}
            },
            {
              key: "bucket",
              value: "Bucket name",
              type: "string",
              required: false,
              info: {text: 'For version 2.x', link: '',}
            },
            {
              key: "bucket_id",
              value: "Bucket ID",
              type: "string",
              required: false,
              info: {text: 'For version 2.x', link: '',}
            },
            {
              key: 'skip-verify',
              value: "Skip the TLS certificate verification",
              type: "boolean",
              required: false,
              info: {text: 'For version 2.x', link: ''}
            },
            {
              key: 'start',
              value: "Start time range",
              type: "string",
              required: false,
              info: {text: 'For version 2.x', link: ''}
            },
            {
              key: 'end',
              value: "End time range",
              type: "string",
              required: false,
              info: {text: 'For version 2.x', link: ''}
            },
            {
              key: 'filter',
              value: "Filtered data",
              type: "string",
              required: false,
              info: {text: 'For version 2.x'}
            },
            {
              key: 'data_dir',
              value: "Path to data Influx DB",
              type: "string",
              required: true,
              info: {text: 'For version 3.x'}
            },
            {
              key: 'node_id',
              value: "Name node influx DB",
              type: "string",
              required: true,
              info: {text: 'For version 3.x'}
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
          title: 'Use this command to restore database for version 2.x',
          value: '$ influx restore /backups/2020-01-20_12-00/'
        },
        {
          title: 'Use this command to restore database for version 3.x',
          value: '$ systemctl stop influxdb3  \\ \n'
           + ' && rm -rf ${DATA_DIR}/${NODE_ID}/* \\ \n'
           + ' && mkdir -p ${DATA_DIR}/${NODE_ID} \\ \n'
           + ' && cp ${BACKUP_DIR}/_catalog_checkpoint ${DATA_DIR}/${NODE_ID}/ \\ \n'
           + ' && cp -r ${BACKUP_DIR}/catalog ${DATA_DIR}/${NODE_ID}/ \\ \n'
           + ' && cp -r ${BACKUP_DIR}/wal ${DATA_DIR}/${NODE_ID}/ \\ \n'
           + ' && cp -r ${BACKUP_DIR}/dbs ${DATA_DIR}/${NODE_ID}/ \\ \n'
           + ' && cp -r ${BACKUP_DIR}/snapshots ${DATA_DIR}/${NODE_ID}/ \\ \n'
           + ' && chown -R influxdb:influxdb ${DATA_DIR}/${NODE_ID} \\ \n'
           + ' && systemctl start influxdb3'
        },
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "Influx DB",
        name: "influx",
        driver: this.driver,
        server: "srv-influx",
        format: "tar",
        token: "your_token",
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
            influx_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'archive',
        value: {
          databases: {
            influx_db: {
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
            influx_db: {
              ...this.configBase,
              options: {
                version: "3.x",
                data_dir: "/var/lib/influxdb/data",
                node_id: "node0",
              }
            }
          }
        }
      },
      {
        title: 'docker',
        value: {
          databases: {
            influx_db: {
              ...this.configBase,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T influxdb"
              }
            }
          }
        }
      },
      {
        title: 'shell',
        value: {
          databases: {
            influx_db: {
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
            influx_db: {
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
              influx_db: {
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
              influx_db: {
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
