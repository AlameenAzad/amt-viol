<template>
  <q-dialog v-model="$_options">
    <q-card
      class="radius-10 q-px-lg q-pt-lg q-pb-md"
      style="width: 570px; max-width: 80vw;"
    >
      <q-card-section>
        <q-form ref="loginForm" @submit.prevent="login" class="q-gutter-lg">
          <div class="row">
            <div class="col-12">
              <p class="q-mb-sm font-16">Email</p>
              <q-input
                outlined
                dense
                class="no-shadow input-radius-6"
                v-model="form.identifier"
                :rules="[val => !!val || 'Field is required']"
              />
            </div>
            <div class="col-12 q-mt-lg">
              <p class="q-mb-sm font-16">Password</p>
              <q-input
                outlined
                dense
                type="password"
                class="no-shadow input-radius-6"
                v-model="form.password"
                :rules="[val => !!val || 'Field is required']"
              />
            </div>
          </div>
          <p class="no-margin text-red text-center">{{ errorMsg }}</p>
          <div class="row justify-center">
            <div class="col-5 text-center">
              <q-btn
                type="submit"
                class="radius-10 full-width"
                padding="12px 12px"
                color="yellow"
                text-color="black"
                unelevated
                :loading="isLoading"
              >
                Login<template v-slot:loading>
                  {{ loginMessages }}
                  <q-circular-progress
                    indeterminate
                    class="on-right"
                  /> </template
              ></q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "loginDialog",
  props: {
    dialogState: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {
        identifier: "",
        password: ""
      },
      errorMsg: "",
      isLoading: false
    };
  },
  methods: {
    async login() {
      if (!!this.form.identifier && !!this.form.password) {
        this.isLoading = true;
        const res = await this.$store.dispatch("userCenter/login", this.form);
        this.isLoading = false;
        this.errorMsg = res;
        if (res === true) {
          this.$_options = false;
          this.isLoading = false;
          this.errorMsg = "";
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
        this.form.identifier = "";
        this.form.password = "";
      }
    },
    loginMessages() {
      return this.$store.state.userCenter.loadingMessages;
    }
  }
};
</script>

<style></style>
