<template>
  <div>
    <q-table
      class="radius-20 shadow-1 pagination-no-shadow"
      title="Current funding information"
      :data="data"
      row-key="name"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      :pagination="{
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 50
      }"
    >
      <template v-slot:top>
        <div class="row full-width justify-between items-center">
          <div class="col-8 col-md-4">
            <q-input
              borderless
              outlined
              class="input-radius-6 no-shadow q-mb-sm q-mt-sm"
              v-model="filter"
              placeholder="Search"
              dense
            >
              <template v-slot:prepend>
                <q-icon color="blue-5" name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-4 col-md-4 text-right">
            <q-btn
              color="blue"
              icon="add"
              unelevated
              :round="$q.screen.lt.md"
              class="no-shadow text-weight-600"
              :class="$q.screen.gt.sm ? 'radius-6' : ''"
              no-caps
              @click="createDialog = true"
            >
              <p v-if="$q.screen.gt.sm" class="q-mb-none q-mx-md q-my-sm">
                {{ $t("administrativeAreas.createAdministration") }}
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
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      $router.push(`/Administation/Areas/${props.row.id}`)
                    "
                  >
                    <q-item-section>
                      <span class="text-right font-14">
                        {{ $t("administrativeAreas.view") }}
                        <q-icon size="sm" class="text-blue" name="visibility"
                      /></span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="prepEditDialog(props.row)">
                      <span class="text-right font-14">
                        {{ $t("administrativeAreas.edit") }}
                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item v-if="isAdmin" clickable v-close-popup>
                    <q-item-section @click="prepDeleteDialog(props.row)"
                      ><span class="text-right font-14 text-red">
                        {{ $t("administrativeAreas.delete") }}
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
    data() {
      return this.$store.state.municipality.municipalities;
    },
    isAdmin() {
      return this.$store.getters["userCenter/isAdmin"];
    },
    columns() {
      return [
        {
          name: "id",
          label: "id",
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "administration",
          label: this.$t("administrativeAreas.administrationName"),
          field: row => row.title,
          sortable: true,
          align: "left"
        },
        {
          name: "federal state",
          label: this.$t("administrativeAreas.federalState"),
          field: row => row.location,
          sortable: true,
          align: "left"
        },

        {
          name: "data sets",
          align: "left",
          label: this.$t("administrativeAreas.dataSets"),
          field: row => row.dataSet?.total,
          sortable: true
        },
        {
          name: "project coordinators",
          label: this.$t("administrativeAreas.projectCoordinator"),
          field: row =>
            (!!row.users && row.users.substring(0, 25) + "...") || "No Users",
          sortable: true,
          align: "left"
        }
      ];
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
