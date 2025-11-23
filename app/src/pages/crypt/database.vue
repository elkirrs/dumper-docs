<template>

  <div class="pb-5">
    <h2>Encrypt database</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      This encrypt configuration can be used in several locations.
      Priority in the global -> database parameters.
      If the global setting is set and you do not need to use script execution
      for one of the databases, you need to set
      <Chip :items="['encrypt.enabled = false']"/>
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

  <div class="pb-5">
    <RestoreDatabase :items="decryptDatabase" title="Crypt database"/>
  </div>

</template>


<script>
import RestoreDatabase from "@/components/RestoreDatabase.vue";

export default {
  components: {RestoreDatabase},
  data() {
    return {
      typeKey: ['encrypt'],
      snackbar: false,
      configKeys: [
        {
          key: "enabled",
          value: "Using creating a backup with docker",
          type: "boolean",
          required: false,
          info: {text: '', link: ''}
        },
        {
          key: "type",
          value: "Type encrypting",
          type: "string",
          required: true,
          info: {text: 'Type: "aes"', link: ''}
        },
        {
          key: "password",
          value: "Password for  encrypting",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
      ],
      yamlConfig: [],
      decryptDatabase: [
        {title: '', value: 'The file can be decrypted either via dumper or an encryption utility.'},
        {
          title: 'Decrypt command in dumper',
          value: '$ ./dumper --crypt backup --mode decrypt --input ./dump.sql.gz.enc'
        },
        {
          title: 'Decrypt command in openssl',
          value: '$ openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -in dump.sql.gz.enc -out dump.sql.gz -k 123456'
        },
        {
          title: 'Dump can encrypt after dumping in dumper. Use encrypt command in dumper',
          value: '$ openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -in dump.sql.gz.enc -out dump.sql.gz -k 123456'
        },
      ],
    }
  },
  computed: {
    configBase() {
      return {
        encrypt: {
          enable: true,
          type: 'aes',
          password: '123456a',
        }
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'global',
        value: {
          settings: {
            ...this.configBase,
          }
        }
      },
      {
        title: 'database',
        value: {
          databases: {
            db_one: {
              title: "My DB PSQL #1",
              name: "mydb",
              user: "myuser",
              password: "mypassword",
              port: 5432,
              driver: 'psql',
              server: "srv-psql",
              format: "plain",
              storages: ["sftp"],
              remove_dump: true,
              ...this.configBase,
            }
          }
        }
      },
    ]
  },
}
</script>
