<template>
  <div>
    <h6 class="text-center font-24 q-mt-md">Personal Data</h6>
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
            :src="profileImage"
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
            >Change</a
          >
          <a
            @click.prevent="deleteImage()"
            class="font-16 text-red text-weight-600 cursor-pointer text-underline"
          >
            Delete</a
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
            v-model="name"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Administration
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="administration"
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
            v-model="email"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Telephone
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="telephone"
            :rules="[]"
          />
        </div>
      </div>
      <div class="row items-center">
        <div class="col-3">
          <p class="font-16 no-margin">
            Location
          </p>
        </div>
        <div class="col-9">
          <q-input
            outlined
            class="no-shadow input-radius-6"
            v-model="location"
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
            v-model="dataVisible"
            label="Do you want your contact details to be visible to users?"
          />
        </div>
      </div>
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
  name: "personalDataTab",
  data() {
    return {
      profileImage: "https://placeimg.com/500/300/nature",
      name: "",
      administration: "",
      email: "",
      telephone: "",
      location: "",
      dataVisible: true
    };
  },
  methods: {
    changeImage() {
      console.log("Clicked change image");
    },
    deleteImage() {
      console.log("Clicked Delete image");
    },
    savePersonalData() {
      this.$refs.personalDataForm.validate().then(success => {
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
.dataVisible .q-checkbox__bg {
  background: transparent;
}
.dataVisible .q-checkbox__bg svg {
  color: $primary;
  padding: 2px;
}
</style>
