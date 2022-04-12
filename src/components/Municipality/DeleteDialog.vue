<template>
  <q-dialog v-model="$_options">
    <q-card class="q-pa-lg radius-10">
      <q-card-section>
        <h6 class="text-center font-24 q-mt-none">Delete Administration</h6>
        <p class="text-center text-weight-light">
          Do you really want to delete this administration? This cannot be
          <br />
          undone.
        </p>
        <p class="text-center q-mt-lg text-weight-light">
          All data and rights are transferred to another member.
        </p>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center q-ml-lg ">
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
            label="Approve"
            type="submit"
            unelevated
            size="16px"
            color="red"
            no-caps
            class="no-shadow radius-6 q-px-xl"
            :loading="isLoading"
            @click="deleteMunicipality"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "deleteMunicipalityDialog",
  props: {
    dialogState: { type: Boolean, default: false },
    id: { type: Number, default: null }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async deleteMunicipality() {
      if (!!this.id) {
        this.isLoading = true;
        const res = await this.$store.dispatch(
          "municipality/delteMunicipality",
          { id: this.id }
        );
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
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
        this.$emit("update", val);
      }
    }
  }
};
</script>

<style></style>
