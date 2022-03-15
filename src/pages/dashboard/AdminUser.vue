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
            <q-btn color="primary" label="Add User" icon="person_add" />
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
  </div>
</template>
<script>
export default {
  name: "dataOverview",
  data() {
    return {
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
