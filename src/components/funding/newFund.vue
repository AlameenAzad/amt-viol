<template>
  <q-page class="q-mx-xl q-mt-lg">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Fundings
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
              Funding guidelines
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="official title"
              v-model="form.FundingGuidelines"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              funding provider
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="funding provider"
                  v-model="form.fundingProvider"
                  :rules="[]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-baseline">
          <div class="col-4">
            <p class="font-16 no-margin">
              Contact person
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Name, Surname"
                  v-model="form.NameSurname"
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
                  placeholder="Street, Nr."
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
                  <span class="text-grey"> Auf Anfrage </span>
                </template>
              </template></q-select
            >
            <p class="font-16 q-mb-none q-mt-md text-grey">
              <!-- TODO make this text dynamic -->
              Benutzer können nur allgemeine Informationen zum Dokument und
              Kontaktdaten des Projektkoordinators einsehen. Um das vollständige
              Dokument anzuzeigen, muss der Benutzer Ihnen eine Anfrage senden.
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
              funding goal
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Förderziel"
              v-model="form.Förderziel"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              What is funded?
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Was wird gefördert"
              v-model="form.whatFunded"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              What is not funded?
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Kooperationspartner"
              v-model="form.notFunded"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Conditions for Applicants
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Rahmenbedingungen für Antragsteller"
              v-model="form.ConditionsApplicants"
              :rules="[]"
            />
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
            form.fundingRates.length > 0 ? 'items-baseline' : 'items-center'
          "
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              funding rates
            </p>
          </div>
          <div class="col-8">
            <FundingRate @update:cost="updateFundingRates" />
          </div>
        </div>

        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Own contribution
            </p>
          </div>
          <div class="col-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Select funding guidlines"
              v-model="form.ownContribution"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Accumulability
            </p>
          </div>
          <div class="col-8">
            <q-select
              outlined
              :options="options"
              class="no-shadow input-radius-6"
              v-model="accumulability"
              :rules="[]"
              label="Kumulierbarkeit"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Link to fundings
            </p>
          </div>
          <div class="col-8">
            <q-select
              outlined
              :options="options"
              class="no-shadow input-radius-6"
              v-model="fundingLink"
              :rules="[]"
              label="Fördermittel auswählen"
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
              Funding Period
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
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
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
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
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
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Notes to the funding period
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  v-model="form.fundNote"
                  color="primary"
                  bg-color="white"
                  label="Hinweise zum Förderzeitraum"
                >
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
            form.fundingRates.length > 0 ? 'items-baseline' : 'items-center'
          "
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              Links
            </p>
          </div>
          <div class="col-8">
            <Links @update:link="updateFundingRates" />
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
              Uploads
            </p>
          </div>
          <div class="col-4">
            <div class="row q-col-gutter-x-md">
              <div class="col-12">
                <q-btn
                  color="blue"
                  icon="upload"
                  unelevated
                  class="no-shadow radius-6 text-weight-600 "
                  no-caps
                >
                  <p class="q-mb-none q-mx-md q-my-sm">Select Files</p>
                </q-btn>
              </div>
            </div>
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
              Link to project ideas (optional)
            </p>
          </div>
          <div class="col-8">
            <q-select
              outlined
              :options="options"
              class="no-shadow input-radius-6"
              v-model="linkToProject"
              :rules="[]"
              label="Select project"
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
              Link to implementation checklist (optional)
            </p>
          </div>
          <div class="col-8">
            <q-select
              outlined
              :options="options"
              class="no-shadow input-radius-6"
              v-model="linkImplementationChecklist"
              :rules="[]"
              label="Select Implementation checklist"
            />
          </div>
        </div>
        <div class="row justify-center q-ml-lg ">
          <q-btn
            label="Save Draft"
            outline
            type="submit"
            size="16px"
            color="primary"
            no-caps
            class="no-shadow radius-6 q-px-lg  q-mr-sm "
          />
          <q-btn
            label="Publish"
            type="submit"
            unelevated
            size="16px"
            color="primary"
            no-caps
            class="  no-shadow q-px-lg	 radius-6 q-px-xl   "
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import UserSelect from "components/user/UserSelect.vue";
import Categories from "components/projects/create/Categories.vue";
import Tags from "components/projects/create/Tags.vue";
import FundingRate from "src/components/funding/FundingRate.vue";
import Links from "src/components/funding/Links.vue";
export default {
  name: "newProjectIdea",
  components: {
    UserSelect,
    Categories,
    Tags,
    FundingRate,
    Links
  },
  data() {
    return {
      componentKey: 0,
      accumulability: "",
      fundingLink: "",
      linkToProject: "",
      linkImplementationChecklist: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],

      form: {
        FundingGuidelines: "",
        fundingProvider: "",
        NameSurname: "",
        streetAndNr: "",
        PostalCodeCity: "",
        telephone: "",
        email: "",
        editorsInvited: [],
        visibility: "",
        Förderziel: "",
        whatFunded: "",
        notFunded: "",
        ownContribution: "",
        fundNote: "",

        categories: [],
        tags: [],
        projectContent: "",
        projectGoals: "",
        projectValuesAndBenefits: "",
        coorperationPartners: "",
        investiveNoninvestive: "",
        projectStatus: "",
        fundingRates: [],
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
    updateFundingRates(val) {
      this.form.fundingRates = val;
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
