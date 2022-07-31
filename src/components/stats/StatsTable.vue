<template>
  <div class="q-my-lg">
    <q-table class="radius-20 shadow-1 pagination-no-shadow" :class="expanded ? 'yellowBg' : ''" :data="data"
      :columns="columns" row-key="name" :hide-header="!isInPage" :filter="filter" :filter-method="filterTable"
      :pagination="{
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: isInPage ? 50 : 5
      }">
      <template v-slot:top>
        <div class="col-12">
          <q-expansion-item header-class="no-padding items-center" expand-icon-class="hidden" v-model="expanded"
            expand-icon-toggle>
            <template v-slot:header>
              <div v-if="isInPage" class="col-12 col-md-4">
                <q-input clearable borderless outlined class="bg-white input-radius-6 no-shadow q-mb-sm q-mt-sm"
                  v-model="search" placeholder="Search" dense>
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <q-space />
              <div class="col-md-4 text-right">
                <q-btn @click="expanded = !expanded" icon="filter_alt" color="primary" flat round>
                </q-btn>
              </div>
            </template>
            <div class="row q-px-xs q-mt-md q-col-gutter-x-lg">
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.type") }}
                </p>
                <q-select clearable class="no-shadow q-mb-lg input-radius-4" color="primary" bg-color="white"
                  placeholder="Search" filled :options="typeOptions" v-model="type">
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.categories") }}
                </p>
                <q-select clearable class="no-shadow q-mb-lg input-radius-4" color="primary" bg-color="white"
                  placeholder="Search" filled :options="categoryOptions" v-model="category">
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.tags/keywords") }}
                </p>
                <q-select clearable class="no-shadow q-mb-lg input-radius-4" color="primary" bg-color="white"
                  placeholder="Search" filled :options="tagKeywordsOptions" v-model="tagsKeywords">
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.projectCoordinator") }}
                </p>
                <q-select clearable class="no-shadow q-mb-lg input-radius-4" color="primary" bg-color="white"
                  placeholder="Search" filled :options="projectCoordinatorOptions" v-model="projectCoordinator">
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.publishDate") }}
                </p>
                <q-input clearable filled v-model="publishDateStart" class="no-shadow q-mb-lg input-radius-4"
                  color="primary" bg-color="white" :placeholder="$t('From')">
                  <template v-slot:append>
                    <q-icon name=" event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="publishDateStart" mask="DD.MM.YYYY" first-day-of-week="1">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-3 q-mt-lg">
                <p class="text-black q-mb-xs font-16"></p>
                <q-input clearable filled v-model="publishDateEnd" class="no-shadow q-mb-lg input-radius-4"
                  color="primary" bg-color="white" :placeholder="$t('Until')">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="publishDateEnd" mask="DD.MM.YYYY" first-day-of-week="1">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.endDate") }}
                </p>
                <q-input clearable filled v-model="endDateStart" class="no-shadow q-mb-lg input-radius-4"
                  color="primary" bg-color="white" :placeholder="$t('From')">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="endDateStart" mask="DD.MM.YYYY" first-day-of-week="1">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-3 q-mt-lg">
                <p class="text-black q-mb-xs font-16"></p>
                <q-input clearable filled v-model="endDateEnd" class="no-shadow q-mb-lg input-radius-4" color="primary"
                  bg-color="white" :placeholder="$t('Until')">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="endDateEnd" mask="DD.MM.YYYY" first-day-of-week="1">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-expansion-item>
        </div>
      </template>
      <template v-slot:header="props">
        <q-tr class="tableHeader" :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" class="font-14">
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width v-for="col in props.cols" :key="col.name" :props="props" class="font-14">
            {{ col.value }}
          </q-td>
          <q-td class="text-right" auto-width>
            <q-btn size="md" color="primary" round flat dense icon="more_vert">
              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 140px">
                  <q-item clickable @click="view(props.row)">
                    <q-item-section><span class="text-right font-14">
                        {{ $t("statsTable.view") }}
                        <q-icon v-if="!viewIsLoading" size="sm" class="text-blue" name="visibility" />
                        <q-spinner v-else color="primary" size="sm" :thickness="2" />
                      </span></q-item-section>
                  </q-item>

                  <q-item clickable @click="editItem(props.row)">
                    <q-item-section><span class="text-right font-14">
                        {{ $t("statsTable.edit") }}

                        <q-icon v-if="!editIsLoading" size="sm" class="text-blue" name="edit" />
                        <q-spinner v-else color="primary" size="sm" :thickness="2" />
                      </span></q-item-section>
                  </q-item>
                  <q-item clickable @click="publishItem(props.row)">
                    <q-item-section><span class="text-right font-14">
                        {{ $t("statsTable.publish") }}

                        <q-icon v-if="!editIsLoading" size="sm" class="text-blue" name="publish" />
                        <q-spinner v-else color="primary" size="sm" :thickness="2" />
                      </span></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="deleteItem(props.row)">
                    <q-item-section><span class="text-right font-14 text-red">
                        {{ $t("statsTable.delete") }}

                        <q-icon v-if="!deleteIsLoading" size="sm" class="text-red" name="delete" />
                        <q-spinner v-else color="red" size="sm" :thickness="2" />
                      </span></q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <DeleteDialog :id="itemId" :tab="tab" :dialogState="deleteDialog" @update="deleteDone()" />
  </div>
