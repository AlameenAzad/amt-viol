<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-my-sm navContainer ">
        <q-toolbar-title>
          Amt Viöl
        </q-toolbar-title>
        <div>
          <q-btn color="yellow" unelevated class="mr-0 radius-6" no-caps>
            <p class="q-mb-none text-blue q-mx-lg q-my-xs">Login</p>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <div class="bg-yellow-10 q-py-xl">
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
      currentYear: date.formatDate(Date.now(), "YYYY")
    };
  }
};
</script>
<style scoped>
.navContainer {
  padding: 0 135px !important;
}
</style>
