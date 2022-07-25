<template>
  <q-dialog v-model="$_options">
    <q-card class="q-px-xl radius-10 column">
      <q-card-section align="center">
        <h6 class="text-center font-20 q-mt-md q-mb-none">
          {{ "Loggin you out" }}
        </h6>
      </q-card-section>
      <q-card-section align="left"
        ><div class=" items-center text-center ">
          <p>
            {{ "Are you sure you want to logout?" }}
          </p>
          <q-checkbox
            class=""
            v-model="showAgain"
            label="Don't Show this dialog again."
          /></div
      ></q-card-section>
      <q-card-section class="q-pt-none text-center">
        <div class="row justify-center q-ml-lg ">
          <q-btn
            label="Cancel"
            outline
            v-close-popup
            size="14px"
            color="primary"
            no-caps
            class="no-shadow radius-6 q-px-xl  q-mr-sm "
          />
          <q-btn
            label="Confirm"
            unelevated
            size="14px"
            color="red"
            no-caps
            class="no-shadow radius-6 q-px-xl q-py-sm"
            @click="logout"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "logoutDialog",
  props: {
    dialogState: { type: Boolean, default: false }
  },
  data() {
    return {
      showAgain: false,
      isLoading: false
    };
  },
  methods: {
    logout() {
      if (this.showAgain) {
        localStorage.setItem("showLogoutDialog", false);
      }
      this.$store.dispatch("userCenter/logout");
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
