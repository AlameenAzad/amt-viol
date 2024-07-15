<template>
  <div class="q-mb-lg">
    <q-card class="shadow-1 radius-20 q-mb-md q-pa-none">
      <q-card-section>
        <q-input
          borderless
          dense
          placeholder="Search"
          clearable
          v-model="searchText"
          class="no-shadow input-radius-6"
          @input="searchDiscussion"
          debounce="500"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="blue-5" />
          </template>
          <template v-slot:append>
            <q-btn
              color="primary"
              class="shadow-0 q-ml-md"
              style="border-radius: 10px"
              icon="add"
              padding="10px"
              to="/discuss/create"
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </div>
</template>

<script js>
export default {
  name: "discussSearch",
  data() {
    return {
      searchText: "",
    };
  },
  computed: {},
  methods: {
    searchDiscussion() {
      this.$store.dispatch("forum/getDiscussions", this.searchText);
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
