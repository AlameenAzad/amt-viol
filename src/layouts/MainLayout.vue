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
            @click="loginDialog = true"
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
    <LoginDialog :dialogState="loginDialog" @update="loginDialog = $event" />
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
import LoginDialog from "components/user/authentication/LoginDialog.vue";
export default {
  name: "MainLayout",
  components: {
    LoginDialog
  },
  data() {
    return {
      currentYear: date.formatDate(Date.now(), "YYYY"),
      loginDialog: false
    };
  }
};
</script>
<style scoped>
.navContainer {
  padding: 0 135px !important;
}
</style>
