<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black text-white">
      <q-toolbar
        class="q-my-sm justify-between"
        :class="$q.screen.gt.sm ? 'q-px-xl' : 'q-px-sm'"
      >
        <q-btn
          class="lt-md"
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          dense
          color="primary"
          icon="menu"
        />
        <div class="col-4 col-md-auto">
          <q-toolbar-title
            class="text-weight-600"
            :class="$router.currentRoute.meta.backLink ? 'cursor-pointer' : ''"
            @click="$router.go(-1)"
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
        </div>
        <div class="col-auto">
          <q-btn
            flat
            round
            dark
            no-caps
            color="blue"
            @click="switchLang"
            class="mr-0 text-weight-bold"
            >{{ $i18n.locale === "en-us" ? "EN" : "DE" }}
          </q-btn>
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
            to="/user/data?tab=projectIdeas"
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
            v-if="$q.screen.gt.sm"
            icon="logout"
            flat
            round
            dark
            color="red"
            class="mr-0"
            @click="logout"
          >
          </q-btn>
        </div>

        <!-- <q-space></q-space> -->
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
        <p class="font-20 ">
          <small class="q-mr-xs">Hello,</small><br />
          <span class="text-weight-bold">{{ user || "" }}</span>
        </p>
      </div>
      <q-list>
        <EssentialLink />
      </q-list>
    </q-drawer>
    <logoutDialog :dialogState="logoutDialog" @update="logoutDialog = $event" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import errorDialog from "components/errorDialog.vue";
import logoutDialog from "components/user/authentication/logout.vue";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled
} from "darkreader";

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    logoutDialog
  },
  data() {
    return {
      logoutDialog: false,
      leftDrawerOpen: this.$q.screen.gt.sm,
      themeIcon: isDarkReaderEnabled()
        ? "mdi-weather-night"
        : "mdi-white-balance-sunny",
      isEnabled: false
    };
  },
  methods: {
    switchLang() {
      if (this.$i18n.locale === "en-us") {
        this.$i18n.locale = "de";
      } else {
        this.$i18n.locale = "en-us";
      }
    },
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
    },
    logout() {
      console.log(localStorage.getItem("showLogoutDialog"));
      localStorage.getItem("showLogoutDialog") == "false"
        ? this.$store.dispatch("userCenter/logout")
        : (this.logoutDialog = true);
    }
  },
  computed: {
    user() {
      return this.$store.state.userCenter.user?.user.username;
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
