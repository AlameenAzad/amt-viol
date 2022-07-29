<template>
  <div class="q-mt-lg">
    <q-table
      class="radius-20 shadow-1  pagination-no-shadow"
      :title="$t('fundingsInfo.current')"
      :data="data"
      :visible-columns="visibleColumns"
      :columns="columns"
      row-key="name"
      :pagination="{
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 50
      }"
    >
      <template v-slot:top>
        <p class="font-24">{{ $t("fundingsInfo.current") }}</p>
        <q-space />
        <p
          @click="$router.push({ path: '/user/data?tab=fundings' })"
          class="font-16 text-blue text-underline text-weight-600 cursor-pointer"
        >
          {{ $t("fundingsInfo.showAll") }}
        </p>
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
                        {{ $t("fundingTableOptions.view") }}
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="visibility"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("fundingTableOptions.edit") }}

                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("fundingTableOptions.bookmark") }}

                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="star_rate"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("fundingTableOptions.archive") }}

                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="inventory"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        {{ $t("fundingTableOptions.delete") }}

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
  name: "fundingInfo",
  data() {
    return {
      visibleColumns: ["title", "categories", "owner"]
    };
  },
  computed: {
    data() {
      return (
        !!this.$store.state.funding.fundings &&
        this.$store.state.funding.fundings
      );
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
          name: "title",
          align: "left",
          label: this.$t("fundingsColsHome.title"),
          field: row => row.title,
          sortable: true
        },
        {
          name: "categories",
          align: "left",
          label: this.$t("fundingsColsHome.categories"),
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            "No Categories",
          sortable: true
        },
        {
          name: "owner",
          align: "left",
          label: "Owner",
          field: row => (!!row.owner && row.owner.username) || "No Author",
          sortable: true
        }
      ];
    }
  },
  methods: {
    getData() {
      this.$store.dispatch("funding/getFundings");
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
