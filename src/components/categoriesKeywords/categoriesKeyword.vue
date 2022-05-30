<template>
  <div>
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
      <q-tab class="q-pa-lg radius-10 customBorder" name="keywords/Tags">
        <p class="font-20 no-margin">Keywords/Tags</p>
      </q-tab>
    </q-tabs>
    <q-table
      class="radius-20 shadow-1"
      :data="apiData"
      :columns="columns"
      row-key="name"
      :hide-bottom="apiData.length > 0"
      :hide-header="!isInPage"
      :visible-columns="isInPage ? visibleColumns : []"
      :filter="filter"
      :pagination="{
        rowsPerPage: 0
      }"
    >
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
      visibleColumns: ["title", "projectIdeas", "fundings", "checklists"],
      columns: [
        {
          name: "title",
          label: "Title",
          field: row => row.title,
          sortable: true,
          align: "left"
        },
        {
          name: "projectIdeas",
          align: "left",
          label: "Project ideas",
          field: row => (!!row.dataSet.projects && row.dataSet.projects) || 0,
          sortable: true
        },
        {
          name: "fundings",
          align: "left",
          label: "Fundings",
          field: row => (!!row.dataSet.fundings && row.dataSet.fundings) || 0,
          sortable: true
        },
        {
          name: "checklists",
          align: "left",
          label: "Implementation Checklist",
          field: row => (!!row.dataSet.checklist && row.dataSet.checklist) || 0,
          sortable: true
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
    },
    getData(tab) {
      if (tab === "categories") {
        this.$store.dispatch("category/getCategories");
      } else {
        this.$store.dispatch("tag/getTags");
      }
    }
  },
  watch: {
    tab(val) {
      if (val === "categories") {
        this.getData("categories");
      } else {
        this.getData("keywords/Tags");
      }
    }
  },
  computed: {
    apiData() {
      return this.tab == "categories"
        ? this.$store.state.category.categories
        : this.$store.state.tag.tags;
    },
    isInPage() {
      return this.$router.currentRoute.fullPath == "/catkeytags";
    }
    // columns() {
    //   return this.tab == "categories" ? this.categoriesCol : this.keywordCol;
    // }
  },
  mounted() {
    this.getData(this.tab);
  }
};
</script>
