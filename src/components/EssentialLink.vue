<template>
  <div>
    <q-list>
      <q-item
        v-for="link in dashboardRoutes"
        :key="link.path"
        :to="link.path"
        clickable
        v-ripple
        class="q-px-lg"
        :active="$router.currentRoute.fullPath == link.path"
        active-class="text-white activeMenu"
        v-show="link.meta.showInNavigation === true"
      >
        <q-item-section avatar>
          <img class="icon-white" :src="link.icon" />
        </q-item-section>
        <q-item-section>
          {{ link.meta.title }}
        </q-item-section>
      </q-item>
      <q-item
        v-if="$q.screen.lt.md"
        clickable
        @click="$store.dispatch('userCenter/logout')"
        v-ripple
        class="q-px-lg"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          Logout
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "links",
  data() {
    return {};
  },
  computed: {
    dashboardRoutes() {
      return this.$router.options.routes[1].children;
    }
  }
};
</script>
<style lang="scss">
.activeMenu {
  position: relative;
}
.activeMenu .q-focus-helper {
  background: white !important;
  opacity: 0.15 !important;
}
.activeMenu::before {
  position: absolute;
  left: 0;
  content: "";
  top: 0;
  background: yellow;
  height: 100%;
  width: 3px;
}
//TODO: this class is applied to the current active link. made it white for now.
.q-item--active {
  color: white;
}
</style>
