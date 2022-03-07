<template>
  <q-page class="q-mx-xl q-mt-lg">
    <q-tabs
      v-model="tab"
      align="justify"
      indicator-color="transparent"
      class="q-mb-lg text-black"
      active-bg-color="yellow"
      no-caps
    >
      <q-tab class="q-pa-lg q-mr-lg radius-10 customBorder" name="generalData">
        <p class="font-20 no-margin">General Data</p>
      </q-tab>
      <q-tab class="q-pa-lg q-mr-lg radius-10 customBorder" name="personalData">
        <p class="font-20 no-margin">Personal Data</p>
      </q-tab>
      <q-tab
        class="q-pa-lg q-mr-lg radius-10 customBorder"
        name="notifications"
      >
        <p class="font-20 no-margin">Notifications</p>
      </q-tab>
    </q-tabs>

    <div class="overflow-hidden">
      <div class="row justify-center">
        <div class="col-7">
          <q-tab-panels class="radius-20 shadow-1" v-model="tab" animated>
            <q-tab-panel name="generalData">
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
            </q-tab-panel>

            <q-tab-panel name="personalData">
              <h6 class="text-center font-24 q-mt-md">Personal Data</h6>
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
            </q-tab-panel>

            <q-tab-panel name="notifications">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      tab: "personalData",
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

<style lang="scss">
.customBorder {
  border: 2px solid $yellow;
}
</style>
