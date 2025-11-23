<template>

  <div class="pb-5">
    <h2>Configuration</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      <p>Dumper use config file in different places</p>
      <p>You must use YAML format.</p>
    </v-alert>
  </div>

  <div class="pb-5">
    <YamlViewer :configObject="yamlConfig" title="Configuration file example"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      yamlConfig: [],
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'Default',
        value: {
          "settings": {
            "db_port": "5432",
            "driver": "psql",
            "ssh": {
              "private_key": "path_your_key",
              "passphrase": "your_passphrase",
              "is_passphrase": true
            },
            "dir_remote": "/var/www/dump/",
            "template": "{%srv%}_{%db%}_{%datetime%}",
            "archive": true,
            "location": "server",
            "format": "plain",
            "dir_dump": "./dumps",
            "dir_archived": "./archived",
            "remove_dump": true,
            "parallel_download": 1,
            "storages": [
              "local"
            ],
            "encrypt": {
              "type": "aes",
              "password": "123456"
            },
            "docker": {
              "command": "docker compose --file /var/www/docker-compose.yaml exec -T postgres"
            },
            "shell": {
              "before": "echo \"run script before create dump (settings)\"",
              "after": "echo \"run script after created dump created dump (settings)\""
            }
          },
          "storages": {
            "local": {
              "dir": "./dumps"
            },
            "ftp": {
              "dir": "./uploads/dumps",
              "host": "116.34.17.94",
              "port": 21,
              "username": "ftpuser",
              "password": "123456"
            },
            "sftp": {
              "dir": "./dumps",
              "host": "56.7.127.64",
              "port": 22,
              "username": "sftpuser",
              "private_key": "/Users/sftpuser/.ssh/id_rsa",
              "passphrase": "123456"
            },
            "azure": {
              "name": "name",
              "shared_key": "shared_key",
              "container": "data/dumps",
              "endpoint": "https://<name_endpoint>.blob.core.windows.net",
              "auth_type": "SharedKey"
            }
          },
          "servers": {
            "first-server": {
              "name": "test server",
              "host": "10.234.23.45",
              "port": "22",
              "user": "user",
              "password": "password",
              "shell": {
                "enabled": true,
                "before": "echo \"run script before create dump (server)\"",
                "after": "echo \"run script after created dump created dump (server)\""
              }
            },
            "second-server": {
              "name": "mongo",
              "host": "172.0.18.54",
              "user": "root",
              "shell": {
                "enabled": false
              }
            },
            "remote-config-server": {
              "name": "mongo",
              "host": "43.4.58.64",
              "user": "user",
              "port": 22,
              "conf_path": "/var/www/conf.yaml"
            }
          },
          "databases": {
            "demo": {
              "name": "db_name_demo",
              "user": "demo_user",
              "password": "password",
              "server": "first-server",
              "port": "5432",
              "driver": "psql",
              "format": "dump",
              "storages": [
                "local",
                "sftp"
              ],
              "docker": {
                "command": "docker compose --file /var/www/docker-compose.yaml exec -T postgres"
              }
            },

            "mysql_db": {
              "name": "mysql_db_dumper",
              "user": "user",
              "password": "password",
              "port": 3306,
              "driver": "mysql",
              "format": "sql",
              "server": "first-server",
              "remove_dump": false,
              "docker": {
                "enabled": false
              },
              "shell": {
                "enabled": true,
                "before": "echo \"run script before create dump (database)\"",
                "after": "echo \"run script after created dump (database)\""
              }
            },

            "mongo": {
              "name": "mongo_db_name",
              "user": "root",
              "password": "mongo_password",
              "port": 27017,
              "driver": "mongo",
              "format": "bson",
              "server": "second-server",
              "storages": [
                "local",
                "ftp"
              ],
              "options": {
                "auth_source": "admin",
                "ssl": true
              },
              "remove_dump": false,
              "docker": {
                "command": "docker compose --file /var/www/docker-compose.yaml exec -T mongodb"
              },
              "shell": {
                "enabled": false
              },
              "encrypt": {
                "type": "aes",
                "password": "123456"
              }
            },

            "maria_db": {
              "name": "maria_db_dumper",
              "user": "user",
              "password": "password",
              "port": 3306,
              "driver": "mysql",
              "format": "sql",
              "server": "first-server",
              "encrypt": {
                "enabled": false
              },
              "shell": {
                "enabled": true,
                "before": "echo \"run script before create dump (database)\"",
                "after": "echo \"run script after created dump (database)\""
              }
            },

            "redis_db": {
              "name": "redis_db_dumper",
              "user": "user",
              "password": "password",
              "port": 6379,
              "driver": "redis",
              "format": "rdb",
              "server": "first-server",
              "storages": [
                "sftp"
              ],
              "options": {
                "mode": "sync"
              },
              "encrypt": {
                "enabled": false
              },
              "shell": {
                "enabled": false
              },
              "docker": {
                "command": "docker compose --file /var/www/docker-compose.yaml exec -T redis"
              }
            }
          }
        }
      }
    ]
  }
}
</script>
