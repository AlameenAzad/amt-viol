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
        <span v-for="(tag, index) in model" :key="index">
          {{ index > 0 ? ", " : "" }}
          {{ tag }}
        </span>
      </template>
      <template v-else>
        <span class="text-grey">
          Select tags
        </span>
      </template>
    </template></q-select
  >
</template>

<script>
export default {
  name: "tags",
  data() {
    return {
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  methods: {
    onSelect(value) {
      this.$emit("update:tag", value);
    }
  }
};
</script>

<style></style>
