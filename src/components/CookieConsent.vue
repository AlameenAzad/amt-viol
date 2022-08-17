<template>
  <transition name="fade">
    <q-card
      v-if="showCookieBox"
      class="z-top fixed-bottom full-width q-mx-auto q-pa-lg shadow-2"
    >
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <div class="row items-center">
            <div class="col-12 col-md-8">
              <q-card-section class="q-pb-none">
                <div class="row justify-between">
                  <div class="col-6">
                    <p class="no-margin font-24">This website uses Cookies</p>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="">
                <div class="row">
                  <div class="col-12">
                    By clicking "Accept All Cookies", you agree to the storing
                    of session cookies on your device to enhance site navigation
                    and your user experince. Our cookies are session based and
                    clear themelves upon closur of the website. <br />
                    For more information you are welcome to view our Cookie
                    Policy, Privacy Policy and our Terms of Service for more
                    information
                  </div>
                </div>
              </q-card-section>
            </div>
            <div class="col-12 col-md-4">
              <q-card-section class="">
                <div class="col-12">
                  <q-btn
                    @click="onAccept('preferences')"
                    padding="10px 0"
                    unelevated
                    color="primary"
                    class="shadow-0 full-width"
                  >
                    Accept My Prefrences
                  </q-btn>
                </div>
                <div class="col-12 q-mt-sm">
                  <q-btn
                    @click="onAccept('essential')"
                    padding="10px 0"
                    outline
                    color="primary"
                    class="shadow-0 full-width"
                  >
                    Accept Essentials
                  </q-btn>
                </div>
              </q-card-section>
            </div>
            <div class="col-12">
              <q-card-section>
                <div class="row q-col-gutter-x-md justify-between items-center">
                  <div class="col-auto">
                    <div class="row">
                      <div class="col-auto">
                        <q-toggle
                          size="xl"
                          color="primary"
                          v-model="essential"
                          disable
                          label="Essential"
                          left-label
                        />
                      </div>
                      <div class="col-auto">
                        <q-toggle
                          size="xl"
                          color="primary"
                          v-model="userPreferences"
                          label="User preferences"
                          left-label
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="row">
                      <div class="col-auto">
                        <q-btn
                          class="radius-6"
                          outline
                          color="primary"
                          @click="expanded = !expanded"
                          label="Details"
                          :icon-right="expanded ? 'expand_less' : 'expand_more'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <q-expansion-item
                      header-class="hidden"
                      expand-icon="0"
                      v-model="expanded"
                    >
                      <q-card>
                        <q-card-section class="q-pl-none">
                          <h3 class="font-20 q-ma-none ">
                            Essential Cookies
                          </h3>
                          These cookies are necessary for our website to
                          function properly and cannot be switched off in our
                          systems. They are usually only set in response to
                          actions made by you which amount to a request for
                          services, such as setting your privacy preferences,
                          logging in or filling in forms or where they’re
                          essential to provide you with a service you have
                          requested. You cannot opt-out of these cookies. You
                          can set your browser to block or alert you about these
                          cookies, but if you do, some parts of the site will
                          not then work. These cookies do not store any
                          personally identifiable information.
                        </q-card-section>
                        <q-card-section class="q-pl-none">
                          <h3 class="font-20 q-ma-none ">
                            User preferences
                          </h3>
                          These cookies are used to store your preferences and
                          settings for our website. They are not essential to
                          the functioning of the website and you can opt out of
                          them at any time.<br />
                          This includes your language prefrence, darkmode, and
                          to logout without confirmation.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </transition>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "cookieConsent",
  data() {
    return {
      essential: true,
      userPreferences: false,
      expanded: false
    };
  },
  methods: {
    async onAccept(val) {
      let consent = {
        essential: this.essential,
        prefrences: this.userPreferences,
        version: "1.0.0"
      };
      if (val === "essential") {
        consent.prefrences = false;
      }
      if (consent.prefrences === false) {
        localStorage.clear();
      }
      const consentCookie = Cookies.get("consent");
      if (!!consentCookie) {
        const cookie = JSON.parse(consentCookie);
        console.log("cookie", cookie);
        if (cookie.hasOwnProperty("cKey")) {
          console.log("update");
          const instance = this.$api.create();
          delete instance.defaults.headers.common["Authorization"];
          try {
            const res = await instance.put(
              `/api/data-concents/${encodeURIComponent(cookie.cKey)}`,
              {
                data: {
                  key: cookie.cKey,
                  consent: consent
                }
              }
            );
            Cookies.set("consent", JSON.stringify(res.data), {
              expires: 365,
              secure: true
            });
            // this.checkConsentStatus();
            location.reload();
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: error.response.data.error.message
            });
            this.loading = false;
          }
        } else {
          console.log("create");
          const instance = this.$api.create();
          delete instance.defaults.headers.common["Authorization"];
          try {
            const res = await instance.put(
              `/api/data-concents/${encodeURIComponent(cookie)}`,
              {
                data: {
                  key: cookie,
                  consent: consent
                }
              }
            );
            Cookies.set("consent", JSON.stringify(res.data), {
              expires: 365,
              secure: true
            });
            // this.checkConsentStatus();
            location.reload();
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: error.response.data.error.message
            });
            this.loading = false;
          }
        }
      } else {
        console.log("create key and update");
        const instance = this.$api.create();
        delete instance.defaults.headers.common["Authorization"];
        try {
          const res = await instance.get("/api/concent/key");
          Cookies.set("consent", JSON.stringify(res.data.key), {
            expires: 365,
            secure: true
          });
          const updateRes = await instance.put(
            `/api/data-concents/${encodeURIComponent(res.data.key)}`,
            {
              data: {
                key: res.data.key,
                consent: consent
              }
            }
          );
          Cookies.set("consent", JSON.stringify(updateRes.data), {
            expires: 365,
            secure: true
          });
          this.checkConsentStatus();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: error.response.data.error.message
          });
          this.loading = false;
        }
      }
    },
    async checkConsentStatus() {
      const cookieStatus = Cookies.get("consent");
      if (!cookieStatus) {
        console.log("consent not found");
        this.$store.commit("userCenter/changeShowCookieBox", true);
      } else {
        console.log("consent found, check specific cookie");
        this.$store.commit("userCenter/changeShowCookieBox", false);
        this.getCookieDetails();
      }
    },
    async getCookieDetails() {
      const cookie = JSON.parse(Cookies.get("consent"));
      console.log("cookie", cookie);
      if (!!cookie) {
        if (cookie.hasOwnProperty("cKey")) {
          console.log("update");
          const instance = this.$api.create();
          delete instance.defaults.headers.common["Authorization"];
          try {
            const res = await instance.get(
              `/api/data-concents/${encodeURIComponent(cookie.cKey)}`
            );
            console.log("resssss", res);
            Cookies.set("consent", JSON.stringify(res.data[0]), {
              expires: 365,
              secure: true
            });
            this.essential = res.data[0].consent.essential;
            this.userPreferences = res.data[0].consent.prefrences;
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: error.response.data.error.message || ""
            });
            this.loading = false;
          }
        } else {
          console.log("create");
          const instance = this.$api.create();
          delete instance.defaults.headers.common["Authorization"];
          try {
            const res = await instance.get(
              `/api/data-concents/${encodeURIComponent(cookie)}`
            );
            Cookies.set("consent", JSON.stringify(res.data[0]), {
              expires: 365,
              secure: true
            });
            this.essential = res.data[0].consent.essential;
            this.userPreferences = res.data[0].consent.prefrences;
            console.log("resssss", res);
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: error.response.data.error.message || ""
            });
            this.loading = false;
          }
        }
      }
    }
  },
  mounted() {
    this.checkConsentStatus();
  },
  watch: {
    showCookieBox(newVal, oldVal) {
      if (newVal === true) {
        this.getCookieDetails();
      }
    }
  },
  computed: {
    showCookieBox() {
      return this.$store.state.userCenter.showCookieBox;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
