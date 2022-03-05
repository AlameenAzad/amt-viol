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
    <div class="row q-gutter-md q-mb-lg">
      <div class="col">
        <dataOverview />
      </div>
      <div class="col">
        <watchlist />
      </div>
    </div>
    <div>
      <network />
    </div>
  </q-page>
</template>

<script>
import fundingInfo from "components/funding/info.vue";
import dataOverview from "components/data/overview.vue";
import watchlist from "components/watchlist/overview.vue";
import network from "components/network/overview.vue";
export default {
  name: "index",
  components: {
    fundingInfo,
    dataOverview,
    watchlist,
    network
  },
  data() {
    return {};
  }
};
</script>
