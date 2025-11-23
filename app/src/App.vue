<template>
  <v-app :theme="theme">
    <!-- TOP BAR -->
    <v-app-bar
      app
      elevation="1"
    >
      <div class="pa-10">
        <div class="pa-8">
          <v-img
            :width="135"
            aspect-ratio="16/9"
            cover
            src="/dumper.svg"
          ></v-img>
        </div>
      </div>

      <v-spacer></v-spacer>

      <div class="pr-4">
        <v-btn
          variant="text"
          href="https://github.com/elkirrs/dumper/releases"
          rel="noopener"
        >
          Releases
        </v-btn>
      </div>

      <div class="pr-16">
        <a
          variant="plain"
          href="https://github.com/elkirrs/dumper"
          rel="noopener"
        >
          <v-avatar size="34" image="/github.svg"></v-avatar>
        </a>
      </div>

    </v-app-bar>

    <!-- SIDE MENU -->
    <v-navigation-drawer floating app expand-on-hover width="300" class="pl-16 pt-6">
      <v-list nav density="compact">
        <v-list-item title="Home" to="/"/>
      </v-list>

      <v-divider class="my-2"/>

      <v-list nav v-model:opened="open" density="compact">
        <!-- CONFIGURATION GROUP -->
        <v-list-group value="Configuration">
          <v-list-item title="Overview" to="/overview"/>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Configuration"
            />
          </template>

          <v-list-item title="Settings" to="/settings"/>

          <!-- STORAGES SUBGROUP -->
          <v-list-group value="Storages">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Storages"/>
            </template>

            <v-list-item
              v-for="([title, url], i) in storages"
              :key="i"
              :title="title"
              :to="url"
            />
          </v-list-group>
          <v-list-item title="Servers" to="/servers"/>

          <!-- DATABASES SUBGROUP -->
          <v-list-group value="Databases">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Databases"/>
            </template>

            <v-list-item
              v-for="([title, url], i) in databases"
              :key="i"
              :title="title"
              :to="url"
            />
          </v-list-group>

          <v-list-item title="Template" to="/template"/>
          
          <!-- CRYPT SUBGROUP -->
          <v-list-group value="Crypt">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Crypt"/>
            </template>

            <v-list-item
              v-for="([title, url], i) in crypt"
              :key="i"
              :title="title"
              :to="url"
            />
          </v-list-group>

          <v-list-item title="Shell" to="/shell"/>
          <v-list-item title="Docker" to="/docker"/>

        </v-list-group>
      </v-list>

      <v-divider class="my-2"/>

      <v-list nav density="compact">
        <v-list-item title="Timelines" to="/timelines"/>
      </v-list>

    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main>
      <v-container class="pt-8">
        <router-view/>
      </v-container>
    </v-main>

    <AppFooter/>

  </v-app>

</template>

<script setup>
import {ref, watch} from "vue"
import {useRoute} from "vue-router"

const open = ref([])
const theme = ref('light')

function toggleTheme() {
  // theme.value = theme.value === "light" ? "dark" : "light"
}

const storages = [
  ["Local", "/storages/local"],
  ["SFTP", "/storages/sftp"],
  ["FTP", "/storages/ftp"],
  ["Azure", "/storages/azure"],
]

const databases = [
  ["Postgres", "/databases/psql"],
  ["MySQL", "/databases/mysql"],
  ["MongoDB", "/databases/mongodb"],
  ["MariaDB", "/databases/mariadb"],
  ["Microsoft SQL", "/databases/mssql"],
  ["SQLite", "/databases/sqlite"],
  ["Redis", "/databases/redis"],
]

const crypt = [
  ['Config', '/crypt/config'],
  ['Database', '/crypt/database'],
]

const route = useRoute()

watch(
  () => route.path,
  (path) => {
    open.value = []

    // STORAGES
    if (storages.some(([title, url]) => url === path)) {
      open.value.push('Configuration', 'Storages')
    }

    // DATABASES
    else if (databases.some(([title, url]) => url === path)) {
      open.value.push('Configuration', 'Databases')
    }

    // CRYPT
    else if (crypt.some(([title, url]) => url === path)) {
      open.value.push('Configuration', 'Crypt')
    }

    // Overview / Settings / Shell / Docker
    else if (['/overview', '/settings', '/shell', '/docker'].includes(path)) {
      open.value.push('Configuration')
    }
  },
  {immediate: true}
)
</script>

<style>
h2 {
  margin: 0;
}
</style>
