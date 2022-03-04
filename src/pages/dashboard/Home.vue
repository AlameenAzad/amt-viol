<template>
  <q-page class="q-mx-xl q-mt-lg">
    <q-btn
      color="blue"
      icon="search"
      unelevated
      class="mr-0 radius-6 text-weight-600 float-left"
      no-caps
    >
      <p class="q-mb-none q-mx-md q-my-sm">Search documents</p>
    </q-btn>
    <div class="text-right">
      <q-btn
        color="blue"
        icon="add"
        unelevated
        outline
        class="mr-0 radius-6 text-weight-600"
        no-caps
      >
        <p class="q-mb-none q-mx-md q-my-sm">Implementation checklist</p>
      </q-btn>
      <q-btn
        color="blue"
        icon="add"
        unelevated
        outline
        class="mr-0 radius-6 q-mx-md text-weight-600"
        no-caps
      >
        <p class="q-mb-none q-mx-md q-my-sm">fundings</p>
      </q-btn>
      <q-btn
        color="blue"
        icon="add"
        unelevated
        outline
        class="mr-0 radius-6 text-weight-600"
        no-caps
      >
        <p class="q-mb-none q-mx-md q-my-sm">Project ideas</p>
      </q-btn>
    </div>
    <div>
      <fundingInfo />
    </div>
  </q-page>
</template>

<script>
import fundingInfo from "components/funding/info.vue";
export default {
  name: "index",
  components: {
    fundingInfo
  },
  data() {
    return {};
  }
};
</script>
