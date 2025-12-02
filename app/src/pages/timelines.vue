<template>
  <v-timeline align="start" small :density="$breakpoint.isMobile ? 'compact' : 'default'">
    <v-timeline-item
      v-for="(item, i) in timelines"
      :key="i"
      dot-color="cyan"
      size="small"
    >
      <template v-slot:opposite>
        <div
          class="pt-1 headline font-weight-bold text-cyan"
          v-text="item.date"
        ></div>
      </template>
      <div>
        <h3 class="mt-n1 headline font-weight-light mb-4 text-cyan">
          {{ item.title }}
        </h3>
        <div>
          <v-alert density="compact">
            <p v-for="value in item.values">
              {{ value }}
            </p>
          </v-alert>

        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  data: () => ({
    timelines: [
      {
        title: 'v1.9.4',
        values: [
          'Add support encrypt config flag --scope',
          'Add support amazon s3 storage'
        ],
        date: '2025-12-02',
      },
      {
        title: 'v1.9.3',
        values: [
          'Add support to several storages of the same type',
          'Add validation for storages, servers, databases',
          'Fix: issue with global storages',
        ],
        date: '2025-11-26',
      },
      {
        title: 'v1.9.2',
        values: [
          'Fix crash app with not set not required options (docker, encrypt)',
          'Add support azure storage'
        ],
        date: '2025-11-21',
      },
      {
        title: 'v1.9.1',
        values: [
          'Fix view message shell script if script is empty',
          'Fix re-entry of passphrase when reconnect'
        ],
        date: '2025-11-18',
      },
      {
        title: 'v1.9.0',
        values: [
          'Add support docker',
          'Fix issue create dump file in only main dir',
          'Add support shell script before and after backup'
        ],
        date: '2025-11-16',
      },
      {
        title: 'v1.8.3',
        values: [
          'Fix bug with create dump mongodb',
          'Add parameter archive in database section',
          'Update file name template'
        ],
        date: '2025-11-15',
      },
      {
        title: 'v1.8.2',
        values: [
          'Fix static path main db dump to global',
          'Feature added remote dir for dump'
        ],
        date: '2025-11-09',
      },
      {
        title: 'v1.8.1',
        values: [
          'Fix issue in crypt recovery mode',
          'Feature set password in command line'
        ],
        date: '2025-11-07',
      },
      {
        title: 'v1.8.0',
        values: [
          'Add support storage FTP, SFTP',
          'Multiple upload dump file by several servers'
        ],
        date: '2025-11-02',
      },
      {
        title: 'v1.7.0',
        values: [
          'Add encrypt config file'
        ],
        date: '2025-10-31',
      },
      {
        title: 'v1.6.0',
        values: [
          'Add support encrypt aes (openssl) for dump files',
          'Add Server and Database titles config'
        ],
        date: '2025-10-28',
      },
      {
        title: 'v1.5.0',
        values: [
          'Add support MSSQL, SQLite, Redis',
          'Fix bags'
        ],
        date: '2025-10-26',
      },
      {
        title: 'v1.4.0',
        values: [
          'Add support remote config',
          'Update prepare Database and Server',
          'Add view error with create dump',
          'Add mask user and password for log and error'
        ],
        date: '2025-10-18',
      },
      {
        title: 'v1.3.0',
        values: [
          'Add driver MariaDB',
          'Add config remove file dump after from server after created',
          'View file size before downloading'
        ],
        date: '2025-08-28',
      },
      {
        title: 'v1.2.0',
        values: [
          'Add driver MongoDB',
          'Add driver MySQL',
        ],
        date: '2025-08-21',
      },
      {
        title: 'v1.1.1',
        values: [
          'Add retry connect to server',
          'Add flag --all. Using this flag, you can dump all databases from the configuration.',
        ],
        date: '2025-08-20',
      },
      {
        title: 'v1.1.0',
        values: [
          'Add flag --db. It can be used to create backups of multiple databases in one run',
          'Fix the exit from the app',
        ],
        date: '2025-08-19',
      },
      {
        title: 'v1.0.0',
        values: [
          'Initial public release',
          'Creating a backup of the postgresql database with connection to the server and downloading',
          'Connecting to the server. Creating a database dump. Archiving the database and downloading from the server. Deleting a created one'
        ],
        date: '2025-08-17',
      }
    ],
  }),
}
</script>
