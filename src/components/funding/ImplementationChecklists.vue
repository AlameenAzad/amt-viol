<template>
  <q-select
    outlined
    dense
    v-model="model"
    multiple
    :options="implementationChecklists"
    options-selected-class="text-primary text-weight-600"
    class="no-shadow input-radius-6"
    @input="onSelect"
  >
    <template v-slot:selected>
      <template v-if="model && model.length > 0">
        <span v-for="(implementationChecklist, index) in model" :key="index">
          {{ index > 0 ? ", " : "" }}
          {{ implementationChecklist.title }}
        </span>
      </template>
      <template v-else>
        <span class="text-grey">
          Select Implementation Checklist
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
  name: "implementationChecklists",
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    onSelect(value) {
      const implementationChecklists = [];
      value.forEach(element => {
        implementationChecklists.push({ id: element.id });
      });
      this.$emit(
        "update:linkToImplementationChecklist",
        implementationChecklists.length > 0 ? implementationChecklists : []
      );
    }
  },
  computed: {
    implementationChecklists() {
      return [
        {
          id: 1,
          title: "checklist 1",
          ideaProvider: "volunteering",
          visibility: "all users",
          createdAt: "2022-05-18T07:52:15.362Z",
          updatedAt: "2022-05-18T07:52:15.362Z"
        }
      ];
      // return this.$store.state.implementationChecklist.implementationChecklists.map(
      //   checklist => {
      //     return {
      //       id: checklist.id,
      //       title: checklist.title
      //     };
      //   }
      // );
    }
  },
  mounted() {
    this.model = this.editing
      ? JSON.parse(JSON.stringify(this.$store.state.project.project.projects))
      : null;
  }
};
</script>

<style></style>
