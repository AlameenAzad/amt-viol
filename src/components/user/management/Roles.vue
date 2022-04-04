<template>
  <div class="q-mt-lg q-ma-xl">
    <q-table
      class="radius-20 shadow-1"
      title="Current funding information"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-bottom
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
              @click="showDialog = true"
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
    <q-dialog v-model="showDialog">
      <q-card class="q-pa-lg radius-10">
        <div>
          <h6 class="text-center font-24 q-mt-md">Invite User</h6>
          <q-form ref="personalDataForm" class="q-gutter-lg q-px-md q-mb-md ">
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
            <div class="row items-baseline justify-evenly">
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
                  placeholder="text"
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
                class="no-shadow radius-6 q-px-xl  q-mr-sm "
              />
              <q-btn
                label="Send Invitation"
                type="submit"
                unelevated
                size="16px"
                color="primary"
                no-caps
                class="  no-shadow	 radius-6 q-px-xl   "
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      showDialog: false,
      role: "",
      filter: "",
      administration: "",
      email: "",
      message: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Email",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Adminstration", field: "fat", sortable: true },
        { name: "carbs", label: "Role", field: "carbs" }
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
