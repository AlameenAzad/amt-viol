<template>
  <div class="q-mt-lg q-ma-xl q-pb-md">
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
        <p class="font-20 no-margin">Categories</p>
      </q-tab>
      <q-tab class="q-pa-lg  radius-10 customBorder" name="keywords/Tags">
        <p class="font-20 no-margin">Keywords/Tags</p>
      </q-tab>
    </q-tabs>

    <q-table
      class="radius-20 shadow-1"
      :data="apiData"
      :columns="columns"
      row-key="name"
      hide-bottom
      :hide-header="!isInPage"
      :filter="filter"
      :pagination="{
        rowsPerPage: 0
      }"
    >
      <!-- <q-table
      class="radius-20 shadow-1"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
      :hide-header="!isInPage"
      :visible-columns="isInPage ? visibleColumns : []"
      :filter="filter"
      :pagination="{
        rowsPerPage: 0
      }"
    > -->
      <template v-slot:top-left>
        <div class="row justify-between items-center">
          <div class=" font-24 q-mr-lg">
            {{ tab == "categories" ? "Categories" : "Tags" }}
          </div>
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
                    <q-item-section @click="prepEditDialog(props.row)"
                      ><span class="text-right font-14">
                        Edit
                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span
                        class="text-right font-14 text-red"
                        @click="prepDeleteDialog(props.row)"
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
    <CreateDialog
      :editingId="itemId"
      :tab="tab === 'categories' ? 'New categories' : 'New Keywords/Tags'"
      :dialogState="createDialog"
      @update="(createDialog = $event), (itemId = null)"
    />
    <DeleteDialog
      :id="itemId"
      :tab="tab === 'categories' ? 'Delete category' : 'Delete Keyword/Tag'"
      :dialogState="deleteDialog"
      @update="(deleteDialog = $event), (itemId = null)"
    />
  </div>
</template>

<script>
import CreateDialog from "components/categoriesKeywords/CreateDialog.vue";
import DeleteDialog from "components/categoriesKeywords/DeleteDialog.vue";
export default {
  name: "categoriesKeyword",
  components: {
    CreateDialog,
    DeleteDialog
  },
  data() {
    return {
      tab: "categories",
      createDialog: false,
      deleteDialog: false,
      itemId: null,
      filter: "",
      visibleColumns: ["name", "calories", "fat", "carbs"],
      categoriesCol: [
        {
          name: "title",
          label: "Title",
          field: "title",
          sortable: true,
          align: "left"
        },
        {
          name: "id",
          required: true,
          label: "ID",
          required: true,
          align: "left",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "projectsCount",
          align: "left",
          label: "Project ideas",
          field: "projectsCount",
          sortable: true
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
          name: "title",
          label: "Title",
          field: "title",
          sortable: true,
          align: "left"
        },
        {
          name: "id",
          required: true,
          label: "ID",
          required: true,
          align: "left",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "projectsCount",
          align: "left",
          label: "Project ideas",
          field: "projectsCount",
          sortable: true
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
          iron: "1%",
          id: "25"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
          id: "11"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
          id: "12"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
          id: "13"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
          id: "14"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%",
          id: "15"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%",
          id: "16"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%",
          id: "17"
        }
      ]
    };
  },
  methods: {
    prepDeleteDialog(row) {
      this.itemId = !!row.id ? row.id : "";
      this.deleteDialog = true;
    },
    prepEditDialog(row) {
      this.itemId = !!row.id ? row.id : "";
      this.createDialog = true;
    }
  },
  watch: {
    tab(val) {
      if (val === "categories") {
        this.$store.dispatch("category/getCategories");
      } else {
        this.$store.dispatch("tag/getTags");
      }
    }
  },
  computed: {
    apiData() {
      return this.tab == "categories"
        ? this.$store.state.category.categories
        : this.$store.state.tag.tags;
    },
    isLoading() {
      return this.$store.state.general.loading;
    },
    isInPage() {
      return this.$router.currentRoute.fullPath == "/catkeytags";
    },
    columns() {
      return this.tab == "categories" ? this.categoriesCol : this.keywordCol;
    }
  },
  mounted() {
    this.$store.dispatch("category/getCategories");
  }
};
</script>
