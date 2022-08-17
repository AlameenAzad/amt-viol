<template>
  <div id="q-app">
    <router-view />
    <CookieConsent />
  </div>
</template>
<script>
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
    onAccept(val) {
      if (val === "all") {
        this.essential = true;
        this.easeOfUse = true;
      } else if (val === "essential") {
        this.essential = true;
      } else {
        this.easeOfUse = true;
      }
    }
  },
  mounted() {
    console.log("App mounted");
  }
};
</script>
