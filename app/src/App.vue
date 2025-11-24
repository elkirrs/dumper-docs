<template>
  <v-app :theme="theme">
    <!-- TOP BAR -->
    <v-app-bar app elevation="1">
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer" />

      <v-spacer v-if="isMobile"></v-spacer>

      <div :class="!isMobile ? 'pa-16' : 'pr-10 d-flex justify-center'">
        <v-img
          :width="isMobile ? 100 : 135"
          aspect-ratio="16/9"
          cover
          src="/dumper.svg"
        ></v-img>
      </div>

      <v-spacer></v-spacer>

      <div class="pr-4" v-if="!isMobile">
        <v-btn
          variant="text"
          href="https://github.com/elkirrs/dumper/releases"
          rel="noopener"
        >
          Releases
        </v-btn>
      </div>

      <div class="pr-16" v-if="!isMobile">
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
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      expand-on-hover
      width="300"
      :class="!isMobile ? 'pl-12 pt-6' : 'pt-4 pl-2 pr-2'"
      :temporary="isMobile"
    >
      <v-list nav density="compact">
        <v-list-item title="Home" to="/" />
      </v-list>

      <v-divider class="my-2" />

      <v-list nav v-model:opened="open" density="compact">
        <!-- CONFIGURATION GROUP -->
        <v-list-group value="Configuration">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Configuration" />
          </template>

          <v-list-item title="Overview" to="/overview" />
          <v-list-item title="Settings" to="/settings" />

          <!-- STORAGES SUBGROUP -->
          <v-list-group value="Storages">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Storages" />
            </template>
            <v-list-item
              v-for="([title, url], i) in storages"
              :key="i"
              :title="title"
              :to="url"
            />
          </v-list-group>

          <v-list-item title="Servers" to="/servers" />

          <!-- DATABASES SUBGROUP -->
          <v-list-group value="Databases">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Databases" />
            </template>
            <v-list-item
              v-for="([title, url], i) in databases"
              :key="i"
              :title="title"
              :to="url"
            />
          </v-list-group>

          <v-list-item title="Template" to="/template" />

          <!-- CRYPT SUBGROUP -->
          <v-list-group value="Crypt">
            <template #activator="{ props }">
              <v-list-item v-bind="props" title="Crypt" />
            </template>
            <v-list-item
              v-for="([title, url], i) in crypt"
              :key="i"
              :title="title"
              :to="url"
            />
          </v-list-group>

          <v-list-item title="Shell" to="/shell" />
          <v-list-item title="Docker" to="/docker" />

          <v-divider class="my-2" />

        </v-list-group>
      </v-list>

      <v-divider class="my-2" />

      <v-list nav density="compact">
        <v-list-item title="Timelines" to="/timelines" />
      </v-list>

      <div v-if="isMobile">
        <v-divider class="my-2" />

        <v-list nav density="compact">
          <v-list-item
            href="https://github.com/elkirrs/dumper"
            target="_blank"
            rel="noopener"
          >
            <v-list-item-title>GitHub</v-list-item-title>
          </v-list-item>

          <v-list-item
            href="https://github.com/elkirrs/dumper/releases"
            target="_blank"
            rel="noopener"
          >
            <v-list-item-title>Releases</v-list-item-title>
          </v-list-item>

        </v-list>
      </div>


    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main>
      <v-container class="pt-8">
        <router-view />
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useDisplay } from "vuetify"

const theme = ref("light")
const open = ref([])
const route = useRoute()

const { smAndDown } = useDisplay()
const isMobile = smAndDown
const drawer = ref(!isMobile.value)

watch(isMobile, (mobile) => {
  drawer.value = !mobile
})

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
  ["Config", "/crypt/config"],
  ["Database", "/crypt/database"],
]

watch(
  () => route.path,
  (path) => {
    open.value = []

    if (storages.some(([_, url]) => url === path)) {
      open.value.push("Configuration", "Storages")
    } else if (databases.some(([_, url]) => url === path)) {
      open.value.push("Configuration", "Databases")
    } else if (crypt.some(([_, url]) => url === path)) {
      open.value.push("Configuration", "Crypt")
    } else if (["/overview", "/settings", "/shell", "/docker"].includes(path)) {
      open.value.push("Configuration")
    }
  },
  { immediate: true }
)
</script>

<style scoped>
h2 {
  margin: 0;
}

@media (max-width: 600px) {
  .v-navigation-drawer {
    width: 240px !important;
  }
  .v-list-item {
    font-size: 14px;
    padding: 6px 12px;
  }
}
</style>
