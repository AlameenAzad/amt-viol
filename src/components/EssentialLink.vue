<template>
  <div>
    <q-list>
      <q-item
        v-for="link in dashboardRoutes"
        :key="link.to"
        :to="link.to"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon class="text-white" :name="link.icon" />
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
<style lang="scss"></style>
