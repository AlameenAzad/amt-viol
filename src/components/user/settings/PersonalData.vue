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
          <!-- TODO add a placeholder image when no image is chosen -->
          <q-img
            class="radius-10"
            spinner-color="primary"
            :src="form.profileImage"
            style="height: 160px; max-width: 160px"
          />
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
        <div class="col-12 bg-yellow-10 radius-6">
          <q-checkbox
            color="primary"
            class="dataVisible font-16 q-py-sm"
            right-label
            v-model="form.dataVisible"
          >
            {{ $t("personalData.contactUser") }}
          </q-checkbox>
        </div>
      </div>
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
      form: {
        profileImage: "https://placeimg.com/500/300/nature",
        fullName: "",
        administration: "",
        email: "",
        telephone: "",
        location: "",
        dataVisible: false
      },
      isLoading: false
    };
  },
  methods: {
    setData() {
      this.form.email = this.user.email;
      this.form.fullName = this.userDetails.fullName || "";
      this.form.telephone = this.userDetails.phone || "";
      this.form.location = this.userDetails.location || "";
      this.form.administration = this.userDetails.municipality.title;
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
                location: this.form.location
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
</style>
