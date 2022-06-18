<template>
  <div class="q-my-lg ">
    <q-tabs
      v-if="!isInPage"
      v-model="tab"
      align="justify"
      indicator-color="transparent"
      class="q-mb-lg text-black"
      active-bg-color="yellow"
      :class="$router.currentRoute.fullPath == '/dashboard' ? 'hidden' : ''"
      no-caps
    >
      <q-tab
        exact
        class="q-py-xs q-mr-lg radius-10 border-yellow"
        :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-sm q-px-lg'"
        name="projectIdeas"
      >
        <p class="font-20 no-margin">{{ $t("myData.projectIdeas") }}</p>
      </q-tab>
      <q-tab
        class="q-mr-lg radius-10 border-yellow"
        :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-sm q-px-lg'"
        name="fundings"
      >
        <p class="font-20 no-margin">{{ $t("myData.fundings") }}</p>
      </q-tab>
      <q-tab
        class=" radius-10 border-yellow"
        :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-sm q-px-lg'"
        name="implementationChecklist"
      >
        <p class="font-20 no-margin">
          {{ $t("myData.implementationChecklist") }}
        </p>
      </q-tab>
    </q-tabs>
    <q-tabs
      v-if="isInPage"
      v-model="tab"
      align="justify"
      indicator-color="transparent"
      class="q-mb-lg text-black"
      active-bg-color="yellow"
      no-caps
    >
      <q-route-tab
        :to="{ query: { tab: 'projectIdeas' } }"
        exact
        replace
        class="q-py-xs q-mr-lg radius-10 border-yellow"
        :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-sm q-px-lg'"
        name="projectIdeas"
      >
        <p class="font-20 no-margin">{{ $t("myData.projectIdeas") }}</p>
      </q-route-tab>
      <q-route-tab
        :to="{ query: { tab: 'fundings' } }"
        exact
        replace
        class="q-mr-lg radius-10 border-yellow"
        :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-sm q-px-lg'"
        name="fundings"
      >
        <p class="font-20 no-margin">{{ $t("myData.fundings") }}</p>
      </q-route-tab>
      <q-route-tab
        :to="{ query: { tab: 'implementationChecklist' } }"
        exact
        replace
        class=" radius-10 border-yellow"
        :class="$q.screen.gt.sm ? 'q-pa-lg' : 'q-pa-sm q-px-lg'"
        name="implementationChecklist"
      >
        <p class="font-20 no-margin">
          {{ $t("myData.implementationChecklist") }}
        </p>
      </q-route-tab>
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
        rowsPerPage: isInPage ? 0 : 5
      }"
    >
      <template v-slot:top>
        <div v-if="!isInPage" class="row full-width">
          <div class="col-12">
            <p class="font-24">
              {{ $t("myDataHome.myData") }}
              <span
                class="font-16 float-right text-blue text-underline text-weight-600 cursor-pointer"
                @click="$router.push({ path: '/user/data?tab=projectIdeas' })"
              >
                {{ $t("myDataHome.showMy") }}
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
              <q-tab class="q-mr-lg radius-6 border-yellow" name="projectIdeas">
                <p class="font-14 text-weight-600 no-margin">
                  {{ $t("myDataHome.projectIdeaBtn") }}
                </p>
              </q-tab>
              <q-tab class="q-mr-lg radius-6 border-yellow" name="fundings">
                <p class="font-14 text-weight-600 no-margin">
                  {{ $t("myDataHome.fundingsBtn") }}
                </p>
              </q-tab>
              <q-tab
                class="q-mr-lg radius-6 border-yellow"
                name="implementationChecklist"
              >
                <p class="font-14 text-weight-600 no-margin">
                  {{ $t("myDataHome.implementationChecklistBtn") }}
                </p>
              </q-tab>
            </q-tabs>
          </div>
        </div>
        <div
          v-if="isInPage"
          class="row full-width justify-between items-center"
        >
          <div class="col-8 col-md-4">
            <q-input
              borderless
              outlined
              class="input-radius-6 no-shadow q-mb-sm q-mt-sm"
              v-model="filter"
              placeholder="Search"
              dense
            >
              <template v-slot:prepend>
                <q-icon color="blue-5" name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-4 col-md-4 text-right">
            <q-btn
              color="blue"
              icon="add"
              unelevated
              :round="$q.screen.lt.md"
              filled
              class="mr-0 text-weight-600 q-mb-sm q-mt-sm"
              :class="$q.screen.gt.sm ? 'radius-6' : ''"
              no-caps
              @click="goToPage(tab)"
            >
              <p v-if="$q.screen.gt.sm" class="q-mb-none q-mx-md q-my-sm">
                {{
                  tab == "projectIdeas"
                    ? $t("myData.createProjectIdea")
                    : tab == "fundings"
                    ? $t("fundingsCol.createFunding")
                    : $t("checkListCols.createImplementationChecklist")
                }}
              </p>
            </q-btn>
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
                        {{ $t("myDataTableOptions.view") }}
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
                        {{ $t("myDataTableOptions.edit") }}

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
                        {{ $t("myDataTableOptions.bookmark") }}

                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="star_rate"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("myDataTableOptions.archive") }}

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
                        {{ $t("myDataTableOptions.delete") }}

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
import { dateFormatter } from "src/boot/dateFormatter";
export default {
  name: "dataOverview",
  data() {
    return {
      tab: this.$router.currentRoute.query.tab || "projectIdeas",
      filter: "",
      visibleColumns: [
        "title",
        "categories",
        "status",
        "carbs",
        "plannedStart",
        "plannedEnd"
      ],
      // projectCols: [
      //   {
      //     name: "title",
      //     label: this.$t("myData.title"),
      //     align: "left",
      //     field: row => row.title,
      //     sortable: true
      //   },
      //   {
      //     name: "categories",
      //     align: "left",
      //     label: this.$t("myData.categories"),
      //     field: row =>
      //       (!!row.categories &&
      //         row.categories.map(category => category.title).join(", ")) ||
      //       "No Categories",
      //     sortable: true
      //   },
      //   {
      //     name: "status",
      //     label: "Status",
      //     align: "left",
      //     field: row =>
      //       row.published === true
      //         ? "Published"
      //         : row.published === false
      //         ? "Draft"
      //         : "Status Unavailable",
      //     sortable: true
      //   }
      // ],
      // fundingCols: [
      //   {
      //     name: "title",
      //     label: "Title",
      //     align: "left",
      //     field: row => row.title,
      //     sortable: true
      //   },
      //   {
      //     name: "categories",
      //     align: "left",
      //     label: "Categories",
      //     field: row =>
      //       (!!row.categories &&
      //         row.categories.map(category => category.title).join(", ")) ||
      //       "No Categories",
      //     sortable: true
      //   },
      //   {
      //     name: "plannedStart",
      //     label: "Planned Start",
      //     align: "left",
      //     field: row => dateFormatter(row.plannedStart),
      //     sortable: true
      //   },
      //   {
      //     name: "plannedEnd",
      //     label: "Planned End",
      //     align: "left",
      //     field: row => dateFormatter(row.plannedEnd),
      //     sortable: true
      //   },
      //   {
      //     name: "status",
      //     label: "Status",
      //     align: "left",
      //     field: row =>
      //       row.published === true
      //         ? "Published"
      //         : row.published === false
      //         ? "Draft"
      //         : "Status Unavailable",
      //     sortable: true
      //   }
      // ],

      viewIsLoading: false,
      editIsLoading: false,
      deleteIsLoading: false
    };
  },
  methods: {
    dateFormatter,
    // dateFormatter(val) {
    //   if (!!val) {
    //     return date.formatDate(new Date(val), "DD.MM.YYYY");
    //   } else {
    //     return "No Date";
    //   }
    // },
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
      } else {
        this.$router.push({ path: "/user/newChecklist" });
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
      return this.$router.currentRoute.path == "/user/data";
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
    },
    projectCols() {
      return [
        {
          name: "title",
          label: this.$t("myData.title"),
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: this.$t("myData.categories"),
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
      ];
    },
    fundingCols() {
      return [
        {
          name: "title",
          label: this.$t("fundingsCol.title"),
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: this.$t("fundingsCol.categories"),
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            "No Categories",
          sortable: true
        },
        {
          name: "plannedStart",
          label: this.$t("fundingsCol.start"),
          align: "left",
          field: row => dateFormatter(row.plannedStart),
          sortable: true
        },
        {
          name: "plannedEnd",
          label: this.$t("fundingsCol.end"),
          align: "left",
          field: row => dateFormatter(row.plannedEnd),
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
      ];
    },
    checklistCols() {
      return [
        {
          name: "title",
          label: this.$t("checkListCols.title"),
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: this.$t("checkListCols.categories"),
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
      ];
    }
  },

  mounted() {
    console.log("this.$router.currentRoute", this.$router.currentRoute);
    this.getData(this.tab);
  }
};
</script>

<style></style>
