<template>
  <q-page class="q-mx-xl q-mt-lg">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Project Ideas
    </p>
    <div class="bg-white radius-20 q-py-lg">
      <q-form
        ref="personalDataForm"
        @submit.prevent="savePersonalData"
        class="q-gutter-lg q-px-md q-mb-md"
      >
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Project Name
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Title"
              v-model="form.projectName"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Contact Person
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Name, Surname"
                  v-model="form.nameAndSurname"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Administration"
                  v-model="form.administration"
                  :rules="[]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-baseline">
          <div class="col-4">
            <p class="font-16 no-margin">
              Contact Details (optional)
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Steet, Nr."
                  v-model="form.streetAndNr"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Postal Code, City"
                  v-model="form.postalCodeAndCity"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Telefon"
                  v-model="form.telephone"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="E-Mail"
                  v-model="form.email"
                  :rules="[]"
                />
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Location with geoinformation"
                  v-model="form.locWithGeoInfo"
                  :rules="[]"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="row"
          :class="
            form.editorsInvited.length > 0 ? 'items-baseline' : 'items-center'
          "
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              Invite Editor
            </p>
          </div>
          <div class="col-8">
            <div
              v-for="(editor, index) in form.editorsInvited"
              :key="index + 1"
              class="row q-col-gutter-x-md q-col-gutter-y-lg items-center q-mb-lg"
            >
              <div class="col-11">
                <UserSelect
                  :key="componentKey"
                  :editor="editor"
                  @update:editor="updateEditor(index, $event)"
                />
              </div>
              <div class="col-1">
                <q-btn
                  @click="removeEditor(index)"
                  icon="delete"
                  flat
                  round
                  color="red"
                  size="md"
                />
              </div>
            </div>
            <div class="row">
              <q-btn
                @click="addEditor"
                outline
                class="q-mt-md radius-6"
                icon="add"
                size="md"
                color="primary"
                label="Add Editor"
              />
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">Visibility</p>
          </div>
          <div class="col-8">
            <q-select
              outlined
              dense
              v-model="form.visibility"
              :options="visibilityOptions"
              class="no-shadow input-radius-6"
              options-selected-class="text-primary"
            >
              <template v-slot:selected>
                <template v-if="form.visibility">
                  {{ form.visibility }}
                </template>
                <template v-else>
                  <span class="text-grey">
                    Choose an option
                  </span>
                </template>
              </template></q-select
            >
            <p class="font-16 q-mb-none q-mt-md text-grey">
              This Document is visible for all Users
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import UserSelect from "components/user/Select/UserSelect.vue";
export default {
  name: "index",
  components: {
    UserSelect
  },
  data() {
    return {
      componentKey: 0,
      form: {
        projectName: "",
        nameAndSurname: "",
        administration: "",
        streetAndNr: "",
        postalCodeAndCity: "",
        telephone: "",
        email: "",
        locWithGeoInfo: "",
        editorsInvited: [],
        visibility: ""
      },
      visibilityOptions: ["Google", "Facebook"]
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    addEditor() {
      this.form.editorsInvited.push("");
    },
    removeEditor(index) {
      console.log("index :>> ", index);
      this.form.editorsInvited.splice(index, 1);
      this.forceRerender();
    },
    updateEditor(index, value) {
      this.form.editorsInvited[index] = value;
      this.forceRerender();
    }
  }
};
</script>
