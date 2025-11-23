<template>

  <div class="pb-5">
    <h2>Template</h2>
  </div>

  <div class="pb-5">
    <v-alert border="start" variant="text"  density="compact">
      Template name file dump
    </v-alert>
  </div>

  <div class="pb-5">
    <h2>Template env</h2>
    <List :items="template"/>
  </div>

  <div class="pb-5">
    <RestoreDatabase :items="defaults" title="Default"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      template: [
        {
          key: '{%srv%}',
          value: 'Server name',
        },
        {
          key: '{%db%}',
          value: 'Database name',
        },
        {
          key: '{%datetime%}',
          value: 'Date and time',
        },
        {
          key: '{%date%}',
          value: 'Date Y.m.d',
        },
        {
          key: '{%time%}',
          value: 'Time H-i-s',
        },
        {
          key: '{%ts%}',
          value: 'Time unix',
        },

      ],
      defaults: [
        {title: 'If template not set, this will use default template:', value: '"{%srv%}_{%db%}_{%date%}"'},
      ]
    }
  }
}

</script>
