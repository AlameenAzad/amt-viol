<template>
  <div>
    <h6 class="text-center font-24 q-mt-md">General Data</h6>
    <q-form
      ref="generalDataForm"
      @submit.prevent="saveGeneralData"
      class="q-gutter-lg q-px-md q-mb-md"
    >
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Email
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="email"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Current Password
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="currentPassword"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            New Password
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="newPassword"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Repeat New Password
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="newPasswordConfirm"
            :rules="[]"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10" />
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Transfer Data
          </p>
        </div>
        <div class="col-9">
          <q-btn
            outline
            no-caps
            size="16px"
            color="primary"
            class="text-weight-600 q-py-xs"
            label="Select User"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10" />
      <div class="row items-center">
        <div class="col-12">
          <q-btn
            flat
            no-caps
            icon="delete"
            size="16px"
            color="red"
            class="text-red q-py-xs"
            label="Delete General Data"
          >
          </q-btn>
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10" />
      <div class="row justify-center">
        <q-btn
          label="Save Changes"
          type="submit"
          size="16px"
          color="primary"
          no-caps
          class="radius-6 q-px-xl q-py-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "generalDataTab",
  data() {
    return {
      email: "",
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: ""
    };
  },
  methods: {
    saveGeneralData() {
      this.$refs.generalDataForm.validate().then(success => {
        if (success) {
          console.log("success");
        } else {
          console.log("error");
        }
      });
    }
  }
};
</script>

<style></style>
