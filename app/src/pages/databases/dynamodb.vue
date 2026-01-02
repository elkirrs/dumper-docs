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
      driver: "dynamodb",
      database: "Amazon DynamoDB",
      utility: ['aws'],
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
          value: "Database name (DynamoDB table name)",
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
        {key: "driver", value: "Driver database", type: "string", required: true, info: {text: '', link: ''}},
        {
          key: "format",
          value: "Database dump format",
          type: "string",
          required: true,
          info: {text: 'Format list: "dump"', link: ''}
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
            {key: 'region', value: "AWS region", type: "string", required: false},
            {key: 'profile', value: "AWS profile name", type: "string", required: false},
            {key: 'endpoint', value: "Custom endpoint (for local DynamoDB)", type: "string", required: false},
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
          title: 'Use this command to restore database (need prepare dump file for right format).' +
            ' You can use run scrypt after dump for prepare file dump to right format',
          value: '$ aws dynamodb batch-write-item' +
            '  --request-items file:///root/dump/dynamo_Users_2026_01_02.json' +
            '  --endpoint-url http://localhost:8000'
        },
        {
          title: "Use this command to restore database (cloud)",
          value: "$ aws dynamodb restore-table-from-backup" +
            "  --target-table-name UsersRestored" +
            "  --backup-arn arn:aws:dynamodb:REGION:ACCOUNT_ID:table/Users/backup/xxxxxxxxxx"
        }
      ],
    }
  },
  computed: {
    configBase() {
      return {
        title: "My Neo4j DB",
        name: "neo4j",
        driver: this.driver,
        server: "srv-neo4j",
        format: "dump",
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
            neo4j_db: {
              ...this.configBase,
            }
          }
        }
      },
      {
        title: 'archive',
        value: {
          databases: {
            neo4j_db: {
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
            neo4j_db: {
              ...this.configBase,
              docker: {
                enabled: true,
                command: "docker compose --file /var/www/docker-compose.yaml exec -T neo4j"
              }
            }
          }
        }
      },
      {
        title: 'shell',
        value: {
          databases: {
            neo4j_db: {
              ...this.configBase,
              shell: {
                enabled: true,
                after: 'sudo systemctl start neo4j',
                before: 'sudo systemctl stop neo4j',
              }
            }
          }
        }
      },
      {
        title: 'encrypt',
        value: {
          databases: {
            neo4j_db: {
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
              neo4j_db: {
                ...
                  this.configBase,
                archive:
                  true,
                docker:
                  {
                    enabled: true,
                    command:
                      "docker compose --file /var/www/docker-compose.yaml exec -T neo4j"
                  }
                ,
                shell: {
                  enabled: true,
                  after:
                    'sudo systemctl start neo4j',
                  before:
                    'sudo systemctl stop neo4j',
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
              neo4j_db: {
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
