<template>
  <div class="q-my-lg">
    <q-table
      class="radius-20 shadow-1 pagination-no-shadow"
      :class="expanded ? 'yellowBg' : ''"
      :data="data"
      :columns="columns"
      row-key="name"
      :hide-header="!isInPage"
      :visible-columns="visibleColumns"
      :filter="filter"
      :filter-method="filterTable"
      :pagination="{
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: isInPage ? 50 : 5
      }"
      :rows-per-page-label="$t('Records per page')"
    >
      <template v-slot:top>
        <div class="col-12">
          <q-expansion-item
            header-class="no-padding items-center"
            expand-icon-class="hidden"
            v-model="expanded"
            expand-icon-toggle
          >
            <template v-slot:header>
              <div v-if="isInPage" class="col-8 col-md-4">
                <q-input
                  clearable
                  borderless
                  outlined
                  class="bg-white input-radius-6 no-shadow q-mb-sm q-mt-sm"
                  v-model="search"
                  placeholder="Search"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <q-space />
              <div class="col-md-4 text-right">
                <q-btn
                  no-caps
                  @click="expanded = !expanded"
                  icon="filter_alt"
                  color="primary"
                  class="radius-6"
                  flat
                  label="Filter"
                >
                </q-btn>
              </div>
            </template>
            <div class="row q-px-xs q-mt-md q-col-gutter-x-lg">
              <div class="col-6 col-md-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.type") }}
                </p>
                <q-select
                  clearable
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  label="Search"
                  multiple
                  filled
                  :options="typeOptions"
                  v-model="type"
                >
                </q-select>
              </div>
              <div class="col-6 col-md-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.categories") }}
                </p>
                <q-select
                  clearable
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  label="Search"
                  multiple
                  filled
                  :options="categoryOptions"
                  v-model="category"
                >
                </q-select>
              </div>
              <div class="col-6 col-md-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("Tags") }}
                </p>
                <q-select
                  clearable
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  label="Search"
                  multiple
                  filled
                  :options="tagKeywordsOptions"
                  v-model="tagsKeywords"
                >
                </q-select>
              </div>
              <div class="col-6 col-md-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.projectCoordinator") }}
                </p>
                <q-select
                  clearable
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  label="Search"
                  multiple
                  filled
                  :options="projectCoordinatorOptions"
                  v-model="projectCoordinator"
                >
                </q-select>
              </div>
              <div class="col-6 col-md-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.publishDate") }}
                </p>
                <q-input
                  clearable
                  filled
                  v-model="publishDateStart"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  :placeholder="$t('From')"
                  @click="$refs.publishDateStart.show()"
                >
                  <template v-slot:append>
                    <q-icon name=" event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="publishDateStart"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          @input="$refs.publishDateStart.hide()"
                          v-model="publishDateStart"
                          mask="DD.MM.YYYY"
                          first-day-of-week="1"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-3 q-mt-lg">
                <p class="text-black q-mb-xs font-16"></p>
                <q-input
                  clearable
                  filled
                  :disable="!publishDateStart"
                  v-model="publishDateEnd"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  :placeholder="$t('Until')"
                  @click="$refs.publishDateEnd.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="publishDateEnd"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          @input="$refs.publishDateEnd.hide()"
                          v-model="publishDateEnd"
                          mask="DD.MM.YYYY"
                          first-day-of-week="1"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.endDate") }}
                </p>
                <q-input
                  clearable
                  filled
                  v-model="endDateStart"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  :placeholder="$t('From')"
                  @click="$refs.endDateStart.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="endDateStart"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          @input="$refs.endDateStart.hide()"
                          v-model="endDateStart"
                          mask="DD.MM.YYYY"
                          first-day-of-week="1"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-3 q-mt-lg">
                <p class="text-black q-mb-xs font-16"></p>
                <q-input
                  clearable
                  filled
                  :disable="!endDateStart"
                  v-model="endDateEnd"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  :placeholder="$t('Until')"
                  @click="$refs.endDateEnd.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="endDateEnd"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          @input="$refs.endDateEnd.hide()"
                          v-model="endDateEnd"
                          mask="DD.MM.YYYY"
                          first-day-of-week="1"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
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
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="font-14"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            auto-width
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="font-14"
          >
            {{ col.value }}
          </q-td>
          <q-td class="text-right" auto-width>
            <q-btn size="md" color="primary" round flat dense icon="more_vert">
              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 140px">
                  <q-item clickable @click="view(props.row)">
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("statsTable.view") }}
                        <q-icon
                          v-if="!viewIsLoading"
                          size="sm"
                          class="text-blue"
                          name="visibility"
                        />
                        <q-spinner
                          v-else
                          color="primary"
                          size="sm"
                          :thickness="2"
                        /> </span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable @click="editItem(props.row)">
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("statsTable.edit") }}

                        <q-icon
                          v-if="!editIsLoading"
                          size="sm"
                          class="text-blue"
                          name="edit"
                        />
                        <q-spinner
                          v-else
                          color="primary"
                          size="sm"
                          :thickness="2"
                        /> </span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable @click="publishItem(props.row)">
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("statsTable.publish") }}

                        <q-icon
                          v-if="!editIsLoading"
                          size="sm"
                          class="text-blue"
                          name="publish"
                        />
                        <q-spinner
                          v-else
                          color="primary"
                          size="sm"
                          :thickness="2"
                        /> </span
                    ></q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    v-close-popup
                    @click="deleteItem(props.row)"
                  >
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        {{ $t("statsTable.delete") }}

                        <q-icon
                          v-if="!deleteIsLoading"
                          size="sm"
                          class="text-red"
                          name="delete"
                        />
                        <q-spinner
                          v-else
                          color="red"
                          size="sm"
                          :thickness="2"
                        /> </span
                    ></q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <DeleteDialog
      :id="itemId"
      :tab="tab"
      :dialogState="deleteDialog"
      @update="deleteDone()"
    />
    <RequestAccessDialog
      :id="itemId"
      :tab="tab"
      :type="itemType"
      :dialogState="requestDialog"
      @update="(requestDialog = $event), (itemId = null), (itemType = null)"
    />
  </div>
