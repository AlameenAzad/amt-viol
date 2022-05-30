<template>
  <div class="q-mt-lg q-mb-lg">
    <q-tabs
      v-if="isInPage"
      v-model="tab"
      align="justify"
      indicator-color="transparent"
      class="q-mb-lg text-black"
      active-bg-color="yellow"
      no-caps
    >
      <q-tab class="q-pa-lg q-mr-lg radius-10 customBorder" name="projectIdeas">
        <p class="font-20 no-margin">Project Ideas</p>
      </q-tab>
      <q-tab class="q-pa-lg q-mr-lg radius-10 customBorder" name="fundings">
        <p class="font-20 no-margin">Fundings</p>
      </q-tab>
      <q-tab
        class="q-pa-lg radius-10 customBorder"
        name="implementationChecklist"
      >
        <p class="font-20 no-margin">Implementation Checklist</p>
      </q-tab>
    </q-tabs>
    <q-table
      class="radius-20 shadow-1"
      :data="apiData"
      :columns="columns"
      row-key="name"
      hide-bottom
      :hide-header="!isInPage"
      :visible-columns="isInPage ? visibleColumns : ['title']"
      :filter="filter"
      :pagination="{
        rowsPerPage: 0
      }"
    >
      <template v-slot:top-left>
        <!-- Remove tableSearchInput -->
        <q-input
          borderless
          outlined
          class="no-shadow tableSearchInput"
          debounce="300"
          v-model="filter"
          dense
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon color="blue-5" name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-right>
        <q-btn
          color="blue"
          icon="add"
          unelevated
          filled
          class="mr-0 radius-6 text-weight-600"
          no-caps
          @click="goToPage(tab)"
        >
          <p class="q-mb-none q-mx-md q-my-sm">
            {{
              tab == "projectIdeas"
                ? "Create project ideas"
                : tab == "fundings"
                ? "Create fundings"
                : "Create Implementation checklist"
            }}
          </p>
        </q-btn>
      </template>
      <template v-slot:top v-if="!isInPage">
        <div class="row full-width">
          <div class="col-12">
            <p class="font-24">
              My Data
              <span
                class="font-16 float-right text-blue text-underline text-weight-600 cursor-pointer"
                @click="$router.push({ path: '/user/data' })"
              >
                Show my Documents
              </span>
            </p>
          </div>
          <div class="col-12">
            <q-tabs
              v-model="tab"
              align="justify"
              indicator-color="transparent"
              class="q-mb-lg text-black"
              active-bg-color="yellow"
              no-caps
              dense
            >
              <q-tab class="q-mr-lg radius-6 customBorder" name="projectIdeas">
                <p class="font-14 text-weight-600 no-margin">Project Ideas</p>
              </q-tab>
              <q-tab class="q-mr-lg radius-6 customBorder" name="fundings">
                <p class="font-14 text-weight-600 no-margin">Fundings</p>
              </q-tab>
              <q-tab
                class="q-mr-lg radius-6 customBorder"
                name="implementationChecklist"
              >
                <p class="font-14 text-weight-600 no-margin">
                  Implementation Checklist
                </p>
              </q-tab>
            </q-tabs>
          </div>
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
                        View
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
                        Edit
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
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        Bookmark
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="star_rate"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        Archive
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="inventory"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="deleteItem(props.row)"
                  >
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        Delete
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
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  name: "dataOverview",
  data() {
    return {
      tab: "projectIdeas",
      filter: "",
      visibleColumns: [
        "title",
        "categories",
        "status",
        "carbs",
        "plannedStart",
        "plannedEnd"
      ],
      projectCols: [
        {
          name: "title",
          label: "Title",
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: "Categories",
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            "No Categories",
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          align: "left",
          field: row =>
            row.published === true
              ? "Published"
              : row.published === false
              ? "Draft"
              : "Status Unavailable",
          sortable: true
        }
      ],
      fundingCols: [
        {
          name: "title",
          label: "Title",
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: "Categories",
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            "No Categories",
          sortable: true
        },
        {
          name: "plannedStart",
          label: "Planned Start",
          align: "left",
          field: row => this.dateFormatter(row.plannedStart),
          sortable: true
        },
        {
          name: "plannedEnd",
          label: "Planned End",
          align: "left",
          field: row => this.dateFormatter(row.plannedEnd),
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          align: "left",
          field: row =>
            row.published === true
              ? "Published"
              : row.published === false
              ? "Draft"
              : "Status Unavailable",
          sortable: true
        }
      ],
      checklistCols: [
        {
          name: "title",
          label: "Title",
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: "Categories",
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            "No Categories",
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          align: "left",
          field: row =>
            row.published === true
              ? "Published"
              : row.published === false
              ? "Draft"
              : "Status Unavailable",
          sortable: true
        }
      ],
      viewIsLoading: false,
      editIsLoading: false,
      deleteIsLoading: false
    };
  },
  methods: {
    dateFormatter(val) {
      if (!!val) {
        return date.formatDate(new Date(val), "DD.MM.YYYY");
      } else {
        return "No Date";
      }
    },
    async view(row) {
      if (this.tab === "projectIdeas") {
        this.viewIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("project/viewProject", {
          id: id
        });
        this.viewIsLoading = false;
      } else if (this.tab === "fundings") {
        this.viewIsLoading = true;
        const id = JSON.parse(JSON.stringify(row && row.id));
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        this.viewIsLoading = false;
        this.$router.push({ path: `/user/newFunding/${id}` });
      }
    },
    async editItem(row) {
      if (this.tab === "projectIdeas") {
        this.editIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("project/editProject", {
          id: id
        });
        this.editIsLoading = false;
      } else if (this.tab === "fundings") {
        this.editIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        this.editIsLoading = false;
        this.$router.push({ path: `/user/newFunding/edit/${id}` });
      }
    },
    async deleteItem(row) {
      if (this.tab === "projectIdeas") {
        this.deleteIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("project/deleteProjectIdea", {
          id: id
        });
        this.deleteIsLoading = false;
      } else if (this.tab === "fundings") {
        this.deleteIsLoading = true;
        const id = row && row.id;
        await this.$store.dispatch("funding/deleteFunding", {
          id: id
        });
        this.deleteIsLoading = false;
      }
    },
    goToPage(page) {
      if (page === "projectIdeas") {
        this.$store.commit("project/setSpecificProject", null);
        this.$router.push({ path: "/user/newProjectIdea" });
      } else if (page === "fundings") {
        this.$store.commit("funding/setSpecificFunding", null);
        this.$router.push({ path: "/user/newFunding" });
      }
    },
    getData(tab) {
      if (tab === "projectIdeas") {
        this.$store.dispatch("project/getProjectIdeas");
        this.$store.commit("project/setSpecificProject", null);
      } else if (tab == "fundings") {
        this.$store.dispatch("funding/getFundings");
        this.$store.commit("funding/setSpecificFunding", null);
      } else {
        this.$store.dispatch("implementationChecklist/getChecklists");
        // TODO change this
        // this.$store.commit("project/setSpecificProject", null);
      }
    }
  },
  watch: {
    tab(val) {
      if (val === "projectIdeas") {
        this.getData("projectIdeas");
      } else if (val === "fundings") {
        this.getData("fundings");
      } else {
        // TODO change this
        this.getData("implementationChecklist");
      }
    }
  },
  computed: {
    isInPage() {
      return this.$router.currentRoute.fullPath == "/user/data";
    },
    columns() {
      return this.tab == "projectIdeas"
        ? this.projectCols
        : this.tab == "fundings"
        ? this.fundingCols
        : this.checklistCols;
    },
    apiData() {
      return this.tab == "projectIdeas"
        ? !!this.$store.state.project.projects &&
            this.$store.state.project.projects
        : this.tab == "fundings"
        ? !!this.$store.state.funding.fundings &&
          this.$store.state.funding.fundings
        : !!this.$store.state.implementationChecklist.checklists &&
          this.$store.state.implementationChecklist.checklists;
    }
  },
  mounted() {
    this.getData(this.tab);
  }
};
</script>

<style></style>
