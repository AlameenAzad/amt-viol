<template>
  <div>
    <q-select
      outlined
      dense
      v-model="model"
      multiple
      :options="fundings"
      options-selected-class="text-primary text-weight-600"
      class="no-shadow input-radius-6"
      @input="onSelect"
      :rules="
        requiresValidation === true
          ? [val => (!!val && val.length > 0) || 'Required']
          : []
      "
    >
      <template v-slot:selected>
        <template v-if="model && model.length > 0">
          <span v-for="(funding, index) in model" :key="index">
            {{ index > 0 ? ", " : "" }}
            {{ funding.title }}
          </span>
        </template>
        <template v-else>
          <span class="text-grey">
            {{ $t("fundingSelector.title") }}
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
  </div>
</template>

<script>
export default {
  name: "fundings",
  props: {
    requiresValidation: {
      type: Boolean,
      default: false
    },
    editing: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      model: this.editing
    };
  },
  methods: {
    onSelect(value) {
      const fundings = [];
      value.forEach(element => {
        fundings.push({ id: element.id });
      });
      this.$emit("update:linkToFunding", fundings.length > 0 ? fundings : []);
    }
  },
  computed: {
    fundings() {
      return this.$store.state.funding.fundings.map(funding => {
        return {
          id: funding.id,
          title: funding.title
        };
      });
    }
  }
  // mounted() {
  //   this.model = this.editing
  //     ? JSON.parse(JSON.stringify(this.$store.state.project.project.fundings))
  //     : null;
  // }
};
</script>

<style></style>
