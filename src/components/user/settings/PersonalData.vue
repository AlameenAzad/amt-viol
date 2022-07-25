<template>
  <div>
    <h6 class="text-center font-24 q-mt-md">
      {{ $t("personalData.personalData") }}
    </h6>
    <q-form
      ref="personalDataForm"
      @submit.prevent="savePersonalData"
      class="q-gutter-lg q-px-md q-mb-md"
    >
      <div class="row justify-center">
        <div class="col-12 text-center">
          <q-img
            v-if="profileImage"
            class="radius-10 profileImage"
            spinner-color="primary"
            :src="`${appUrl}${profileImage}`"
            style="height: 160px; max-width: 160px"
          />
          <div class="flex flex-center" v-else style="height: 160px">
            <h6 class="text-grey">No Profile Image</h6>
          </div>
        </div>
      </div>
      <div class="row justify-center q-mt-sm">
        <div
          class="flex justify-between"
          style="width: 160px; max-width: 160px"
        >
          <a
            @click.prevent="changeImage()"
            class="font-16 text-primary text-weight-600 cursor-pointer text-underline"
            >{{ $t("personalData.change") }}</a
          >
          <a
            @click.prevent="deleteImage()"
            class="font-16 text-red text-weight-600 cursor-pointer text-underline"
          >
            {{ $t("personalData.delete") }}</a
          >
          <!-- <q-btn
                label="Delete"
                size="16px"
                color="primary"
                flat
                no-caps
                class="d-inline radius-6 no-padding no-margin text-underline"
              /> -->
        </div>
        <div class="">
          <!-- <q-btn
                label="Delete"
                size="16px"
                color="red"
                flat
                no-caps
                class="d-inline radius-6 no-padding no-margin text-underline"
              /> -->
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Name
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="form.fullName"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            {{ $t("personalData.administration") }}
          </p>
        </div>
        <div class="col-9">
          <q-input
            disable
            outlined
            class="no-shadow input-radius-6"
            v-model="form.administration"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Email
          </p>
        </div>
        <div class="col-9">
          <q-input
            disable
            outlined
            class="no-shadow input-radius-6"
            v-model="form.email"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            {{ $t("personalData.telephone") }}
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="form.telephone"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            {{ $t("personalData.location") }}
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="form.location"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Street No
            <!-- TODO translate this {{ $t("personalData.location") }} -->
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="form.streetNo"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            PostalCode
            <!-- TODO translate this {{ $t("personalData.location") }} -->
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="form.postalCode"
            :rules="[]"
          />
        </div>
      </div>
      <!-- <div class="row items-center">
        <div class="col-12 bg-yellow-10 radius-6">
          <q-checkbox
            color="primary"
            class="dataVisible font-16 q-py-sm"
            right-label
            v-model="form.contactPrivacy"
          >
            {{ $t("personalData.contactUser") }}
          </q-checkbox>
        </div>
      </div> -->
      <div class="row justify-center">
        <q-btn
          type="submit"
          :loading="isLoading"
          size="16px"
          color="primary"
          no-caps
          class="radius-6 q-px-xl q-py-sm"
        >
          {{ $t("personalData.saveChanges") }}
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "personalDataTab",
  data() {
    return {
      profileImage: null,
      form: {
        fullName: "",
        administration: "",
        email: "",
        telephone: "",
        location: "",
        streetNo: "",
        postalCode: "",
        contactPrivacy: false
      },
      isLoading: false
    };
  },
  methods: {
    setData() {
      this.profileImage = this.userDetails.profile?.url || null;
      this.form.email = this.user.email;
      this.form.fullName = this.userDetails.fullName || "";
      this.form.telephone = this.userDetails.phone || "";
      this.form.location = this.userDetails.location || "";
      this.form.administration = this.userDetails.municipality.title;
      this.form.streetNo = this.userDetails.streetNo || "";
      this.form.postalCode = this.userDetails.postalCode || "";
      this.form.contactPrivacy = this.userDetails.contactPrivacy || false;
    },
    changeImage() {
      console.log("Clicked change image");
    },
    deleteImage() {
      console.log("Clicked Delete image");
    },
    savePersonalData() {
      this.$refs.personalDataForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          const res = await this.$store.dispatch(
            "userCenter/updatePersonalData",
            {
              data: {
                fullName: this.form.fullName,
                phone: this.form.telephone,
                location: this.form.location,
                streetNo: this.form.streetNo,
                postalCode: this.form.postalCode,
                contactPrivacy: this.form.contactPrivacy
              }
            }
          );
          this.isLoading = false;
          if (res !== false) {
          }
        } else {
          console.log("error");
        }
      });
    }
  },
  mounted() {
    this.setData();
  },
  computed: {
    appUrl() {
      return process.env.VUE_APP_MAIN_URL;
    },
    userDetails() {
      return (
        this.$store.state.userCenter.user &&
        this.$store.state.userCenter.user.userDetails
      );
    },
    user() {
      return this.$store.state.userCenter.user.user;
    }
  }
};
</script>

<style lang="scss">
.dataVisible .q-checkbox__bg {
  background: transparent;
}
.dataVisible .q-checkbox__bg svg {
  color: $primary;
  padding: 2px;
}
.profileImage div.q-img__image {
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
</style>
