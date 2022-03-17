<template>
  <q-page class="q-mx-xl q-mt-lg">
    <div class="row q-col-gutter-md">
      <div class="col-3" v-for="(stat, index) in statistics" :key="index">
        <div class="shadow-2 radius-20 q-pa-md">
          <p class="font-14 text-blue-5 q-mt-xs q-mb-none">{{ stat.title }}</p>
          <p class="font-24 text-weight-bold text-blue">{{ stat.value }}</p>
        </div>
      </div>
    </div>
    <StatsTable />
  </q-page>
</template>

<script>
import StatsTable from "components/stats/StatsTable.vue";
export default {
  name: "index",
  components: {
    StatsTable
  },
  data() {
    return {
      statistics: [
        {
          title: "current funding information",
          value: "1894"
        },
        {
          title: "project ideas",
          value: "2836"
        },
        {
          title: "Implementation checklist",
          value: "2361"
        },
        {
          title: "Administrations / Users",
          value: "48"
        },
        {
          title: "Funding informations - Archive",
          value: "789"
        },
        {
          title: "Enquiries",
          value: "836"
        },
        {
          title: "Watchlists",
          value: "632"
        },
        {
          title: "Administration network",
          value: "438"
        }
      ]
    };
  }
};
</script>

<style lang="sass"></style>
