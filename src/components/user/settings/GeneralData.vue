<template>
  <div>
    <h6 class="text-center font-24 q-mt-md">
      {{ $t("generalData.generalData") }}
    </h6>
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
            {{ $t("generalData.currentPassword") }}
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
            {{ $t("generalData.newPassword") }}
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
            {{ $t("generalData.repeatPassword") }}
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
            {{ $t("generalData.transferData") }}
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
          >
            {{ $t("generalData.selectUser") }}
          </q-btn>
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
          >
            {{ $t("generalData.deleteGeneralData") }}
          </q-btn>
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10" />
      <div class="row justify-center">
        <q-btn
          type="submit"
          size="16px"
          color="primary"
          no-caps
          class="radius-6 q-px-xl q-py-sm"
        >
          {{ $t("generalData.saveChanges") }}
        </q-btn>
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
