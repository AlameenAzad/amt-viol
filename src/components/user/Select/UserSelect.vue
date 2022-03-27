<template>
  <q-select
    outlined
    dense
    v-model="model"
    :options="options"
    options-selected-class="text-primary"
    class="no-shadow input-radius-6"
    @input="onSelect"
  >
    <template v-slot:selected>
      <template v-if="model">
        {{ model }}
      </template>
      <template v-else>
        <span class="text-grey">
          Select user
        </span>
      </template>
    </template></q-select
  >
</template>

<script>
export default {
  name: "userSelect",
  props: ["editor"],
  data() {
    return {
      model: this.editor,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  methods: {
    onSelect(value) {
      this.$emit("update:editor", value);
    }
  }
};
</script>

<style></style>
