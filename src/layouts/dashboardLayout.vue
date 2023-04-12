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
            @click="$router.currentRoute.meta.backLink ? $router.go(-1) : ''"
          >
            <q-icon
              v-if="$router.currentRoute.meta.backLink"
              name="chevron_left"
              size="sm"
              color="primary"
              class="q-mb-"
            />
            {{
              $i18n.locale === "en-us"
                ? $router.currentRoute.meta.title
                : $router.currentRoute.meta.titleDE
            }}
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
              v-if="isGuest"
              icon="person"
              to="/community/data?tab=projectIdeas"
              flat
              round
              dark
              color="blue"
              class="mr-0"
            >
          </q-btn>
          <q-btn
          v-else
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
            to="/user/settings?tab=generalData"
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
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
    >
      <div class="q-px-lg q-pt-sm" v-if="!miniState">
        <p class="font-20 ">
          <small class="q-mr-xs">{{ $t("Hello") }},</small><br />
          <span class="text-weight-bold">{{ user || "" }}</span>
        </p>
      </div>
      <div
        v-if="miniState"
        class="q-px-md q-pt-md q-mb-lg"
        :class="miniState == true ? '' : 'invisible'"
      >
        <!-- <p class="font-26">A<br /></p> -->
        <q-img width="40px" src="amtlogo.png"></q-img>
      </div>

      <q-list>
        <EssentialLink :miniState="miniState" />
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 90px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="yellow"
          text-color="dark"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
      <div class="absolute-bottom">
        <router-link
          style="text-decoration: none"
          :to="{ path: '/impressum' }"
          target="_blank"
        >
          <p class="q-ml-md cursor-pointer text-blue-grey-1">
            Impressum
          </p>
        </router-link>
        <router-link
          style="text-decoration: none"
          :to="{ path: '/datenschutzerklaerung' }"
          target="_blank"
        >
          <p class="q-ml-md cursor-pointer text-blue-grey-1">
            Datenschutzerklaerung
          </p>
        </router-link>
        <p
          @click="showCookieBox"
          class="q-ml-md cursor-pointer text-blue-grey-1"
        >
          {{ $t("Change Cookie settings") }}
        </p>
      </div>
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
import Cookies from "js-cookie";
export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    logoutDialog
  },
  data() {
    return {
      logoutDialog: false,
      miniState: false,
      leftDrawerOpen: this.$q.screen.gt.sm,
      themeIcon: "mdi-white-balance-sunny",
      isEnabled: false
    };
  },
  methods: {
    showCookieBox() {
      this.$store.commit("userCenter/changeShowCookieBox", true);
    },
    drawerClick(e) {
      if (this.miniState) {
        this.miniState = false;
        e.stopPropagation();
      }
    },
    switchLang() {
      if (this.$i18n.locale === "en-us") {
        if (this.cookiePrefrence) localStorage.setItem("lang", "de");
        this.$i18n.locale = "de";
      } else {
        if (this.cookiePrefrence) localStorage.setItem("lang", "en");
        this.$i18n.locale = "en-us";
      }
    },
    toggleDarkMode() {
      if (isDarkReaderEnabled()) {
        if (this.cookiePrefrence) localStorage.setItem("darkmode", false);
        disableDarkMode();
        this.themeIcon = "mdi-white-balance-sunny";
      } else {
        if (this.cookiePrefrence) localStorage.setItem("darkmode", true);
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 10
        });
        this.themeIcon = "mdi-weather-night";
      }
    },
    logout() {
      console.log(localStorage.getItem("showLogoutDialog"));
      localStorage.getItem("showLogoutDialog") == "false"
        ? this.$store.dispatch("userCenter/logout")
        : (this.logoutDialog = true);
    },
    checkLanguage() {
      if (!!localStorage.getItem("lang")) {
        if (localStorage.getItem("lang") === "de") {
          if (this.cookiePrefrence) localStorage.setItem("lang", "de");
          this.$i18n.locale = "de";
        } else {
          if (this.cookiePrefrence) localStorage.setItem("lang", "en");
          this.$i18n.locale = "en-us";
        }
      } else {
        if (this.cookiePrefrence) localStorage.setItem("lang", "de");
        this.$i18n.locale = "de";
      }
    },
    checkDarkMode() {
      if (!!localStorage.getItem("darkmode")) {
        if (localStorage.getItem("darkmode") == "true") this.toggleDarkMode();
      } else {
        if (this.cookiePrefrence) localStorage.setItem("darkmode", false);
      }
    }
  },
  computed: {
    user() {
      return (
        !!this.$store.state.userCenter.user &&
        !!this.$store.state.userCenter.user.user &&
        this.$store.state.userCenter.user.user.username
      );
    },
    cookiePrefrence() {
      if (!Cookies.get("consent")) return false;
      const cookie = JSON.parse(Cookies.get("consent"));
      return !!cookie.consent.prefrences;
    },
    isGuest(){
      return this.$store.getters["userCenter/isGuest"];
    }
  },
  mounted() {
    console.log("dev? ", process.env.DEV);
    console.log("prod? ", process.env.PROD);
    console.log("router ", this.$router);
    console.log("router", this.$router.currentRoute);
    this.checkLanguage();
    this.checkDarkMode();
  }
};
</script>
