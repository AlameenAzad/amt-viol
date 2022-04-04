<template>
  <div>
    <div class="row q-col-gutter-y-lg q-mb-lg">
      <div v-for="(cost, index) in Titles" :key="index" class="col-12">
        <div class="row items-center q-col-gutter-x-md">
          <div class="col-11">
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Title"
                  v-model="cost.title"
                  :rules="[]"
                  @input="onInput(index)"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="http://"
                  v-model.number="cost.link"
                  :rules="[]"
                  @input="onInput(index)"
                />
              </div>
            </div>
          </div>
          <div class="col-1">
            <q-btn
              @click="removeTitle(index)"
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
        @click="addTitles(!!Titles && Titles.length + 1)"
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
  name: "links",
  data() {
    return {
      Titles: []
    };
  },
  methods: {
    onInput(index) {
      if (!!this.Titles[index].name && !!this.Titles[index].price) {
        this.$emit("update:cost", this.Titles);
      }
    },
    addTitles(index) {
      this.Titles.push({
        id: index.toString(),
        name: "",
        price: ""
      });
      this.$emit("update:cost", this.Titles);
    },
    removeTitle(index) {
      this.Titles.splice(index, 1);
    }
  }
};
</script>

<style></style>
