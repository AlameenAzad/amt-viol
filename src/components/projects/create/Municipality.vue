<template>
  <div>
    <q-select
      outlined
      dense
      v-model="model"
      :options="administrations"
      options-selected-class="text-primary"
      class="no-shadow input-radius-6"
      @input="onSelect"
      :rules="[val => !!val || 'Field is required']"
    >
      <template v-slot:selected>
        <template v-if="model">
          <span>
            {{ model.title }}
          </span>
        </template>
        <template v-else>
          <span class="text-grey">
            Select Administration
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
  name: "municipalitySelect",
  data() {
    return {
      model: ""
    };
  },
  methods: {
    onSelect(value) {
      const municipality = {
        id: value.id
      };
      this.$emit("update:municipality", municipality);
    }
  },
  computed: {
    administrations() {
      return this.$store.state.municipality.municipalities;
    }
  }
};
</script>

<style></style>
