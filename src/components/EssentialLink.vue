<template>
  <div>
    <q-list>
      <q-item
        v-for="link in dashboardRoutes"
        :key="link.to"
        :to="link.to"
        clickable
        v-ripple
        class="q-px-lg"
        :active="$router.currentRoute.name == link.name"
        active-class="text-white activeMenu"
      >
        <q-item-section avatar>
          <img class="icon-white" :src="link.icon" />
        </q-item-section>
        <q-item-section>
          {{ link.title }}
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
</style>
