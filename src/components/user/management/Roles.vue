<template>
  <div>
    <q-table
      class="radius-20 shadow-1 pagination-no-shadow"
      title="Current funding information"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
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
          <div class="col-8 col-md-auto">
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
          <div class="col-4 col-md-auto text-right">
            <q-btn
              color="blue"
              icon="person_add"
              unelevated
              :round="$q.screen.lt.md"
              class="no-shadow text-weight-600"
              :class="$q.screen.gt.sm ? 'radius-6' : ''"
              no-caps
              @click="inviteUserDialog = true"
            >
              <p v-if="$q.screen.gt.sm" class="q-mb-none q-mx-md q-my-sm">
                {{ $t("userAdministration.inviteUser") }}
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
                    @click="$router.push('/Administation/User/' + props.row.id)"
                  >
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("userAdministration.edit") }}

                        <q-icon size="sm" class="text-blue" name="edit" />
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        {{ $t("userAdministration.delete") }}

                        <q-icon size="sm" name="delete" />
                      </span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <InviteUser
      :dialogState="inviteUserDialog"
      @update="inviteUserDialog = $event"
    />
  </div>
</template>

<script>
import InviteUser from "components/user/management/InviteUser.vue";
export default {
  name: "Roles",
  components: {
    InviteUser
  },
  data() {
    return {
      inviteUserDialog: false,
      filter: "",
      visibleColumns: ["name", "email", "administration", "role"]
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("userCenter/getUsers");
    }
  },
  computed: {
    data() {
      return this.$store.state.userCenter.users;
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
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.username,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "left",
          field: row => row.email,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "administration",
          required: true,
          label: this.$t("userAdministration.administration"),
          align: "left",
          field: row =>
            (row["user_detail"] &&
              row["user_detail"].municipality &&
              row["user_detail"].municipality.title) ||
            "Administration Unavailable",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "role",
          required: true,
          label: this.$t("userAdministration.role"),
          align: "left",
          field: row => (!!row.role && row.role.type) || "Role Unavailable",
          format: val => `${val}`,
          sortable: true
        }
      ];
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
