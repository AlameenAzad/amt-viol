<template>
  <div>
    <q-select clearable outlined dense v-model="model" :options="options" use-input
          hide-selected
          fill-input
          input-debounce="0" @filter="filterFn" behavior="menu"
          :label="$t('personalData.location')"
      options-selected-class="text-primary text-weight-600" class="no-shadow input-radius-6" @input="onSelect">
      <template v-slot:selected>
        <template v-if="model">
          <span>
            {{ model }}
          </span>
        </template>
        <template v-else>
          <span class="text-grey">
            {{ $t('personalData.location') }}
          </span>
        </template>
      </template>
          <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label>{{ scope.opt }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
    </q-select>
  </div>
</template>

<script>
import municipalities from "src/municipalities.json";
export default {
  name: "municipalityCities",
  props: {
    currentMunicipality: null
  },
  data() {
    return {
      model: this.currentMunicipality,
      municipalities: municipalities,
      options: []
    };
  },
  methods: {
    onSelect(value) {
      const city = value;
      this.model = city;
      this.$emit("update:city", city);
    },
    filterFn(input, update) {
      if (input === '') {
        update(() => {
          this.options = this.municipalities;
        })
        return;
      }
      update(() => {
        const search = input.toLowerCase();
        this.options = this.options.filter(v => v.toLowerCase().indexOf(search) > -1)
      })
    },
  },
  mounted() {
    this.options = this.municipalities;
  }
};
</script>

<style></style>
