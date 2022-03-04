<template>
  <q-page>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="font-36 text-weight-600">Document View</h1>
        </div>
        <div class="col-12">
          Document View
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "documentView",
  data() {
    return {};
  },
  mounted() {
    console.log("Documents mounted");
    console.log(this.$route.query);
  }
};
</script>

<style></style>
