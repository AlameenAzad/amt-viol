<template>
  <div class="q-mt-lg q-ma-xl">
    <q-table :data="data" class="radius-20 shadow-1" row-key="name" hide-bottom>
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
              color="primary"
              label="Add User"
              icon="person_add"
              @click="showDialog = true"
            />
          </div>
          <q-dialog v-model="showDialog">
            <q-card class="q-pa-lg">
              <div>
                <h6 class="text-center font-24 q-mt-md">Invite User</h6>
                <q-form
                  ref="personalDataForm"
                  class="q-gutter-lg q-px-md q-mb-md "
                >
                  <div class="row items-center ">
                    <div class="col-3">
                      <p class="font-14 no-margin">
                        Email*
                      </p>
                    </div>
                    <div class="col-9">
                      <q-input
                        outlined
                        class="no-shadow input-radius-6"
                        v-model="email"
                        :rules="[]"
                        label="E-Mail"
                      />
                    </div>
                  </div>
                  <div class="row items-center ">
                    <div class="col-3 ">
                      <p class="font-14 no-margin ">
                        Role*
                      </p>
                    </div>
                    <div class="col-9">
                      <q-select
                        outlined
                        :options="options"
                        class="no-shadow input-radius-6"
                        v-model="role"
                        :rules="[]"
                        label="Editor"
                      />
                    </div>
                  </div>
                  <div class="row items-center">
                    <div class="col-3">
                      <p class="font-14 no-margin">
                        Administration
                      </p>
                    </div>
                    <div class="col-9">
                      <q-select
                        outlined
                        :options="options"
                        class="no-shadow input-radius-6"
                        v-model="administration"
                        :rules="[]"
                        label="Select"
                      />
                    </div>
                  </div>
                  <div class="row items-center justify-evenly">
                    <div class="col-3">
                      <p class="font-14 no-margin">
                        Message
                      </p>
                    </div>
                    <div class="col-9">
                      <q-input
                        outlined
                        class="no-shadow input-radius-6"
                        v-model="message"
                        :rules="[]"
                        type="textarea"
                        label="text"
                      />
                    </div>
                  </div>

                  <div class="row justify-center q-ml-lg ">
                    <q-btn
                      label="Cancel"
                      outline
                      type="submit"
                      size="16px"
                      color="primary"
                      no-caps
                      class="radius-6 q-px-xl q-py-sm q-mr-sm "
                    />
                    <q-btn
                      label="Send Invitation"
                      type="submit"
                      size="16px"
                      color="primary"
                      no-caps
                      class="radius-6 q-px-xl q-py-sm "
                    />
                  </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>
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
                        Edit
                        <q-icon size="sm" class="text-blue" name="edit"/></span
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
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      showDialog: false,
      role: "",
      filter: "",
      administration: "",
      email: "",
      message: "",
      data: [
        {
          name: "Frozen Yogurt",
          email: "example@example.com",
          Administration: "none",
          role: "Admin"
        },
        {
          name: "Frozen Yogurt",
          email: "example@example.com",
          Administration: "none",
          role: "Admin"
        },
        {
          name: "Frozen Yogurt",
          email: "example@example.com",
          Administration: "none",
          role: "Admin"
        },
        {
          name: "Frozen Yogurt",
          email: "example@example.com",
          Administration: "none",
          role: "Admin"
        }
      ]
    };
  }
};
</script>
