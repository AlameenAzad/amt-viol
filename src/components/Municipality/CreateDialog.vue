<template>
  <q-dialog v-model="$_options">
    <q-card class="q-pa-lg radius-10">
      <div>
        <h6 class="text-center font-24 q-mt-md">Create Administration</h6>
        <q-form
          @submit.prevent="createMunicipality"
          class="q-gutter-sm q-px-md q-mb-md "
        >
          <div class="items-center ">
            <div class="col-3">
              <p class="font-14 no-margin">
                Title
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.title"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Administration name"
              />
            </div>
          </div>
          <div class=" items-center ">
            <div class="col-3 ">
              <p class="font-14 no-margin ">
                Location
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.location"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Administration Location"
              />
            </div>
          </div>
          <div class="row justify-center">
            <q-btn
              label="Cancel"
              outline
              v-close-popup
              size="16px"
              color="primary"
              no-caps
              class="no-shadow radius-6 q-px-xl q-mr-sm "
            />
            <q-btn
              label="Save"
              type="submit"
              unelevated
              size="16px"
              color="primary"
              no-caps
              class="no-shadow radius-6 q-px-xl"
              :loading="isLoading"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "createMunicipalityDialog",
  props: {
    dialogState: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {
        title: "",
        location: ""
      },
      isLoading: false
    };
  },
  methods: {
    async createMunicipality() {
      if (!!this.form.title && this.form.location) {
        this.isLoading = true;
        const res = await this.$store.dispatch(
          "municipality/createMunicipality",
          this.form
        );
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
          this.form.title = "";
          this.form.location = "";
        }
      }
    }
  },
  computed: {
    $_options: {
      get: function() {
        return this.dialogState;
      },
      set: function(val) {
        this.form.title = "";
        this.form.location = "";
        this.$emit("update", val);
      }
    }
  }
};
</script>

<style></style>
