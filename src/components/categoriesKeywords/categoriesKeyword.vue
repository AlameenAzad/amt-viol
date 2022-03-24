<template>
  <div class="q-mt-lg q-ma-xl">
    <q-tabs
      v-if="isInPage"
      v-model="tab"
      align="justify"
      indicator-color="transparent"
      class="q-mb-lg text-black"
      active-bg-color="yellow"
      no-caps
    >
      <q-tab class="q-pa-lg q-mr-lg radius-10 customBorder" name="categories">
        <p class="font-20 no-margin  ">Categories</p>
      </q-tab>
      <q-tab
        class="q-pa-lg q-mr-lg radius-10 customBorder"
        name="keywords/Tags"
      >
        <p class="font-20 no-margin ">Keywords/Tags</p>
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
        <div class="row justify-between items-center">
          <q-label class=" font-24 q-mr-lg">{{
            tab == "categories" ? "Categories" : "Tags"
          }}</q-label>
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
        </div>
      </template>
      <template v-slot:top-right>
        <q-btn
          color="blue"
          icon="add"
          unelevated
          filled
          class="mr-0 radius-6 text-weight-600"
          no-caps
          @click="createDialog = true"
        >
          <p class="q-mb-none q-mx-md q-my-sm">
            {{
              tab == "categories"
                ? "Create Categories"
                : tab == "keywords/Tags"
                ? "Create Tags/Keywords"
                : "Create categories"
            }}
          </p>
        </q-btn>
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
                        Edit
                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span
                        class="text-right font-14 text-red"
                        @click="deleteDialog = true"
                      >
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
    <q-dialog v-model="createDialog">
      <q-card class="  q-px-xl radius-10  column ">
        <q-card-section align="center">
          <h6 class="text-center font-20 q-mt-md q-mb-none">
            {{ tab == "categories" ? "New categories" : "New Keywords/Tags" }}
          </h6>
        </q-card-section>
        <q-card-section align="left"
          ><div class=" items-center ">
            <div class="col-3">
              <p class="font-14 no-margin">
                {{
                  tab == "categories"
                    ? "Title of the category"
                    : "Title of the keyword/Tag"
                }}
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="createDialogInput"
                :rules="[]"
                label="Title"
              />
            </div></div
        ></q-card-section>
        <q-card-section>
          <div class="row justify-center q-ml-lg ">
            <q-btn
              label="Cancel"
              outline
              type="submit"
              size="14px"
              color="primary"
              no-caps
              class="no-shadow radius-6 q-px-xl  q-mr-sm "
            />
            <q-btn
              label="Save"
              type="submit"
              unelevated
              size="14px"
              color="primary"
              no-caps
              class="  no-shadow	 radius-6 q-px-xl  q-py-sm  "
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog">
      <q-card class="  q-px-xl radius-10  column ">
        <q-card-section align="center">
          <h6 class="text-center font-20 q-mt-md q-mb-none">
            {{ tab == "categories" ? "Delete category" : "Delete Keyword/Tag" }}
          </h6>
        </q-card-section>
        <q-card-section align="left"
          ><div class=" items-center text-center ">
            <p>
              {{
                tab == "categories"
                  ? "Do you really want to delete the category? It will be removed from all documents."
                  : "Do you really want to delete the tag? It will be removed from all documents."
              }}
            </p>
          </div></q-card-section
        >
        <q-card-section>
          <div class="row justify-center q-ml-lg ">
            <q-btn
              label="Cancel"
              outline
              type="submit"
              size="14px"
              color="primary"
              no-caps
              class="no-shadow radius-6 q-px-xl  q-mr-sm "
            />
            <q-btn
              label="Confirm"
              type="submit"
              unelevated
              size="14px"
              color="red"
              no-caps
              class="  no-shadow	 radius-6 q-px-xl  q-py-sm  "
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "categoriesKeyword",
  data() {
    return {
      tab: "categories",
      createDialog: false,
      deleteDialog: false,
      createDialogInput: "",

      filter: "",
      visibleColumns: ["name", "calories", "fat", "carbs"],
      categoriesCol: [
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
          align: "left",
          label: "Project ideas",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Fundings",
          field: "fat",
          sortable: true,
          align: "left"
        },
        {
          name: "fat",
          label: "Implementation checklist",
          field: "fat",
          sortable: true,
          align: "left"
        }
      ],
      keywordCol: [
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
          align: "left",
          label: "Project ideas",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Fundings",
          field: "fat",
          sortable: true,
          align: "left"
        },
        {
          name: "fat",
          label: "Implementation checklist",
          field: "fat",
          sortable: true,
          align: "left"
        }
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
      return this.$router.currentRoute.fullPath == "/catkeytags";
    },
    columns() {
      return this.tab == "categories" ? this.categoriesCol : this.keywordCol;
    }
  }
};
</script>
