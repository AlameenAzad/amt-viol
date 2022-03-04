<template>
  <q-page class="bg-blue-1">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="font-36 text-weight-600">Documents</h1>
        </div>
        <div class="col-12 q-mb-xl">
          <p>Search result: X Documents</p>
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
            :filter="query"
            class="bg-white radius-20 q-pa-md q-mb-xl"
            hide-pagination
            :pagination="{
              rowsPerPage: 0
            }"
          >
            <template v-slot:top-left>
              <q-input
                borderless
                outlined
                class="no-shadow tableSearchInput"
                debounce="300"
                v-model="query"
                placeholder="Search"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="text-blue font-14"
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
                <q-td auto-width>
                  <q-btn
                    size="lg"
                    color="primary"
                    round
                    flat
                    dense
                    @click="openDocument(props.row)"
                    icon="chevron_right"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "documents",
  data() {
    return {
      query: "",
      filter: "",
      columns: [
        {
          name: "desc",
          required: true,
          label: "Title",
          align: "left",
          field: row => row.name,
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
          align: "left",
          label: "Categories",
          field: "fat",
          sortable: true
        }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ]
    };
  },
  mounted() {
    // TODO uncomment this on prod.
    // if (!this.$route.query.q) {
    //   this.$router.push({ name: "landing" });
    // } else {
    this.query = this.$route.query.q;
    // }
  },
  methods: {
    openDocument(val) {
      console.log(val.name);
      this.$router.push({
        name: "documentView",
        params: {
          id: val.name
        }
      });
    }
  }
};
</script>

<style></style>
