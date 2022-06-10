<template>
  <div class="q-mt-lg q-ma-xl">
    <div class="row q-col-gutter-md">
      <div class="col-auto">
        <q-card class="left-card radius-20">
          <q-card-section>
            <!-- TODO make this q-img -->
            <img class="logo" al src="../../assets/Wappen.png" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-grow">
        <q-card class="radius-20 bg-blue-1 right-card">
          <q-card-section>
            <h6 class="q-mt-none q-mb-sm">
              {{ !!municipality && municipality.title }}
            </h6>
            <div class="row">
              <p class="label">{{ $t("DetailsAdministration.location") }}:</p>
              <p class="q-ml-lg">
                {{ !!municipality && municipality.location }}
              </p>
            </div>
            <div class="row">
              <p class="label">{{ $t("DetailsAdministration.user") }}</p>
              <div
                v-if="
                  !!municipality &&
                    municipality.users.length > 0 &&
                    municipality.users
                "
                class="q-ml-xl"
              >
                <p>Phillip Westervelt</p>
                <p>James Stanton</p>
                <p>Jaxson Carder</p>
              </div>
            </div>
            <q-btn
              class="more"
              size="md"
              color="primary"
              round
              flat
              dense
              icon="more_vert"
            >
              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 140px">
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("DetailsAdministration.edit") }}
                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right text-red font-14">
                        {{ $t("DetailsAdministration.delete") }}
                        <q-icon size="sm" class="text-red" name="delete"/></span
                    ></q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-table
      class="radius-20 shadow-1 q-mt-md"
      :title="$t('DetailsAdministration.data')"
      :data="!!municipality && municipality.data"
      :columns="columns"
      row-key="name"
      :hide-bottom="municipality.data && municipality.data.length > 0"
      no-data-label="No data for this municipality"
      :pagination="{
        rowsPerPage: 0
      }"
    >
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
            class="font-14	"
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
                        {{ $t("DetailsAdministration.view") }}
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="visibility"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("DetailsAdministration.edit") }}

                        <q-icon size="sm" class="text-blue" name="edit"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("DetailsAdministration.bookmark") }}

                        <q-icon size="sm" class="text-blue" name="star"/></span
                    ></q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14">
                        {{ $t("DetailsAdministration.archive") }}
                        <q-icon
                          size="sm"
                          class="text-blue"
                          name="archive"/></span
                    ></q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><span class="text-right font-14 text-red">
                        {{ $t("DetailsAdministration.delete") }}

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
  data() {
    return {
      municipality: {}
    };
  },
  methods: {
    getMunicipalityData() {
      const { id } = this.$route.params;
      if (id) {
        const municipality = this.$store.state.municipality.municipalities.find(
          mun => {
            return mun.id == id;
          }
        );
        console.log("municipality", municipality);
        this.municipality = municipality;
        // this.form.username = currentUser.username;
        // this.form.email = currentUser.email;
        // this.form.municipality.id = currentUser.user_detail.municipality.id;
        // this.form.municipality.title =
        //   currentUser.user_detail.municipality.title;
        // this.form.role = currentUser.role.type;
        // this.form.municipality = {
        //   id: currentUser.user_detail.municipality.id,
        //   title: currentUser.user_detail.municipality.title
        // };
      } else {
        this.$router.push("/Administation/Areas");
      }
    }
  },
  mounted() {
    this.getMunicipalityData();
  },
  computed: {
    columns() {
      return [
        {
          name: "title",
          required: true,
          label: this.$t("DetailsAdministration.title"),
          align: "left",
          field: row => row.title,
          sortable: true
        },
        {
          name: "type",
          align: "left",
          label: this.$t("DetailsAdministration.type"),
          field: row => row.type,
          sortable: true
        },
        {
          name: "fat",
          label: this.$t("DetailsAdministration.categories"),
          field: row =>
            (!!row.categories &&
              row.categories.map(category => category.title).join(", ")) ||
            "No Categories",
          sortable: true,
          align: "left"
        },
        {
          name: "carbs",
          label: this.$t("DetailsAdministration.user"),
          field: "carbs",
          align: "left"
        }
      ];
    }
  }
};
</script>

<style scoped>
.logo {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
}
.label {
  color: rgba(22, 66, 139, 0.5);
}

.left-card {
  height: 223px;
}

.more {
  position: absolute;
  top: 1rem;
  right: 10px;
}
</style>
