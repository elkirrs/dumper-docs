<template>

  <div class="pb-5">
    <h2>Settings</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Set global config for each database.
      If global settings are not needed for one of the databases, you need to disable them in this database
      or not set them in global settings.
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
      typeKey: ['settings'],
      snackbar: false,
      configKeys: [
        {
          key: "db_port",
          value: "Default database connection port",
          type: "integer",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "driver",
          value: "Default database driver",
          type: "string",
          required: false,
          info: {text: 'Type: "aes"', link: ''}
        },
        {
          key: "ssh",
          value: "Connect to ssh",
          type: "object",
          required: false,
          info: {text: '', link: ''},
          sub: [
            {
              key: "private_key",
              value: "The path to the private SSH key",
              type: "string",
              required: false,
              info: {text: '', link: ''},
            },
            {
              key: "passphrase",
              value: "Passphrase for the key",
              type: "string",
              required: false,
              info: {text: '', link: ''},
            },
            {
              key: "is_passphrase",
              value: "Whether to use passphrase from the config",
              type: "boolean",
              required: false,
              info: {text: '', link: ''},
            },
          ]
        },
        {
          key: "template",
          value: "Template for name dump",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "dir_remote",
          value: "Dir remote for dumps",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "archive",
          value: "Archive dump file",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "location",
          value: "Dump execution methode",
          type: "string",
          required: true,
          info: {text: 'Type: "server"', link: ''}
        },
        {
          key: "format",
          value: "Default dump format",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "dir_dump",
          value: "Directory for saving dumps",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "dir_archived",
          value: "Directory for moving old dumps",
          type: "string",
          required: false,
          info: {text: 'need {%srv%}_{%db%} in template', link: ''}
        },
        {
          key: "logging",
          value: "Create log file",
          type: "string",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "retry_connect",
          value: "Attempts reconnect to server (default 5)",
          type: "integer",
          required: false,
          info: {text: 'default: 5', link: ''}
        },
        {
          key: "remove_dump",
          value: "Remove dump file after created",
          type: "boolean",
          required: false,
          info: {text: 'default: true', link: ''}
        },
        {
          key: "storages",
          value: "Default list storages",
          type: "array",
          required: false,
          info: {text: 'default: "local"', link: ''}
        },
        {
          key: "parallel_download",
          value: "Parallel upload dump file for several storages",
          type: "integer",
          required: false,
          info: {text: 'default: 2', link: ''}
        },
        {
          key: "encrypt",
          value: "Default encryption for all databases",
          type: "object",
          required: false,
          info: {text: '', link: '/crypt/database'}
        },
        {
          key: "shell",
          value: "Default shell script for all databases",
          type: "object",
          required: false,
          info: {text: '', link: '/shell'}
        },
        {
          key: "docker",
          value: "Default docker command for all databases",
          type: "object",
          required: false,
          info: {text: '', link: '/docker'}
        },

      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        db_port: '5432',
        server_port: '22',
        driver: 'psql',
        ssh: {
          private_key: '/User/.ssh/id_rsa',
          passphrase: '123456',
          is_passphrase: true
        },
        password: '123456',
        dir_remote: '/root/dump/',
        template: '{%srv%}_{%db%}_{%datetime%}',
        archive: true,
        location: 'server',
        format: 'plain',
        dir_dump: './dumps',
        dir_archived: './old',
        logging: true,
        retry_connect: 5,
        remove_dump: true,
        parallel_download: 1,
      }
    }
  }
  ,
  mounted() {
    this.yamlConfig = [
      {
        title: 'settings',
        value: {
          settings: {
            ...this.configBase,
          }
        }
      },
      {
        title: 'with shell',
        value: {
          settings: {
            ...this.configBase,
            shell: {
              enable: true,
              after: 'echo "run script before create dump',
              before: 'echo "run script after create dump',
            }
          }
        }
      },
      {
        title: 'with encrypt',
        value: {
          settings: {
            ...this.configBase,
            encrypt: {
              enable: true,
              type: 'aes',
              password: '123456a',
            }
          }
        }
      },
      {
        title: 'with docker',
        value: {
          settings: {
            ...this.configBase,
            docker: {
              enable: true,
              command: "docker compose --file /var/www/docker-compose.yaml exec -T postgres",
            }
          }
        }
      },
      {
        title: 'with all',
        value: {
          settings: {
            ...this.configBase,
            shell: {
              enable: true,
              after: 'echo "run script before create dump',
              before: 'echo "run script after create dump',
            },
            encrypt: {
              enable: true,
              type: 'aes',
              password: '123456a',
            },
            docker: {
              enable: true,
              command: "docker compose --file /var/www/docker-compose.yaml exec -T postgres",
            }
          }
        }
      },
    ]
  }
}
</script>
