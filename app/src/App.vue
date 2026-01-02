<template>
  <v-app :theme="theme">
    <!-- TOP BAR -->
    <v-app-bar app elevation="1">
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"/>

      <v-spacer v-if="isMobile"></v-spacer>

      <div :class="!isMobile ? 'pa-16' : 'd-flex justify-center'">
        <a
          href="/dumper/"
          rel="noopener"
        >
          <v-img
            :width="isMobile ? 100 : 135"
            aspect-ratio="16/9"
            cover
            src="/dumper.svg"
          ></v-img>
        </a>
      </div>

      <v-spacer></v-spacer>

      <div :class="!isMobile ? 'pr-16': 'pr-4'">
        <a
          href="https://github.com/elkirrs/dumper"
          rel="noopener"
        >
          <v-avatar size="28" image="/github.svg"></v-avatar>
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
        <v-list-item title="Home" to="/"/>
      </v-list>

      <v-divider class="my-2"/>

      <v-list nav v-model:opened="open" density="compact">
        <!-- CONFIGURATION GROUP -->
        <v-list-group value="Configuration">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="Configuration"/>
          </template>

          <v-list-item title="Overview" to="/overview"/>
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

      <v-list nav density="compact" v-if="version">
        <v-list-item :title="'Version: ' + version"/>
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
import {ref, watch, onMounted} from "vue"
import {useRoute} from "vue-router"
import {useDisplay} from "vuetify"

const theme = ref("light")
const open = ref([])
const route = useRoute()

const stars = ref(null)
const version = ref(null)
const loadingStars = ref(false)

const {smAndDown} = useDisplay()
const isMobile = smAndDown
let drawer;
drawer = ref(!isMobile.value);

watch(isMobile, (mobile) => {
  drawer.value = !mobile
})

const storages = [
  ["Local", "/storages/local"],
  ["SFTP", "/storages/sftp"],
  ["FTP", "/storages/ftp"],
  ["Azure", "/storages/azure"],
  ["Amazon S3", "/storages/s3"],
].sort((a, b) => a[0].localeCompare(b[0]))

const databases = [
  ["Postgres", "/databases/psql"],
  ["MySQL", "/databases/mysql"],
  ["MongoDB", "/databases/mongodb"],
  ["MariaDB", "/databases/mariadb"],
  ["Microsoft SQL", "/databases/mssql"],
  ["SQLite", "/databases/sqlite"],
  ["Redis", "/databases/redis"],
  ["Neo4j Graph", "/databases/neo4j"],
  ["Amazon DynamoDB", "/databases/dynamodb"],
].sort((a, b) => a[0].localeCompare(b[0]))

const crypt = [
  ["Config", "/crypt/config"],
  ["Database", "/crypt/database"],
].sort((a, b) => a[0].localeCompare(b[0]))

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
  {immediate: true}
)
onMounted(async () => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/elkirrs/dumper/releases/latest'
    )
    const data = await response.json()

    version.value = data.tag_name
  } catch (e) {
    console.error('Error loading version:', e)
  } finally {
  }
})
</script>

<style scoped>
h2 {
  margin: 0;
}


</style>