</template>

<script>
import { dateFormatter } from "src/boot/dateFormatter";
import DeleteDialog from "components/data/DeleteDialog.vue";
import RequestAccessDialog from "components/data/RequestAccessDialog.vue";
export default {
  name: "StatsTable",
  components: {
    DeleteDialog,
    RequestAccessDialog
  },
  data() {
    return {
      expanded: false,
      search: "",
      type: null,
      category: null,
      tagsKeywords: null,
      projectCoordinator: null,
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
      requestDialog: false,
      itemType: null,
      statsData: {
        stats: {},
        table: {}
      },
      visibleColumns: [
        "title",
        "type",
        "categories",
        "publishDate",
        "endDate",
        "owners"
      ]
    };
  },
  methods: {
    dateFormatter,
    // TODO need to refactor this function.
    filterTable(rows, terms) {
      let search = terms.name ? terms.name.toLowerCase() : "";
      let category = terms.category ? terms.category : null;
      let type = terms.type ? terms.type : null;
      let tagsKeywords = terms.tagsKeywords ? terms.tagsKeywords : null;
      let projectCoordinator = terms.projectCoordinator
        ? terms.projectCoordinator
        : null;
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

      if (!!type && type.length > 0) {
        filteredRows = filteredRows.filter(row => {
          return type.includes(row.type.toLowerCase());
        });
      }
      if (!!category && category.length > 0) {
        filteredRows = filteredRows.filter(row => {
          return row.categories.find(cat => category.includes(cat.title));
        });
      }
      if (!!tagsKeywords && tagsKeywords.length > 0) {
        filteredRows = filteredRows.filter(row => {
          return row.tags.find(tag => tagsKeywords.includes(tag.title));
        });
      }
      if (!!projectCoordinator && projectCoordinator.length > 0) {
        filteredRows = filteredRows.filter(row => {
          return projectCoordinator.includes(!!row.owner && row.owner.username);
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
      const id = row && row.id;
      this.itemId = row && row.id;
      this.viewIsLoading = true;
      if (row.type === "project") {
        this.tab = "projectIdeas";
        if (
          row.visibility === "listed only" &&
          (!!row.owner && row.owner.id) !==
            (!!this.loggedInUser && this.loggedInUser.id) &&
          !this.isAdmin
        ) {
          const hasReaderAccess =
            !!row.readers &&
            row.readers.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          const hasEditorAccess =
            !!row.editors &&
            row.editors.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          if (hasReaderAccess.length > 0 || hasEditorAccess.length > 0) {
            this.$router.push({ path: `/user/newProjectIdea/${id}` });
          } else {
            this.itemId = row && row.id;
            this.itemType = "view";
            this.requestDialog = true;
          }
        } else {
          this.$router.push({ path: `/user/newProjectIdea/${id}` });
        }
      } else if (row.type === "funding") {
        this.tab = "fundings";
        if (
          row.visibility === "listed only" &&
          (!!row.owner && row.owner.id) !==
            (!!this.loggedInUser && this.loggedInUser.id) &&
          !this.isAdmin
        ) {
          const hasReaderAccess =
            !!row.readers &&
            row.readers.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          const hasEditorAccess =
            !!row.editors &&
            row.editors.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          if (hasReaderAccess.length > 0 || hasEditorAccess.length > 0) {
            this.$router.push({ path: `/user/newFunding/${id}` });
          } else {
            this.itemId = row && row.id;
            this.itemType = "view";
            this.requestDialog = true;
          }
        } else {
          this.$router.push({ path: `/user/newFunding/${id}` });
        }
      } else {
        this.tab = "implementationChecklist";
        if (
          row.visibility === "listed only" &&
          (!!row.owner && row.owner.id) !==
            (!!this.loggedInUser && this.loggedInUser.id) &&
          !this.isAdmin
        ) {
          const hasReaderAccess =
            !!row.readers &&
            row.readers.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          const hasEditorAccess =
            !!row.editors &&
            row.editors.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          if (hasReaderAccess.length > 0 || hasEditorAccess.length > 0) {
            this.$router.push({ path: `/user/newChecklist/${id}` });
          } else {
            this.itemId = row && row.id;
            this.itemType = "view";
            this.requestDialog = true;
          }
        } else {
          this.$router.push({ path: `/user/newChecklist/${id}` });
        }
      }
      this.viewIsLoading = false;
    },
    async editItem(row) {
      console.log("row", row);
      const id = row && row.id;
      this.itemId = row && row.id;
      this.editIsLoading = true;
      if (row.type === "project") {
        this.tab = "projectIdeas";
        if (
          (!!row.owner && row.owner.id) !==
            (!!this.loggedInUser && this.loggedInUser.id) &&
          !this.isAdmin
        ) {
          const hasEditorAccess =
            !!row.editors &&
            row.editors.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          if (hasEditorAccess.length > 0) {
            this.$router.push({ path: `/user/newProjectIdea/edit/${id}` });
          } else {
            this.itemId = row && row.id;
            this.itemType = "edit";
            this.requestDialog = true;
          }
        } else {
          this.$router.push({ path: `/user/newProjectIdea/edit/${id}` });
        }
      } else if (row.type === "funding") {
        this.tab = "fundings";
        if (
          (!!row.owner && row.owner.id) !==
            (!!this.loggedInUser && this.loggedInUser.id) &&
          !this.isAdmin
        ) {
          const hasEditorAccess =
            !!row.editors &&
            row.editors.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          if (hasEditorAccess.length > 0) {
            this.$router.push({ path: `/user/newFunding/edit/${id}` });
          } else {
            this.itemId = row && row.id;
            this.itemType = "edit";
            this.requestDialog = true;
          }
        } else {
          this.$router.push({ path: `/user/newFunding/edit/${id}` });
        }
      } else {
        this.tab = "implementationChecklist";
        if (
          (!!row.owner && row.owner.id) !==
            (!!this.loggedInUser && this.loggedInUser.id) &&
          !this.isAdmin
        ) {
          const hasEditorAccess =
            !!row.editors &&
            row.editors.filter(
              user => user.id === (!!this.loggedInUser && this.loggedInUser.id)
            );
          if (hasEditorAccess.length > 0) {
            this.$router.push({ path: `/user/newChecklist/edit/${id}` });
          } else {
            this.itemId = row && row.id;
            this.itemType = "edit";
            this.requestDialog = true;
          }
        } else {
          this.$router.push({ path: `/user/newChecklist/edit/${id}` });
        }
      }
      this.editIsLoading = false;
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
      return [...new Set(vals)];
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
          sortable: true,
          sort: (a, b, rowA, rowB) => {
            const dateA = new Date(rowA.plannedStart);
            const dateB = new Date(rowB.plannedStart);
            return dateB - dateA;
          }
        },
        {
          name: "endDate",
          align: "left",
          label: this.$t("statsTable.endDate"),
          field: row => dateFormatter(row.plannedEnd),
          sortable: true,
          sort: (a, b, rowA, rowB) => {
            const dateA = new Date(rowA.plannedEnd);
            const dateB = new Date(rowB.plannedEnd);
            return dateB - dateA;
          }
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
