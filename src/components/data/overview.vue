<template>
  <div class="q-mt-lg">
    <q-table
      class="radius-20 shadow-1"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
      hide-header
      :visible-columns="visibleColumns"
    >
      <template v-slot:top>
        <div class="row full-width">
          <div class="col-12">
            <p class="font-24">
              My Data
              <span
                class="font-16 float-right text-blue text-underline text-weight-600"
              >
                Show my Documents
              </span>
            </p>
          </div>
          <div class="col-12">
            <q-btn
              color="yellow"
              unelevated
              outline
              class="mr-0 radius-6 text-weight-600"
              no-caps
            >
              <p class="q-mb-none q-mx-md q-my-none text-black">
                Project Ideas
              </p>
            </q-btn>
            <q-btn
              color="yellow"
              unelevated
              outline
              class="mr-0 radius-6 q-mx-md text-weight-600"
              no-caps
            >
              <p class="q-mb-none q-mx-xl q-my-none text-black">fundings</p>
            </q-btn>
            <q-btn
              color="yellow"
              unelevated
              outline
              class="mr-0 radius-6 q-mr-md text-weight-600"
              no-caps
            >
              <p class="q-mb-none q-mx-md q-my-none text-black">
                Implementation Checklist
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
      visibleColumns: ["name"],
      columns: [
        {
          name: "name",
          required: true,
          label: "funding information",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "title",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "categories", field: "fat", sortable: true },
        { name: "carbs", label: "author", field: "carbs" }
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
  }
};
</script>

<style></style>
