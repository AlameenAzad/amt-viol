<template>
  <div>
    <div class="row q-col-gutter-y-lg q-mb-lg">
      <div v-for="(cost, index) in estimatedCosts" :key="index" class="col-12">
        <div class="row items-center q-col-gutter-x-md">
          <div class="col-11">
            <div class="row q-col-gutter-x-md ">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Cost name"
                  v-model="cost.name"
                  :rules="[]"
                  @input="onInput(index)"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Cost amount"
                  v-model.number="cost.price"
                  :rules="[]"
                  @input="onInput(index)"
                />
              </div>
            </div>
          </div>
          <div class="col-1">
            <q-btn
              @click="removeEstimatedCost(index)"
              icon="delete"
              flat
              round
              color="red"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <q-btn
        @click="addEstimatedCost()"
        outline
        class="radius-6"
        icon="add"
        size="md"
        color="primary"
        label="Add Costs"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "estimatedCost",
  props: {
    editing: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      estimatedCosts: []
    };
  },
  methods: {
    onInput(index) {
      if (
        !!this.estimatedCosts[index].name &&
        !!this.estimatedCosts[index].price
      ) {
        this.$emit(
          "update:cost",
          this.estimatedCosts.length > 0 ? this.estimatedCosts : []
        );
      }
    },
    addEstimatedCost() {
      this.estimatedCosts.push({
        name: "",
        price: ""
      });
    },
    removeEstimatedCost(index) {
      this.estimatedCosts.splice(index, 1);
      this.$emit(
        "update:cost",
        this.estimatedCosts.length > 0 ? this.estimatedCosts : []
      );
    }
  },
  mounted() {
    this.estimatedCosts = this.editing
      ? JSON.parse(
          JSON.stringify(this.$store.state.project.project.estimatedCosts)
        )
      : [];
  }
};
</script>

<style></style>
