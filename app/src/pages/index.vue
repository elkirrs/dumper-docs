<template>

  <div class="pb-5">
    <h2>Dumper</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Dumper — This is a CLI utility for creating backups databases of various types with
      flexible connection and storage
    </v-alert>
  </div>

  <div class="pb-5">
    <v-img
      :width="700"
      aspect-ratio="16/9"
      cover
      src="/dumper.gif"
    ></v-img>
  </div>


  <div class="pb-5">
    <h2>Installation</h2>

    <span>You can install Dumper using the installation script or download archive: </span>
    <span>
        <a :href="'https://github.com/elkirrs/dumper/releases/tag/' + version">Dumper</a>
      </span>
    <v-alert
      border="start"
      color="dark"
    >
      $ curl -sSL https://elkirrs.github.io/dumper/install.sh | sh
    </v-alert>
  </div>

  <div class="pb-5">
    <RestoreDatabase :items="launch" title="Quick start"/>
  </div>

  <div class="pb-5">
    <h2>Dumper flags</h2>
    <List :items="flags"/>
  </div>

  <div class="pb-5">
    <h2>Opportunities</h2>
    <List :items="features"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      version: "",
      loading: false,
      launch: [
        {
          title: 'Dumper start with a choice of database from config file (Manual select database)',
          value: '$ ./dumper --config ./cfg.yaml'
        },
        {
          title: 'Dumper start with a choice database from flag --db',
          value: '$ ./dumper --db my_db1, my_db2'
        },
        {
          title: 'Dumper start with a choice all database from flag --all',
          value: '$ ./dumper --all'
        },
        {
          title: 'Dumper start with a choice databases with crontab',
          value: '0 3 * * * root /usr/local/bin/dumper --config /opt/dumper/config.yaml --all'
        },
      ],

      flags: [
        {
          key: '--config',
          value: 'Path to config file',
          info: {text: 'Example: --config ./cfg.yaml', link: ''},
        },
        {
          key: '--db',
          value: 'Database list for dump',
          info: {text: 'Example: --db my_db1, my_db2', link: ''},
        },
        {
          key: '--all',
          value: 'Run backup all databases from config file',
          info: {text: 'Example: --all', link: ''},
        },
        {
          key: '--file-log',
          value: 'File name log file (if settings.logging == true)',
          info: {text: 'Example: --file-log dumper.log', link: ''},
        },
        {
          key: '--crypt',
          value: 'Crypt config file or database',
          info: {text: 'Example: --crypt config, Type: "config", "backup"', link: ''},
        },
        {
          key: '--input',
          value: 'Path to encrypt file',
          info: {text: 'Example: --input /var/www/dumps/dump.sql.gz.enc', link: ''},
        },
        {
          key: '--mode',
          value: 'Mode crypt',
          info: {text: 'Example: --mode decrypt, Type: "encrypt", "decrypt", "recovery"', link: ''},
        },
        {
          key: '--password',
          value: 'Password for crypt (optional)',
          info: {text: 'Example: --password 123456', link: ''},
        },
        {
          key: '--recovery',
          value: 'Recovery token for recovery',
          info: {text: 'Example: --recovery 4j3k4lc7na09s...', link: ''},
        },
      ],

      features: [
        {value: 'Multiple database systems can be managed.'},
        {value: 'Support PostgreSQL, MySQL, MongoDB and etc.'},
        {value: 'Work with SSH-Keys (include passphrase).'},
        {value: 'Custom dump name templates.'},
        {value: 'Encrypting and Decrypting backup and config file'},
        {value: 'Different storages'},
        {value: 'Backup from docker'},
        {value: 'Shell script after and before backup'},
      ],
    }
  },
  async mounted() {
    try {
      const response = await fetch(
        'https://api.github.com/repos/elkirrs/dumper/releases/latest'
      )
      const data = await response.json()

      this.version = data.tag_name
    } catch (e) {
      console.error('Error loading version:', e)
    } finally {
      this.loading = false
    }

    try {
      this.loadingStarts = false
      const response = await fetch(
        'https://api.github.com/repos/elkirrs/dumper'
      )
      const data = await response.json()
      this.stars = data.stargazers_count
    } catch (e) {
      console.error('Error loading stars:', e)
    } finally {
      this.loadingStarts = false
    }
  }
}

</script>
