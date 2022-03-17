<template>
  <div class="q-mt-lg">
    <q-table
      class="radius-20 shadow-1"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
      :hide-header="!isInPage"
      :filter="filter"
      :pagination="{
        rowsPerPage: 12
      }"
    >
      <template v-slot:top>
        <div v-if="isInPage" class="col-12 col-md-4">
          <q-input
            borderless
            outlined
            class="input-radius-6 no-shadow q-mb-sm q-mt-sm"
            v-model="filter"
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
          <q-btn icon="filter_alt" color="primary" flat round> </q-btn>
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
                        Publish
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="publish"/></span
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
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: row => row.name,
          sortable: true
        },
        {
          name: "type",
          align: "left",
          label: "Type",
          field: "calories",
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: "Categories",
          field: "fat",
          sortable: true
        },
        {
          name: "publishDate",
          align: "left",
          label: "Publish Date",
          field: "publishDate",
          sortable: true
        },
        {
          name: "endDate",
          align: "left",
          label: "End Date",
          field: "endDate",
          sortable: true
        },
        {
          name: "owners",
          align: "left",
          label: "Owners",
          field: "owners",
          sortable: true
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
          owners: "Abraham"
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
          owners: "Abraham"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          publishDate: "28.09.2021",
          endDate: "28.09.2021",
          sodium: 337,
          calcium: "6%",
          iron: "7%",
          owners: "Abraham"
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
          owners: "Admin"
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
          owners: "Admin"
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
          owners: "Admin"
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
          owners: "Admin"
        }
      ]
    };
  },
  computed: {
    isInPage() {
      return this.$router.currentRoute.fullPath == "/stats";
    }
  }
};
</script>

<style></style>
