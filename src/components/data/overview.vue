<template>
  <div class="q-mt-lg">
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
        class="q-pa-lg q-mr-lg radius-10 customBorder"
        name="implementationChecklist"
      >
        <p class="font-20 no-margin">Implementation Checklist</p>
      </q-tab>
    </q-tabs>
    <q-table
      class="radius-20 shadow-1"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
      :hide-header="!isInPage"
      :visible-columns="isInPage ? visibleColumns : []"
      :filter="filter"
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
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        View
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="visibility"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        Edit
                        <q-icon size="sm" class="text-blue" name="edit"/></span
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
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        Delete
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
  name: "dataOverview",
  data() {
    return {
      tab: "projectIdeas",
      filter: "",
      visibleColumns: ["name", "calories", "fat", "carbs"],
      projectCols: [
        {
          name: "name",
          required: true,
          label: "Title",
          required: true,
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Categories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Status", field: "fat", sortable: true }
      ],
      fundingCols: [
        {
          name: "name",
          required: true,
          label: "Title",
          required: true,
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Categories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Publish Date", field: "fat", sortable: true },
        { name: "fat", label: "End Date", field: "fat", sortable: true },
        { name: "fat", label: "Status", field: "fat", sortable: true }
      ],
      checklistCols: [
        {
          name: "name",
          required: true,
          label: "Title",
          required: true,
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Categories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Status", field: "fat", sortable: true }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
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
    }
  }
};
</script>

<style></style>
