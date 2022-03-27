<template>
  <q-select
    outlined
    dense
    v-model="model"
    multiple
    :options="options"
    options-selected-class="text-primary"
    class="no-shadow input-radius-6"
    @input="onSelect"
  >
    <template v-slot:selected>
      <template v-if="model">
        <span v-for="(category, index) in model" :key="index">
          {{ index > 0 ? ", " : "" }}
          {{ category }}
        </span>
      </template>
      <template v-else>
        <span class="text-grey">
          Select Categories
        </span>
      </template>
    </template></q-select
  >
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  methods: {
    onSelect(value) {
      this.$emit("update:category", value);
    }
  }
};
</script>

<style></style>
