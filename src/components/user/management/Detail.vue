<template>
  <q-page class="column items-center q-mt-xl  ">
    <h3 class="text-center  q-mt-md">User Details</h3>
    <q-card class="q-pa-lg radius-10">
      <div>
        <q-form
          @submit.prevent="saveGeneralData"
          class="q-gutter-lg q-px-md q-mb-md "
        >
          <div class="row items-center ">
            <div class="col-3">
              <p class="font-14 no-margin">
                Name
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="email"
                :rules="[]"
                label="E-Mail"
              />
            </div>
          </div>
          <div class="row items-center ">
            <div class="col-3 ">
              <p class="font-14 no-margin ">
                Administration
              </p>
            </div>
            <div class="col-9">
              <q-select
                outlined
                :options="options"
                class="no-shadow input-radius-6"
                v-model="role"
                :rules="[]"
                label="Municipality Name"
              />
            </div>
          </div>
          <div class="row items-center">
            <div class="col-3">
              <p class="font-14 no-margin">
                E-mail
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="administration"
                :rules="[]"
                label="wilson.culhane@mail.com"
              />
            </div>
          </div>
          <div class="row items-center justify-evenly">
            <div class="col-3">
              <p class="font-14 no-margin">
                Role
              </p>
            </div>
            <div class="col-9">
              <q-select
                outlined
                :options="options"
                class="no-shadow input-radius-6"
                v-model="role"
                :rules="[]"
                label="Project coordinator"
              />
            </div>
          </div>

          <div class="row justify-center q-ml-lg ">
            <q-btn
              label="Save Changes"
              type="submit"
              size="16px"
              color="primary"
              no-caps
              unelevated
              class="  no-shadow	 radius-6 q-px-xl  q-mr-sm  "
            />
            <q-btn
              label="Delete User"
              outline
              @click="showDialog = true"
              type="submit"
              size="16px"
              color="red"
              no-caps
              class="no-shadow radius-6 q-px-xl   "
            />
          </div>
        </q-form>
      </div>
    </q-card>
    <q-dialog v-model="showDialog">
      <q-card class="q-pa-lg radius-10 column  justify-center">
        <h6 class="text-center  q-mt-md q-mb-lg">Delete User</h6>
        <p
          class="text-center text-weight-light font-16
"
        >
          Do you really want to delete this user? All data and rights will be
          transferred to another user.
        </p>
        <div class="q-mt-sm q-ml-lg">
          <q-label class="font-16"
            >Select account to transfer the data and rights.
          </q-label>
          <q-select
            outlined
            :options="options"
            class="no-shadow input-radius-6 "
            v-model="dataRight"
            :rules="[]"
            label="Alfonso Lipshutz"
            dense
          />
        </div>
        <div class="row justify-center q-ml-lg q-mt-lg ">
          <q-btn
            label="Cancel"
            outline
            @click="showDialog = true"
            type="submit"
            size="16px"
            color="primary"
            no-caps
            class="no-shadow radius-6 q-px-xl q-mr-sm   "
          />
          <q-btn
            label="Confirm"
            type="submit"
            size="16px"
            color="red"
            no-caps
            class="  no-shadow	 radius-6 q-px-xl    "
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      showDialog: false,

      email: "",
      role: "",
      administration: "",
      dataRight: ""
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
