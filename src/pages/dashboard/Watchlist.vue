<template>
  <q-page class="q-mx-xl q-mt-lg">
    <overview />
  </q-page>
</template>

<script>
import overview from "components/watchlist/overview.vue";
export default {
  name: "watchlist",
  components: {
    overview
  },
  data() {
    return {};
  }
};
</script>
