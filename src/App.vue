<template>
  <div id="q-app">
    <router-view />
    <CookieConsent />
  </div>
</template>
<script>
import Cookies from "js-cookie";
import CookieConsent from "components/CookieConsent.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    CookieConsent
  },
  methods: {
    async checkConsentStatus() {
      const cookieStatus = Cookies.get("consent");
      if (!cookieStatus) {
        console.log("consent not found");
        const instance = this.$api.create();
        delete instance.defaults.headers.common["Authorization"];
        try {
          const res = await instance.get("/api/concent/key");
          Cookies.set("consent", res.data.key);
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: error.response.data.error.message
          });
          this.loading = false;
        }
      } else {
        console.log("consent found");
      }
    }
  },
  mounted() {
    this.checkConsentStatus();
  }
};
</script>
