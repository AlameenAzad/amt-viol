<template>
  <q-select
    outlined
    dense
    v-model="model"
    multiple
    :options="tags"
    options-selected-class="text-primary"
    class="no-shadow input-radius-6"
    @input="onSelect"
  >
    <template v-slot:selected>
      <template v-if="model && model.length > 0">
        <span v-for="(tag, index) in model" :key="index">
          {{ index > 0 ? ", " : "" }}
          {{ tag.title }}
        </span>
      </template>
      <template v-else>
        <span class="text-grey">
          Select tags
        </span>
      </template>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
        <q-item-section>
          <q-item-label>{{ scope.opt.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: "tags",
  data() {
    return {
      model: null
    };
  },
  methods: {
    onSelect(value) {
      const tags = [];
      value.forEach(element => {
        tags.push({ id: element.id });
      });
      this.$emit("update:tag", tags);
    }
  },
  computed: {
    tags() {
      return this.$store.state.tag.tags;
    }
  }
};
</script>

<style></style>
