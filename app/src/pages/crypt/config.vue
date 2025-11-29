<template>

  <div class="pb-5">
    <h2>Encrypt and decrypt config file</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      <p>Encrypting a configuration file with one version will not be decrypted by another version of the application.</p>
      <p>You can use the recovery token to decrypt it.</p>
    </v-alert>
  </div>

  <div class="pb-5">
    <RestoreDatabase :items="items" title="How it works"/>
  </div>

  <div class="pb-5">
    <RestoreDatabase :items="flagScope" title="Encrypt flag --scope"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Password encryption (outputs recovery token)',
          value: '$ ./dumper --crypt config --mode encrypt --input config.yaml',
        },
        {
          title: 'Launching the application (reading without password)',
          value: '$ ./dumper --config config.yaml',
        },
        {
          title: 'Decryption on the same device',
          value: '$ ./dumper --crypt config --mode decrypt --input config.yaml',
        },
        {
          title: 'Recovery on another device ',
          value: '$ ./dumper --crypt config --mode recovery --token 5fc529dd59ea4d... --input config.yaml',
        },
      ],
      flagScope: [
        {
          title: 'if you select the %--scope app% parameter, the configuration file is encrypted only for Dumper of the version that is used on other versions, this encrypted file will not work',
          value: '$ ./dumper --crypt config --mode encrypt --input config.yaml --scope app',
        },
        {
          title: 'if you select the %--scope device% parameter, the configuration file is encrypted only for the env where Dumper is running. The encrypted file will only work on this env. Dumper version can be any',
          value: '$ ./dumper --crypt config --mode encrypt --input config.yaml --scope device',
        },
        {
          title: 'if the %--scope% parameter is not used, the configuration file is encrypted only for the env where Dumper is running and also for the version. The encrypted file will only work on this env. The file will only work when running on the env where it was encrypted and only with the Dumper version.',
          value: '$ ./dumper --crypt config --mode encrypt --input config.yaml ',
        },
      ],
    }
  },
}
</script>
