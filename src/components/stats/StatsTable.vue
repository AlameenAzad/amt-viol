<template>
  <div class="q-my-lg">
    <q-table
      class="radius-20 shadow-1"
      :class="expanded ? 'yellowBg' : ''"
      :data="data"
      :columns="columns"
      hide-bottom
      :pagination="{
        rowsPerPage: 0
      }"
      row-key="name"
      :hide-header="!isInPage"
      :filter="filter"
      :filter-method="filterTable"
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
              <div v-if="isInPage" class="col-12 col-md-4">
                <q-input
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
                  @click="expanded = !expanded"
                  icon="filter_alt"
                  color="primary"
                  flat
                  round
                >
                </q-btn>
              </div>
            </template>
            <div class="row q-px-xs q-mt-md q-col-gutter-x-lg">
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.type") }}
                </p>
                <q-select
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="Search"
                  filled
                  :options="typeOptions"
                  v-model="type"
                >
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.categories") }}
                </p>
                <q-select
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="Search"
                  filled
                  :options="categoryOptions"
                  v-model="category"
                >
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.tags/keywords") }}
                </p>
                <q-select
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="Search"
                  filled
                  :options="tagKeywordsOptions"
                  v-model="tagsKeywords"
                >
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.projectCoordinator") }}
                </p>
                <q-select
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="Search"
                  filled
                  :options="projectCoordinatorOptions"
                  v-model="projectCoordinator"
                >
                </q-select>
              </div>
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.publishDate") }}
                </p>
                <q-input
                  filled
                  v-model="publishDateStart"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="From"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
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
              <div class="col-3 q-mt-lg">
                <p class="text-black q-mb-xs font-16"></p>
                <q-input
                  filled
                  v-model="publishDateEnd"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="Until"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
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
              <div class="col-3">
                <p class="text-black q-mb-xs font-16">
                  {{ $t("statsTable.endDate") }}
                </p>
                <q-input
                  filled
                  v-model="endDateStart"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="From"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
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
              <div class="col-3 q-mt-lg">
                <p class="text-black q-mb-xs font-16"></p>
                <q-input
                  filled
                  v-model="endDateEnd"
                  class="no-shadow q-mb-lg input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="Until"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
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
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("statsTable.view") }}
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="visibility"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("statsTable.edit") }}

                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("statsTable.publish") }}

                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="publish"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        {{ $t("statsTable.delete") }}

                        <q-icon size="sm" name="delete"/></span
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
export default {
  data() {
    return {
      expanded: true,
      search: "",
      type: "",
      category: "",
      tagsKeywords: "",
      projectCoordinator: "",
      // typeOptions: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      // categoryOptions: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      tagKeywordsOptions: [
        "Google",
        "Facebook",
        "Twitter",
        "Apple",
        "Oracle",
        ""
      ],
      projectCoordinatorOptions: [
        "Google",
        "Facebook",
        "Twitter",
        "Apple",
        "Oracle"
      ],
      publishDateStart: "",
      publishDateEnd: "",
      endDateStart: "",
      endDateEnd: "",
      // columns: [
      //   {
      //     name: "title",
      //     required: true,
      //     label: "Title",
      //     align: "left",
      //     field: row => row.name,
      //     sortable: true
      //   },
      //   {
      //     name: "type",
      //     align: "left",
      //     label: "Type",
      //     field: "type",
      //     sortable: true
      //   },
      //   {
      //     name: "categories",
      //     align: "left",
      //     label: "Categories",
      //     field: "category",
      //     sortable: true
      //   },
      //   {
      //     name: "publishDate",
      //     align: "left",
      //     label: "Publish Date",
      //     field: "publishDate",
      //     sortable: true
      //   },
      //   {
      //     name: "endDate",
      //     align: "left",
      //     label: "End Date",
      //     field: "endDate",
      //     sortable: true
      //   },
      //   {
      //     name: "owners",
      //     align: "left",
      //     label: "Owners",
      //     field: "owners",
      //     sortable: true
      //   }
      // ],
      data: [
        {
          name: "Frozen Yogurt",
          type: "159",
          category: "6.0",
          carbs: 24,
          protein: 4.0,
          publishDate: "21.03.2022",
          endDate: "27.03.2022",
          sodium: 87,
          calcium: "14%",
          iron: "1%",
          owners: "Abraham"
        },
        {
          name: "Ice cream sandwich",
          type: "237",
          category: "9.0",
          carbs: 37,
          protein: 4.3,
          publishDate: "21.03.2022",
          endDate: "27.03.2022",
          sodium: 129,
          calcium: "8%",
          iron: "1%",
          owners: "Abraham"
        },
        {
          name: "Eclair",
          type: "262",
          category: "16.0",
          carbs: 23,
          protein: 6.0,
          publishDate: "23.03.2022",
          endDate: "25.03.2022",
          sodium: 337,
          calcium: "6%",
          iron: "7%",
          owners: "Abraham"
        },
        {
          name: "Cupcake",
          type: "305",
          category: "3.7",
          carbs: 67,
          protein: 4.3,
          publishDate: "21.03.2022",
          endDate: "27.03.2022",
          sodium: 413,
          calcium: "3%",
          iron: "8%",
          owners: "Admin"
        },
        {
          name: "Gingerbread",
          type: "356",
          category: "16.0",
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          publishDate: "22.03.2022",
          endDate: "25.03.2022",
          calcium: "7%",
          iron: "16%",
          owners: "Admin"
        },
        {
          name: "Jelly bean",
          type: "375",
          category: "0.0",
          carbs: 94,
          protein: 0.0,
          publishDate: "21.03.2022",
          endDate: "27.03.2022",
          sodium: 50,
          calcium: "0%",
          iron: "0%",
          owners: "Admin"
        },
        {
          name: "Lollipop",
          type: "392",
          category: "0.3",
          carbs: 98,
          protein: 0,
          publishDate: "18.03.2022",
          endDate: "30.03.2022",
          sodium: 38,
          calcium: "0%",
          iron: "2%",
          owners: "Admin"
        },
        {
          name: "Lollisdasdpop",
          type: "392",
          category: "0.2",
          carbs: 98,
          protein: 0,
          publishDate: "20.03.2022",
          endDate: "27.03.2022",
          sodium: 38,
          calcium: "0%",
          iron: "2%",
          owners: "Admin"
        },
        {
          name: "Testt",
          type: "392",
          category: "0.1",
          carbs: 98,
          protein: 0,
          publishDate: "21.03.2022",
          endDate: "27.03.2022",
          sodium: 38,
          calcium: "0%",
          iron: "2%",
          owners: "Admin"
        }
      ]
    };
  },
  methods: {
    // TODO need to refactor this function.
    filterTable(rows, terms) {
      // TODO modify the row and add publishDate and endDate

      let search = terms.name ? terms.name.toLowerCase() : "";
      let publishDateStart = terms.publishDateStart
        ? terms.publishDateStart
        : "";
      let publishDateEnd = terms.publishDateEnd ? terms.publishDateEnd : "";
      let endDateStart = terms.endDateStart ? terms.endDateStart : "";
      let endDateEnd = terms.endDateEnd ? terms.endDateEnd : "";

      const validTerms = {
        type: terms.type ? terms.type : "",
        category: terms.category ? terms.category : "",
        tagsKeywords: terms.tagsKeywords ? terms.tagsKeywords : "",
        projectCoordinator: terms.projectCoordinator
          ? terms.projectCoordinator
          : ""
      };

      let filteredRows = [];

      // Check if all terms are empty. If they are, return all rows.
      for (let term in terms) {
        if (terms[term] === "" && terms.hasOwnProperty(term)) {
          filteredRows = rows;
        }
      }

      // Filter by search term and other filters if search exists
      if (search) {
        console.warn("There be search term");
        for (let term in terms) {
          if (term !== "name" && !!terms[term] && terms.hasOwnProperty(term)) {
            //for search and other filters
            console.log("term :>> ", term);
            filteredRows = rows
              .filter(row => row[term] === terms[term])
              .filter(row => row.name.toLowerCase().includes(search));
          } else if (!!terms[term] && terms.hasOwnProperty(term)) {
            //only for search
            filteredRows = rows.filter(row =>
              row.name.toLowerCase().includes(search)
            );
          }
        }
      } else {
        console.warn("No search term");
        for (let term in terms) {
          if (term !== "name" && !!terms[term] && terms.hasOwnProperty(term)) {
            if (publishDateStart || publishDateEnd) {
              console.log("Is in IFFF");
              filteredRows = rows.filter(
                row =>
                  row.publishDate >= publishDateStart &&
                  (publishDateEnd
                    ? row.publishDate <= publishDateEnd
                    : row.publishDate >= publishDateStart)
              );
            } else if (endDateStart || endDateEnd) {
              filteredRows = rows.filter(
                row =>
                  row.endDate >= endDateStart &&
                  (publishDateEnd
                    ? row.endDate <= endDateEnd
                    : row.endDate >= endDateStart)
              );
            } else {
              console.log("Is in ELSE");
              filteredRows = rows.filter(row => row[term] === terms[term]);
            }
            console.log("term :>> ", term);
            // filteredRows = rows.filter(row => row[term] === terms[term]);
          }
        }
      }

      console.log("filteredRows :>> ", filteredRows);

      return filteredRows;
    }
  },
  computed: {
    typeOptions() {
      let vals = this.data.map(item => item.type);
      vals.push("");
      return vals;
    },
    categoryOptions() {
      let vals = this.data.map(item => item.category);
      vals.push("");
      return vals;
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
          name: "title",
          required: true,
          label: this.$t("statsTable.title"),
          align: "left",
          field: row => row.name,
          sortable: true
        },
        {
          name: "type",
          align: "left",
          label: this.$t("statsTable.type"),
          field: "type",
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: this.$t("statsTable.categories"),
          field: "category",
          sortable: true
        },
        {
          name: "publishDate",
          align: "left",
          label: this.$t("statsTable.publishDate"),
          field: "publishDate",
          sortable: true
        },
        {
          name: "endDate",
          align: "left",
          label: this.$t("statsTable.endDate"),
          field: "endDate",
          sortable: true
        },
        {
          name: "owners",
          align: "left",
          label: this.$t("statsTable.owners"),
          field: "owners",
          sortable: true
        }
      ];
    }
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
