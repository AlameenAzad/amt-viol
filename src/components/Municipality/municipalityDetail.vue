<template>
  <div class="q-mt-lg q-ma-xl">
    <div class="row">
      <q-card class="left-card radius-20">
        <q-card-section>
          <img class="logo " src="../../assets/Wappen.png" />
        </q-card-section>
      </q-card>
      <q-card class=" radius-20 q-ml-lg blue-grey-5 right-card">
        <q-card-section>
          <h6 class="q-mt-none q-mb-sm">Municipality name</h6>
          <div class="row  ">
            <p class="label  ">Location:</p>
            <p class="q-ml-lg">Nordstrand</p>
          </div>
          <div class="row">
            <p class="label">User:</p>
            <div class="q-ml-xl">
              <p>Phillip Westervelt</p>
              <p>James Stanton</p>
              <p>Jaxson Carder</p>
            </div>
          </div>
          <q-btn
            class="more"
            size="md"
            color="primary"
            round
            flat
            dense
            icon="more_vert"
          >
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
                    ><span class="text-right text-red font-14">
                      Delete
                      <q-icon size="sm" class="text-red" name="delete"/></span
                  ></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
    <q-table
      class="radius-20 shadow-1 q-mt-md"
      title="Data"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
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
            class="font-14 cursor-pointer	"
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
                        <q-icon size="sm" class="text-blue" name="star"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        Archive
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="archive"/></span
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
      columns: [
        {
          name: "name",
          required: true,
          label: "Title",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "left",
          label: "Type",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Categories",
          field: "fat",
          sortable: true,
          align: "left"
        },
        {
          name: "carbs",
          label: "User",
          field: "carbs",
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
  }
};
</script>

<style scoped>
.label {
  color: rgba(22, 66, 139, 0.5);
}
.right-card {
  background: #eff2f7;
  flex: 1;
  height: 223px;
}

.left-card {
  height: 223px;
}

.more {
  position: absolute;
  top: 1rem;
  right: 10px;
}
</style>
