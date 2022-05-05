<template>
  <q-page class="q-mx-xl q-mt-lg">
    <categoriesKeyword />
  </q-page>
</template>

<script>
import categoriesKeyword from "src/components/categoriesKeywords/categoriesKeyword.vue";

export default {
  name: "CategoriesKeywords",
  components: {
    categoriesKeyword
  }
};
</script>
