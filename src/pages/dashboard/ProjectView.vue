<template>
  <q-page class=" q-mx-xl q-mt-lg bg-blue-1">
    <ProjectContent />
  </q-page>
</template>

<script>
import ProjectContent from "components/projects/view/ProjectContent.vue";
export default {
  name: "projectView",
  components: {
    ProjectContent
  },
  data() {
    return {};
  },
  methods: {}
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
