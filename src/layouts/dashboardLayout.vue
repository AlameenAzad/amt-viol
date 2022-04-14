<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black text-white">
      <q-toolbar class="q-my-sm q-px-xl">
        <q-toolbar-title
          class="text-weight-600"
          :class="$router.currentRoute.meta.backLink ? 'cursor-pointer' : ''"
          @click="goBack()"
        >
          <q-icon
            v-if="$router.currentRoute.meta.backLink"
            name="chevron_left"
            size="sm"
            color="primary"
            class="q-mb-"
          />
          {{ $router.currentRoute.meta.title }}
        </q-toolbar-title>
        <div>
          <q-btn
            :icon="themeIcon"
            flat
            round
            dark
            color="blue"
            @click="toggleDarkMode"
            class="mr-0"
          >
          </q-btn>
          <q-btn
            icon="notifications"
            to="/user/notifications"
            flat
            round
            dark
            color="blue"
            class="mr-0"
          >
          </q-btn>
          <q-btn
            icon="person"
            to="/user/data"
            flat
            round
            dark
            color="blue"
            class="mr-0"
          >
          </q-btn>
          <q-btn
            icon="settings"
            to="/user/settings"
            flat
            round
            dark
            color="blue"
            class="mr-0"
          >
          </q-btn>
          <q-btn
            icon="logout"
            flat
            round
            dark
            color="red"
            class="mr-0"
            @click="$store.dispatch('userCenter/logout')"
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
      content-class="bg-blue"
    >
      <div class="q-px-lg q-pt-sm">
        <p class="font-20 text-weight-bold">
          ENABLER/ <br />
          FACILITATOR ADMINS
        </p>
      </div>
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
    },
    goBack() {
      this.$router.currentRoute.meta.backLink &&
        this.$router.push(this.$router.currentRoute.meta.backLink);
    }
  },
  mounted() {
    console.log("dev? ", process.env.DEV);
    console.log("prod? ", process.env.PROD);
    console.log("router ", this.$router);
    console.log("router", this.$router.currentRoute);
  }
};
</script>