</template>

<script>
import { dateFormatter } from "src/boot/dateFormatter";
import DeleteDialog from "components/data/DeleteDialog.vue";
export default {
  name: "StatsTable",
  components: {
    DeleteDialog
  },
  data() {
    return {
      expanded: false,
      search: "",
      type: "",
      category: "",
      tagsKeywords: "",
      projectCoordinator: "",
      itemId: null,
      tab: null,
      publishDateStart: "",
      publishDateEnd: "",
      endDateStart: "",
      endDateEnd: "",
      data: [],
      viewIsLoading: false,
      editIsLoading: false,
      deleteIsLoading: false,
      deleteDialog: false,
      statsData: {
        stats: {},
        table: {}
      }
    };
  },
  methods: {
    dateFormatter,
    // TODO need to refactor this function.
    filterTable(rows, terms) {
      let search = terms.name ? terms.name.toLowerCase() : "";
      let category = terms.category ? terms.category : "";
      let type = terms.type ? terms.type : "";
      let tagsKeywords = terms.tagsKeywords ? terms.tagsKeywords : "";
      let projectCoordinator = terms.projectCoordinator
        ? terms.projectCoordinator
        : "";
      let publishDateStart = terms.publishDateStart
        ? terms.publishDateStart
        : "";
      let publishDateEnd = terms.publishDateEnd ? terms.publishDateEnd : "";
      let endDateStart = terms.endDateStart ? terms.endDateStart : "";
      let endDateEnd = terms.endDateEnd ? terms.endDateEnd : "";
      let filteredRows = rows;
      if (!!search) {
        filteredRows = filteredRows.filter(row => {
          return row.title.toLowerCase().includes(search);
        });
      }
      if (!!type) {
        filteredRows = filteredRows.filter(row => {
          return row.type.toLowerCase() === type.toLowerCase();
        });
      }
      if (!!category) {
        filteredRows = filteredRows.filter(row => {
          return row.categories.find(
            cat => cat.title.toLowerCase() === category.toLowerCase()
          );
        });
      }
      if (!!tagsKeywords) {
        filteredRows = filteredRows.filter(row => {
          return row.tags.find(
            tag => tag.title.toLowerCase() === tagsKeywords.toLowerCase()
          );
        });
      }
      if (!!projectCoordinator) {
        filteredRows = filteredRows.filter(row => {
          return (
            row.owner &&
            row.owner.username.toLowerCase() ===
              projectCoordinator.toLowerCase()
          );
        });
      }
      if (!!publishDateStart || !!publishDateEnd) {
        const publishDateStartParts = publishDateStart.split(".");
        const startDate = new Date(
          publishDateStartParts[2],
          publishDateStartParts[1] - 1,
          publishDateStartParts[0]
        );
        const publishDateEndParts = publishDateEnd.split(".");
        const endDate = new Date(
          publishDateEndParts[2],
          publishDateEndParts[1] - 1,
          publishDateEndParts[0]
        );
        filteredRows = rows.filter(row => {
          if (!!row.plannedStart && !!row.plannedEnd) {
            if (
              endDate instanceof Date &&
              !isNaN(endDate) &&
              startDate instanceof Date &&
              !isNaN(startDate)
            ) {
              return (
                new Date(row.plannedStart) >= startDate &&
                new Date(row.plannedStart) <= endDate
              );
            } else if (endDate instanceof Date && !isNaN(endDate)) {
              return new Date(row.plannedStart) <= endDate;
            } else if (startDate instanceof Date && !isNaN(startDate)) {
              return new Date(row.plannedStart) >= startDate;
            }
          }
        });
      }
      if (!!endDateStart || !!endDateEnd) {
        const endDateStartParts = endDateStart.split(".");
        const startDate = new Date(
          endDateStartParts[2],
          endDateStartParts[1] - 1,
          endDateStartParts[0]
        );
        const endDateEndParts = endDateEnd.split(".");
        const endDate = new Date(
          endDateEndParts[2],
          endDateEndParts[1] - 1,
          endDateEndParts[0]
        );
        filteredRows = rows.filter(row => {
          if (!!row.plannedStart && !!row.plannedEnd) {
            if (
              endDate instanceof Date &&
              !isNaN(endDate) &&
              startDate instanceof Date &&
              !isNaN(startDate)
            ) {
              return (
                new Date(row.plannedEnd) >= startDate &&
                new Date(row.plannedEnd) <= endDate
              );
            } else if (endDate instanceof Date && !isNaN(endDate)) {
              return new Date(row.plannedEnd) <= endDate;
            } else if (startDate instanceof Date && !isNaN(startDate)) {
              return new Date(row.plannedEnd) >= startDate;
            }
          }
        });
      }
      return filteredRows;
    },
    prepTableData() {
      var data = [];
      var table = this.statsData.table;
      for (const item in table) {
        if (table.hasOwnProperty(item)) {
          if (item === "fundings") {
            table[item].forEach(funding => {
              data.push({ ...funding, type: "funding" });
            });
          } else if (item === "projects") {
            table[item].forEach(funding => {
              data.push({ ...funding, type: "project" });
            });
          } else if (item === "checklists") {
            table[item].forEach(funding => {
              data.push({ ...funding, type: "checklist" });
            });
          }
          this.data = data;
        }
      }
    },
    async view(row) {
      if (row.type === "project") {
        this.viewIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("project/viewProject", {
          id: id
        });
        this.viewIsLoading = false;
      } else if (row.type === "funding") {
        this.viewIsLoading = true;
        const id = JSON.parse(JSON.stringify(row && row.id));
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        this.viewIsLoading = false;
        this.$router.push({ path: `/user/newFunding/${id}` });
      } else {
        this.viewIsLoading = true;
        const id = JSON.parse(JSON.stringify(row && row.id));
        await this.$store.dispatch(
          "implementationChecklist/getSpecificChecklist",
          {
            id: id
          }
        );
        this.viewIsLoading = false;
        this.$router.push({ path: `/user/newChecklist/${id}` });
      }
    },
    async editItem(row) {
      if (row.type === "project") {
        this.editIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("project/editProject", {
          id: id
        });
        this.editIsLoading = false;
      } else if (row.type === "funding") {
        this.editIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        this.editIsLoading = false;
        this.$router.push({ path: `/user/newFunding/edit/${id}` });
      } else {
        this.editIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch(
          "implementationChecklist/getSpecificChecklist",
          {
            id: id
          }
        );
        this.editIsLoading = false;
        this.$router.push({ path: `/user/newChecklist/edit/${id}` });
      }
    },
    async deleteItem(row) {
      if (row.type === "project") {
        this.tab = "projectIdeas";
        this.itemId = row && row.id;
        this.deleteDialog = true;
      } else if (row.type === "funding") {
        this.tab = "fundings";
        this.itemId = row && row.id;
        this.deleteDialog = true;
      } else {
        this.tab = "implementationChecklist";
        this.itemId = row && row.id;
        this.deleteDialog = true;
      }
    },
    getArchivedStats() {
      this.$api.get("/api/stats").then(response => {
        this.statsData = response.data;
        this.$emit("stats", this.statsData.stats);
        this.prepTableData();
      });
    },
    deleteDone($event) {
      console.log("deleteDone", $event);
      this.deleteDialog = $event;
      this.itemId = null;
      this.tab = null;
      this.getArchivedStats();
    },
    publishItem(row) {
      var data = {
        data: {
          archived: false
        }
      };
      if (row.type === "project") {
        this.$api.put(`/api/projects/${row.id}`, data).then(response => {
          this.getArchivedStats();
        });
      } else if (row.type === "funding") {
        this.$api.put(`/api/fundings/${row.id}`, data).then(response => {
          this.getArchivedStats();
        });
      } else {
        this.$api.put(`/api/checklists/${row.id}`, data).then(response => {
          this.getArchivedStats();
        });
      }
    }
  },
  computed: {
    typeOptions() {
      let vals = this.data.map(item => item.type);
      return vals;
    },
    categoryOptions() {
      const categories = [];
      this.data.map(item =>
        item.categories.map(cat =>
          !!cat.title ? categories.push(cat.title) : null
        )
      );
      return [...new Set(categories)];
    },
    tagKeywordsOptions() {
      const tagsKeywords = [];
      this.data.map(
        item =>
          !!item.tags &&
          item.tags.map(tag =>
            !!tag.title ? tagsKeywords.push(tag.title) : null
          )
      );
      return [...new Set(tagsKeywords)];
    },
    projectCoordinatorOptions() {
      const users = [];
      this.data.map(item =>
        !!item.owner && !!item.owner.username
          ? users.push(item.owner.username)
          : null
      );
      return [...new Set(users)];
    },
    isInPage() {
      // TODO this solution might be temporary
      // return this.$router.currentRoute.fullPath == "/stats";
      return true;
    },
    filter() {
      // return object that contains all v-models. This will be passed to the filter method
      return {
        name: this.search,
        type: this.type,
        category: this.category,
        tagsKeywords: this.tagsKeywords,
        projectCoordinator: this.projectCoordinator,
        publishDateStart: this.publishDateStart,
        publishDateEnd: this.publishDateEnd,
        endDateStart: this.endDateStart,
        endDateEnd: this.endDateEnd
      };
    },
    columns() {
      return [
        {
          name: "id",
          label: "id",
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "title",
          required: true,
          label: this.$t("statsTable.title"),
          align: "left",
          field: "title",
          sortable: true
        },
        {
          name: "type",
          align: "left",
          label: this.$t("statsTable.type"),
          field: row => this.$t(row.type),
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: this.$t("statsTable.categories"),
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            this.$t("NoCategories"),
          sortable: true
        },
        {
          name: "publishDate",
          align: "left",
          label: this.$t("statsTable.publishDate"),
          field: row => dateFormatter(row.plannedStart),
          sortable: true
        },
        {
          name: "endDate",
          align: "left",
          label: this.$t("statsTable.endDate"),
          field: row => dateFormatter(row.plannedEnd),
          sortable: true
        },
        {
          name: "owners",
          align: "left",
          label: this.$t("statsTable.owners"),
          field: row => row.owner && row.owner.username,
          sortable: true
        }
      ];
    }
  },
  mounted() {
    this.getArchivedStats();
  }
};
</script>

<style lang="scss">
// TODO figure out a way to smoothen close transition
.yellowBg .q-table__top {
  background: $yellow-10;
  transition: all 0.2s ease-in-out;
}
</style>
