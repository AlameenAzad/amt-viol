<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          <q-btn
            :icon="themeIcon"
            flat
            round
            dark
            @click="toggleDarkMode"
            class="mr-0"
          >
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="leftDrawer text-white"
    >
      <q-list>
        <EssentialLink />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import errorDialog from "components/errorDialog.vue";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled
} from "darkreader";

export default {
  name: "MainLayout",
  components: {
    EssentialLink
  },
  data() {
    return {
      leftDrawerOpen: true,
      themeIcon: isDarkReaderEnabled()
        ? "mdi-weather-night"
        : "mdi-white-balance-sunny",
      isEnabled: false
    };
  },
  methods: {
    toggleDarkMode() {
      if (isDarkReaderEnabled()) disableDarkMode();
      else
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 10
        });
    }
  },
  mounted() {
    console.log("dev? ", process.env.DEV);
    console.log("prod? ", process.env.PROD);
    console.log("router ", this.$router);
  }
};
</script>
