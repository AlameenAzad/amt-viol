<template>
  <q-dialog v-model="$_options">
    <q-card style="width: 600px; max-width: 90vw;" class="q-pa-md radius-10">
      <q-card-section class="q-py-none ">
        <h6 class="font-16 q-ma-none">Transfer Data</h6>
      </q-card-section>
      <q-card-section class="q-pa-none ">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          class="shadow-0"
          :contracted="$q.screen.lt.md"
          animated
        >
          <q-step
            style="min-height: 50vh"
            :name="1"
            title="Select User"
            icon="person_outline"
            :done="step > 1"
          >
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
            <q-list
              v-if="!!filteredUsers && filteredUsers.length > 0"
              class="radius-6"
              bordered
              separator
            >
              <q-item
                @click="form.selectedUser = user.id"
                v-for="user in filteredUsers"
                :key="user.id"
                clickable
                v-ripple
                :active="form.selectedUser === user.id"
                active-class="text-weight-600 text-primary"
              >
                <q-item-section
                  v-if="!!filteredUsers && filteredUsers.length > 0"
                  >{{ user.username }}</q-item-section
                >
              </q-item>
            </q-list>
            <q-list v-else class="radius-6" bordered separator>
              <q-item>
                <q-item-section>No User</q-item-section>
              </q-item>
            </q-list>
          </q-step>

          <q-step
            style="min-height: 50vh"
            :name="2"
            title="Select Data"
            icon="account_tree"
            :done="step > 2"
          >
            <div class="row">
              <div class="col-12">
                <p class="font-16 ">
                  Select the data that you want to transfer
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <q-checkbox
                  v-model="form.data"
                  val="Project"
                  label="Project"
                  color="primary"
                />
              </div>
              <div class="col-6">
                <q-checkbox
                  v-model="form.data"
                  val="Funding"
                  label="Funding"
                  color="primary"
                />
              </div>
              <div class="col-6">
                <q-checkbox
                  v-model="form.data"
                  val="Checklist"
                  label="Checklist"
                  color="primary"
                />
              </div>
              <div class="col-6">
                <q-checkbox
                  v-model="form.data"
                  val="Watchlist"
                  label="Watchlist"
                  color="primary"
                />
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="flex ">
              <q-btn
                v-if="step > 1"
                outline
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
              <q-space />
              <q-btn
                v-if="step > 1"
                @click="transferData"
                color="primary"
                label="Transfer Data"
              />
              <q-btn
                :disable="!form.selectedUser"
                v-if="step === 1"
                @click="$refs.stepper.next()"
                color="primary"
                label="Select Data"
                :loading="isLoading"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "transferDataDialog",
  props: {
    dialogState: { type: Boolean, default: false }
  },
  data() {
    return {
      filter: "",
      active: false,
      step: 1,
      form: {
        selectedUser: null,
        data: []
      },
      isLoading: false
    };
  },
  methods: {
    async transferData() {
      if (!!this.form.selectedUser && !!this.form.data) {
        console.log("this.form :>> ", this.form);
        this.isLoading = true;
        const res = await this.$store.dispatch(
          "userCenter/transferData",
          this.form
        );
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
        }
      }
    }
  },
  computed: {
    users() {
      return this.$store.state.userCenter.users;
    },
    filteredUsers() {
      return this.users.filter(user => {
        return user.username.toLowerCase().includes(this.filter.toLowerCase());
      });
    },
    $_options: {
      get: function() {
        return this.dialogState;
      },
      set: function(val) {
        this.form.selectedUser = null;
        this.form.data = [];
        this.active = false;
        this.step = 1;
        this.$emit("update", val);
      }
    }
  }
};
</script>

<style></style>
