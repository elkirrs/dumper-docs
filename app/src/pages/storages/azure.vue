<template>

  <div class="pb-5">
    <h2>{{ this.provider }}</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Uploading a file to the {{ this.provider }} storage
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
      provider: "Azure blob",
      typeKey: ['type: azure'],
      snackbar: false,
      configKeys: [
        {
          key: "type",
          value: "Type storage",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "container",
          value: "The name of the container in Azure Blob Storage where the backup files will be saved.",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "endpoint",
          value: "The URL of the Azure Blob Storage.",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "auth_type",
          value: "The type of authorization that will be used to connect to Azure.",
          type: "string",
          required: true,
          info: {text: 'List: "SharedKey", "AzureAD"', link: ''}
        },
        {
          key: "name",
          value: "The name of your Storage Account in Azure.",
          type: "string",
          required: true,
          info: {text: 'Use only when auth_type is "SharedKey"', link: ''}
        },
        {
          key: "shared_key",
          value: "The primary or secondary access Key to the Storage Account.",
          type: "string",
          required: true,
          info: {text: 'Use only when auth_type is "SharedKey"', link: ''}
        },
        {
          key: "tenant_id",
          value: "The ID of your Azure Active Directory (Tenant).",
          type: "string",
          required: true,
          info: {text: 'Use only when auth_type is "AzureAD"', link: ''}
        },
        {
          key: "client_id",
          value: "The ID of the registered application (Application ID) that connects to Storage.",
          type: "string",
          required: true,
          info: {text: 'Use only when auth_type is "AzureAD"', link: ''}
        },
        {
          key: "client_secret",
          value: "It is used to obtain an access token, which is then used to work with Blob Storage.",
          type: "string",
          required: true,
          info: {text: 'Use only when auth_type is "AzureAD"', link: ''}
        },

      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        azure: {
          type: "azure",
          container: 'data/dumps',
          endpoint: 'https://mycompanydata.blob.core.windows.net',
          auth_type: 'SharedKey',
          name: 'azurename',
          shared_key: 'e9Q02Fkr8f9e3sVfk3==',
        }
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'default',
        value: {
          storages: {
            ...this.configBase,
          }
        }
      },
    ]
  },
}
</script>
