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
  computed: {
    statistics() {
      return [
        {
          title: this.$t("Statistics.currentFunding"),
          value: "1894"
        },
        {
          title: this.$t("Statistics.projectIdeas"),
          value: "2836"
        },
        {
          title: this.$t("Statistics.implementationChecklist"),
          value: "2361"
        },
        {
          title: this.$t("Statistics.administration/user"),
          value: "48"
        },
        {
          title: this.$t("Statistics.fundinginfoArchive"),
          value: "789"
        },
        {
          title: this.$t("Statistics.enquiries"),
          value: "836"
        },
        {
          title: this.$t("Statistics.watchList"),
          value: "632"
        },
        {
          title: this.$t("Statistics.adminNetwork"),
          value: "438"
        }
      ];
    }
  }
};
</script>

<style lang="sass"></style>
