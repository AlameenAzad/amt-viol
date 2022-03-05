<template>
  <q-page class="bg-blue-1">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="font-36 text-weight-600">Documents</h1>
        </div>
        <div class="col-12 q-mb-xl">
          <p>Search result: X Documents</p>
          <DocumentsTable />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import DocumentsTable from "components/projects/search/DocumentsTable.vue";
export default {
  name: "documents",
  components: {
    DocumentsTable
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
