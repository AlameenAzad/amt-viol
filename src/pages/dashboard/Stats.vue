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
    <StatsTable v-if="statsData.table.projects" :table="statsData.table" />
  </q-page>
</template>

<script>
import StatsTable from "components/stats/StatsTable.vue";
export default {
  name: "stats",
  data() {
    return {
      statsData: {
        stats: {},
        table: {}
      }
    };
  },
  components: {
    StatsTable
  },
  computed: {
    statistics() {
      return [
        {
          title: this.$t("Statistics.currentFunding"),
          value: this.statsData.stats.fundings
        },
        {
          title: this.$t("Statistics.projectIdeas"),
          value: this.statsData.stats.projects
        },
        {
          title: this.$t("Statistics.implementationChecklist"),
          value: this.statsData.stats.checklists
        },
        {
          title: this.$t("Statistics.administration/user"),
          value: this.statsData.stats.users
        },
        {
          title: this.$t("Statistics.fundinginfoArchive"),
          value: this.statsData.stats.archivedFundings
        },
        {
          title: this.$t("Statistics.projectinfoArchive"),
          value: this.statsData.stats.archivedProjects
        },
        {
          title: this.$t("Statistics.watchList"),
          value: this.statsData.stats.watchlists
        },
        {
          title: this.$t("Statistics.municipalities"),
          value: this.statsData.stats.municipalities
        }
      ];
    }
  },
  methods: {
    getArchivedStats() {
      this.$api.get("/api/stats").then(response => {
        this.statsData = response.data;
      });
    }
  },
  created() {
    this.getArchivedStats();
  }
};
</script>

<style lang="sass"></style>
