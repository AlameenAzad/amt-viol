<template>
  <q-page class="q-mx-xl q-mt-lg">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Project Ideas
    </p>
    <div class="bg-white radius-20 q-py-lg q-px-md">
      <q-form
        ref="newProjectIdeaForm"
        @submit.prevent="submitNewProjectIdea"
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
                class="radius-6"
                icon="add"
                size="md"
                color="primary"
                label="Add Editor"
              />
            </div>
          </div>
        </div>
        <div class="row items-baseline">
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
              <!-- TODO make this text dynamic -->
              This Document is visible for all Users
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">Filter Categories</p>
          </div>
          <div class="col-8">
            <Categories @update:category="form.categories = $event" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">Tags*</p>
          </div>
          <div class="col-8">
            <Tags @update:tag="form.tags = $event" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Project content*
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Describe the project"
              v-model="form.projectContent"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Project goals*
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Project goals"
              v-model="form.projectGoals"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              project values &amp; benefits*
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="project value &amp; benefits"
              v-model="form.projectValuesAndBenefits"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              cooperation partners (optional)
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="cooperation partners (optional)"
              v-model="form.coorperationPartners"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Investive/ non-investive*
            </p>
          </div>
          <div class="col-8">
            <q-btn-toggle
              v-model="form.investiveNoninvestive"
              spread
              no-caps
              toggle-color="yellow"
              padding="12px 10px"
              color="transparent"
              toggle-text-color="black"
              text-color="black"
              class="no-shadow toggleGap"
              :options="investiveNoninvestiveOptions"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              project status (optional)
            </p>
          </div>
          <div class="col-8">
            <q-btn-toggle
              v-model="form.projectStatus"
              spread
              no-caps
              toggle-color="yellow"
              padding="12px 10px"
              color="transparent"
              toggle-text-color="black"
              text-color="black"
              class="no-shadow toggleGap"
              :options="projectStatuses"
            />
          </div>
        </div>
        <div
          class="row"
          :class="
            form.estimatedCosts.length > 0 ? 'items-baseline' : 'items-center'
          "
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              Estimated Costs (optional)
            </p>
          </div>
          <div class="col-8">
            <EstimatedCost @update:cost="updateEstimatedCosts" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              funding guidlines (optional)
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Select funding guidlines"
              v-model="form.fundingGuidelines"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Planned Period
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  v-model="form.startDate"
                  color="primary"
                  bg-color="white"
                  placeholder="Start"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.startDate" mask="DD.MM.YYYY">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  v-model="form.endDate"
                  color="primary"
                  bg-color="white"
                  placeholder="End"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.endDate" mask="DD.MM.YYYY">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div
          class="row"
          :class="
            form.estimatedCosts.length > 0 ? 'items-baseline' : 'items-center'
          "
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              Links
            </p>
          </div>
          <div class="col-8">
            <Links @update:link="updateEstimatedCosts" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import UserSelect from "components/user/select/UserSelect.vue";
import Categories from "components/projects/create/Categories.vue";
import Tags from "components/projects/create/Tags.vue";
import EstimatedCost from "src/components/projects/create/EstimatedCost.vue";
import Links from "components/projects/create/Links.vue";
export default {
  name: "newProjectIdea",
  components: {
    UserSelect,
    Categories,
    Tags,
    EstimatedCost,
    Links
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
        visibility: "",
        categories: [],
        tags: [],
        projectContent: "",
        projectGoals: "",
        projectValuesAndBenefits: "",
        coorperationPartners: "",
        investiveNoninvestive: "",
        projectStatus: "",
        estimatedCosts: [],
        fundingGuidelines: "",
        startDate: "",
        endDate: ""
      },
      visibilityOptions: ["Google", "Facebook"],
      investiveNoninvestiveOptions: [
        { label: "Investive", value: "investive" },
        { label: "Nicht-investiv", value: "nonInvestive" }
      ],
      projectStatuses: [
        { label: "Idea", value: "idea" },
        { label: "Development", value: "development" },
        { label: "Pre-Planing", value: "pre-planning" },
        { label: "Detailed-Planning", value: "detailed-planning" }
      ]
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
      this.form.editorsInvited.splice(index, 1);
      this.forceRerender();
    },
    updateEditor(index, value) {
      this.form.editorsInvited[index] = value;
      this.forceRerender();
    },
    updateEstimatedCosts(val) {
      this.form.estimatedCosts = val;
    }
  }
};
</script>

<style lang="scss">
.toggleGap {
  gap: 15px;
  > button {
    border-radius: 10px !important;
    border: 1px solid $yellow;
  }
}
</style>
