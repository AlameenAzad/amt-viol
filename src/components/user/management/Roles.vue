<template>
  <div>
    <q-table
      class="radius-20 shadow-1"
      title="Current funding information"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
      :hide-bottom="data.length > 0"
      :pagination="{
        rowsPerPage: 0
      }"
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
              icon="person_add"
              unelevated
              class="no-shadow radius-6 text-weight-600 "
              no-caps
              @click="inviteUserDialog = true"
            >
              <p class="q-mb-none q-mx-md q-my-sm">Invite User</p>
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
                        Edit
                        <q-icon size="sm" class="text-blue" name="edit" />
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        Delete
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
      columns: [
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
          label: "Administration",
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
          label: "role",
          align: "left",
          field: row => (!!row.role && row.role.type) || "Role Unavailable",
          format: val => `${val}`,
          sortable: true
        }
      ]
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
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
