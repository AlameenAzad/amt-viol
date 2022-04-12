<template>
  <div class="q-mt-lg q-ma-xl">
    <q-table
      class="radius-20 shadow-1"
      title="Current funding information"
      :data="apiData"
      row-key="name"
      :columns="columns"
      :hide-bottom="apiData.length > 0"
      :filter="filter"
      :visible-columns="visibleColumns"
      :pagination="{
        rowsPerPage: 0
      }"
    >
      <template v-slot:top>
        <div class="row full-width justify-between ">
          <div class="col-auto">
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
                    <q-item-section @click="prepEditDialog(props.row)">
                      <span class="text-right font-14">
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
      :editingId="municipalityId"
      @update="(createDialog = $event), (municipalityId = null)"
    />
    <DeleteDialog
      :id="municipalityId"
      :dialogState="deleteDialog"
      @update="(deleteDialog = $event), (municipalityId = null)"
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
      createDialog: false,
      deleteDialog: false,
      municipalityId: null,
      filter: "",
      visibleColumns: [
        "administration",
        "federal state",
        "data sets",
        "project coordinators"
      ],
      columns: [
        {
          name: "id",
          required: false,
          label: "id",
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "administration",
          label: "Administration",
          field: "title",
          sortable: true,
          align: "left"
        },
        {
          name: "federal state",
          label: "Federal State",
          field: "location",
          sortable: true,
          align: "left"
        },

        {
          name: "data sets",
          align: "left",
          label: "Data sets",
          field: "projectsCount",
          sortable: true
        },
        {
          name: "project coordinators",
          label: "Project coordinators",
          field: "fat",
          sortable: true,
          align: "left"
        }
      ]
    };
  },
  methods: {
    prepDeleteDialog(row) {
      this.municipalityId = !!row.id ? row.id : "";
      this.deleteDialog = true;
    },
    prepEditDialog(row) {
      this.municipalityId = !!row.id ? row.id : "";
      this.createDialog = true;
    },
    getData() {
      this.$store.dispatch("municipality/getMunicipalities");
    }
  },
  computed: {
    apiData() {
      return this.$store.state.municipality.municipalities;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
