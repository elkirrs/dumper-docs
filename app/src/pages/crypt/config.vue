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
      ]
    }
  },
}
</script>
