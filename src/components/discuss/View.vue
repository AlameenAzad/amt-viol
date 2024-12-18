<template>
  <div class="q-mb-lg q-mt-xl q-mx-xl">
    <search />
    <discussions />
  </div>
</template>

<script js>
import search from "./components/Search.vue";
import discussions from "./components/Discussions.vue";
export default {
  name: "discussView",
  components: {
    search,
    discussions,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss"></style>
