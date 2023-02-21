<template>
  <div>
    <q-select outlined :bg-color="isInChecklist ? 'white' : ''" dense v-model="model"
      :multiple="isInChecklist === false" :clearable="isInChecklist === true" :options="fundings"
      options-selected-class="text-primary text-weight-600" class="no-shadow input-radius-6" @input="onSelect">
      <template v-slot:selected>
        <div v-if="!isInChecklist">
          <template v-if="model && model.length > 0">
            <span v-for="(funding, index) in model" :key="index">
              {{ index > 0 ? ", " : "" }}
              {{ funding.title }}
            </span>
          </template>
          <template v-else>
            <span class="text-grey">
              {{ $t("Select Funding") }}
            </span>
          </template>
        </div>
        <div v-if="isInChecklist">
          <template v-if="model">
            <span>
              {{ model.title }}
            </span>
          </template>
          <template v-else>
            <span class="text-grey">
              {{ $t("Select Funding") }}
            </span>
          </template>
        </div>
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
    isInChecklist: {
      type: Boolean,
      default: false
    },
    editing: {
      type: [Object, Array],
      default: () => null
    }
  },
  data() {
    return {
      model: this.editing
    };
  },
  methods: {
    onSelect(value) {
      if (!this.isInChecklist) {
        const fundings = [];
        value.forEach(element => {
          fundings.push({ id: element.id });
        });
        this.$emit("update:linkToChecklist", fundings.length > 0 ? fundings : []);
      } else {
        let funding = value;
        this.$emit(
          "update:linkToChecklist",
          !!funding && funding.id ? funding : null
        );
      }
    },
    setFunding() {
      this.model = this.$store.state.project.project.fundingGuideline[0] ? JSON.parse(JSON.stringify(this.$store.state.project.project.fundingGuideline[0]))
        : null;
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
};
</script>

<style>

</style>
