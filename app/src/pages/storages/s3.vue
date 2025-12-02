<template>

  <div class="pb-5">
    <h2>Amazon S3</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text" density="compact">
      Uploading a file to the s3 storage
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
      typeKey: ['type: s3'],
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
          key: "region",
          value: "The AWS region where your S3 bucket is located",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "access_key",
          value: "The public part of the AWS Access Key User ID",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "secret_key",
          value: "This is the secret part of the AWS key pair (IAM Access Key Secret)",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
        {
          key: "bucket",
          value: "The name of your S3 Bucket container where the files will be stored.",
          type: "string",
          required: true,
          info: {text: '', link: ''}
        },
      ],
      yamlConfig: [],
    }
  },
  computed: {
    configBase() {
      return {
        aws_s3: {
          type: "s3",
          region: "us-east-1",
          access_key: "AKIAEXAMPLEACCESSKEY",
          secret_key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
          bucket: "my-dump-bucket",
        }
      }
    }
  },
  mounted() {
    this.yamlConfig = [
      {
        title: 'Default',
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
