<template>
  <q-page class="bg-blue-1">
    <ProjectContent />
  </q-page>
</template>

<script>
import ProjectContent from "components/projects/view/ProjectContent.vue";
export default {
  name: "documentView",
  components: {
    ProjectContent
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style lang="scss">
.carouselThumbnails .q-tabs__arrow--end {
  right: -70px;
  color: $blue;
}
.carouselThumbnails .q-tabs__arrow--start {
  left: -70px;
  color: $blue;
}
</style>
