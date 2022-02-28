<template>
  <div style="height: 100%"></div>
</template>

<script>
export default {
  name: "links",
  data() {
    return {
      links: [
        {
          title: "Home",
          icon: "mdi-home",
          to: "/",
          nested: [],
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss"></style>
