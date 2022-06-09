<template>
  <q-page class="column items-center q-mt-xl">
    <h3 class="text-center  q-mt-md">User Details</h3>
    <q-card class="q-pa-lg radius-10">
      <q-form
        @submit.prevent="updateUserInformation"
        ref="updateUserForm"
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
              dense
              class="no-shadow input-radius-6"
              v-model="form.username"
              :rules="[]"
              placeholder="Name"
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
            <MunicipalitySelect
              :currentMunicipality="form.municipality"
              @update:municipality="form.municipality = $event"
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
              dense
              class="no-shadow input-radius-6"
              v-model="form.email"
              :rules="[]"
              placeholder="wilson.culhane@mail.com"
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
              dense
              :options="options"
              options-selected-class="text-primary text-weight-600"
              class="no-shadow input-radius-6"
              v-model="form.role"
              :rules="[]"
              placeholder="Role"
            />
          </div>
        </div>

        <div class="row justify-center q-ml-lg ">
          <q-btn
            @click="updateUserInformation"
            label="Save Changes"
            size="16px"
            color="primary"
            no-caps
            unelevated
            class="no-shadow radius-6 q-px-xl q-mr-sm  "
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
            v-close-popup
            type="submit"
            size="16px"
            color="primary"
            no-caps
            class="no-shadow radius-6 q-px-xl q-mr-sm"
            :loading="isLoading"
          />
          <q-btn
            label="Confirm"
            type="submit"
            size="16px"
            color="red"
            no-caps
            class="no-shadow radius-6 q-px-xl"
            :loading="isLoading"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import MunicipalitySelect from "components/Municipality/MunicipalitySelect.vue";
export default {
  components: {
    MunicipalitySelect
  },
  data() {
    return {
      options: ["admin", "user"],
      showDialog: false,
      isLoading: false,
      form: {
        username: "",
        email: "",
        role: "",
        municipality: { id: null, title: "" }
      },
      dataRight: ""
    };
  },
  methods: {
    getUserData() {
      const { id } = this.$route.params;
      if (id) {
        let currentUser = this.$store.state.userCenter.users.find(user => {
          return user.id == id;
        });
        this.form.username = currentUser.username;
        this.form.email = currentUser.email;
        this.form.municipality.id = currentUser.user_detail.municipality.id;
        this.form.municipality.title =
          currentUser.user_detail.municipality.title;
        this.form.role = currentUser.role.type;
        // this.form.municipality = {
        //   id: currentUser.user_detail.municipality.id,
        //   title: currentUser.user_detail.municipality.title
        // };
        console.log("currentUser", currentUser);
      } else {
        this.$router.push("/Administation/User");
      }
    },
    updateUserInformation() {
      this.$refs.updateUserForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          const res = await this.$store.dispatch("userCenter/updateUser", {
            id: this.$route.params.id,
            data: {
              ...this.form,
              municipality: { id: this.form.municipality.id }
            }
          });
          this.isLoading = false;
        } else {
          console.log("error");
        }
      });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>
