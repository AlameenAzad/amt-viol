<template>
  <q-page class="bg-white q-pa-md flex flex-center">
    <q-card class="q-pa-lg radius-10 shadow-1" style="width: 600px;">
      <div>
        <h6 class="text-center font-24 q-mt-md">Reset Password</h6>
        <q-form
          @submit.prevent.stop="resetPassword"
          class="q-gutter-md q-px-md q-mb-md "
        >
          <div class="row items-baseline">
            <div class="col-3">
              <p class="font-14 no-margin">
                Password*
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.password"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div class="row items-start">
            <div class="col-3">
              <p class="font-14 no-margin q-pr-md">
                Confirm Password*
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.passwordConfirm"
                :rules="[
                  val =>
                    (!!val && val === form.password) || 'Passwords don\'t match'
                ]"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
          </div>

          <div class="row justify-center q-ml-lg ">
            <q-btn
              label="Reset Password"
              type="submit"
              unelevated
              size="16px"
              color="primary"
              no-caps
              :loading="isLoading"
              class="no-shadow radius-6 q-px-xl full-width"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "resetPassword",
  data() {
    return {
      form: {
        password: "",
        passwordConfirm: ""
      },
      isLoading: false
    };
  },
  methods: {
    async resetPassword() {
      const { code } = this.$route.query;
      if (this.form.password && this.form.passwordConfirm && code) {
        this.isLoading = true;
        const res = await this.$store.dispatch("userCenter/resetPassword", {
          data: {
            password: this.form.password,
            passwordConfirmation: this.form.passwordConfirm,
            code
          }
        });
        this.isLoading = false;
        if (res !== false) {
          this.form.password = "";
          this.form.passwordConfirm = "";
        }
      }
    }
  }
};
</script>
