<template>
  <q-layout view="lhh lpR fFf">
    <q-header class="bg-primary text-white no-shadow">
      <q-toolbar class="q-my-sm navContainer ">
        <!-- TODO Fix toolbar title taking full width -->
        <q-toolbar-title>
          <q-btn
            unelevated
            no-caps
            flat
            size="lg"
            :ripple="false"
            :to="{ name: 'landing' }"
          >
            Amt Viöl
          </q-btn>
        </q-toolbar-title>
        <div>
          <q-btn
            @click="loginModal = true"
            color="yellow"
            unelevated
            class="mr-0 radius-6"
            no-caps
          >
            <p class="q-mb-none text-blue q-mx-xl q-my-xs">Login</p>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="loginModal">
      <q-card
        class="radius-10 q-px-lg q-pt-lg q-pb-md"
        style="width: 570px; max-width: 80vw;"
      >
        <q-card-section>
          <q-form ref="loginForm" @submit.prevent="login" class="q-gutter-lg">
            <div class="row">
              <div class="col-12">
                <p class="q-mb-sm font-16">Email</p>
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  v-model="form.identifier"
                  :rules="[val => !!val || 'Field is required']"
                />
              </div>
              <div class="col-12 q-mt-lg">
                <p class="q-mb-sm font-16">Password</p>
                <q-input
                  outlined
                  dense
                  type="password"
                  class="no-shadow input-radius-6"
                  v-model="form.password"
                  :rules="[val => !!val || 'Field is required']"
                />
              </div>
            </div>
            <p class="no-margin text-red text-center">{{ errorMsg }}</p>
            <div class="row justify-center">
              <div class="col-6 text-center">
                <q-btn
                  type="submit"
                  label="Login"
                  class="radius-10"
                  padding="12px 60px"
                  color="yellow"
                  text-color="black"
                  :loading="isLoading"
                  unelevated
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
      <div v-if="$router.currentRoute.path != '/'" class="bg-yellow-10 q-py-xl">
        <div class="row container">
          <div class="col-2">
            <img src="folder.svg" alt="folder icon" />
          </div>
          <div class="col self-center font-18">
            <p>
              Wenn Sie weitere Dokumente sowie Checklisten sehen möchten, dann
              registrieren Sie sich.
            </p>
            <q-btn color="blue" unelevated class="mr-0 radius-6" no-caps>
              <p class="q-mb-none  q-mx-lg q-my-xs">Sign Up</p>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="text-center bg-blue-5 text-white font-16 q-py-md">
        {{ currentYear }} © Amt Viöl. All rights reserved
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
export default {
  name: "MainLayout",
  data() {
    return {
      form: {
        identifier: "",
        password: ""
      },
      errorMsg: "",
      currentYear: date.formatDate(Date.now(), "YYYY"),
      loginModal: false,
      isLoading: false
    };
  },
  methods: {
    // May need to rework this....
    async login() {
      if (!!this.form.identifier && this.form.password) {
        this.isLoading = true;
        const res = await this.$store.dispatch("auth/login", this.form);
        this.isLoading = false;
        this.errorMsg = res;
        if (res === true) {
          this.loginModal = false;
          this.isLoading = false;
          this.form.identifier = "";
          this.form.password = "";
          this.errorMsg = "";
        }
      }
    }
  }
};
</script>
<style scoped>
.navContainer {
  padding: 0 135px !important;
}
</style>
