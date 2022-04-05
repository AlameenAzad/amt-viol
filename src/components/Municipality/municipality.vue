<template>
  <div class="q-mt-lg q-ma-xl">
    <q-table
      class="radius-20 shadow-1"
      title="Current funding information"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
      :filter="filter"
    >
      <template v-slot:top>
        <div class="row full-width justify-between ">
          <div class="col-auto  ">
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
          <div class="col-auto  ">
            <q-btn
              color="blue"
              icon="add"
              unelevated
              class="no-shadow radius-6 text-weight-600 "
              no-caps
              @click="createDialog = true"
            >
              <p class="q-mb-none q-mx-md q-my-sm">Create Administration</p>
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
            class="font-14 cursor-pointer	"
          >
            {{ col.value }}
          </q-td>
          <q-td class="text-right" auto-width>
            <q-btn size="md" color="primary" round flat dense icon="more_vert">
              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 140px">
                  <q-item
                    clickable
                    v-close-popup
                    to="/Administation/Areas/details"
                  >
                    <q-item-section>
                      <span class="text-right font-14">
                        View
                        <q-icon size="sm" class="text-blue" name="visibility"
                      /></span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        Edit
                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section @click="prepDeleteDialog(props.row)"
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
    <CreateDialog
      :dialogState="createDialog"
      @update="(createDialog = $event), getData()"
    />
    <DeleteDialog
      :id="itemId"
      :dialogState="deleteDialog"
      @update="(deleteDialog = $event), (itemId = null), getData()"
    />
  </div>
</template>

<script>
import CreateDialog from "components/Municipality/CreateDialog.vue";
import DeleteDialog from "components/Municipality/DeleteDialog.vue";
export default {
  name: "municipality",
  components: {
    CreateDialog,
    DeleteDialog
  },
  data() {
    return {
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      createDialog: false,
      deleteDialog: false,
      form: {
        title: "",
        location: ""
      },
      itemId: null,
      filter: "",
      administration: "",
      email: "",
      message: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Adminstration",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "left",
          label: "Federal State",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Data sets",
          field: "fat",
          sortable: true,
          align: "left"
        },
        {
          name: "carbs",
          label: "project coordinators",
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
          iron: "1%",
          id: "1"
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
          id: "2"
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
          id: "3"
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
          id: "4"
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
          id: "5"
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
          id: "6"
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
          id: "7"
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
          id: "8"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%",
          id: "9"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%",
          id: "10"
        }
      ]
    };
  },
  methods: {
    prepDeleteDialog(row) {
      this.itemId = !!row.id ? row.id : "";
      this.deleteDialog = true;
    },
    getData() {
      this.$store.dispatch("municipality/getMunicipalities");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
