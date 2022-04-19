<template>
  <q-page class="q-mx-xl q-mt-lg">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Project Ideas
    </p>
    <div class="bg-white radius-20 q-py-lg q-px-md">
      <q-form ref="newProjectIdeaForm" class="q-gutter-lg q-px-md q-mb-md">
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
              v-model="form.title"
              :rules="[]"
            />
          </div>
        </div>
        <p class="text-red">Please fill these manually for now :) ~Bilend</p>
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
                  v-model="form.info.contactName"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  disable
                  class="no-shadow input-radius-6"
                  placeholder="Administration"
                  :value="!!userDetails && userDetails.municipality.location"
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
                  v-model="form.info.streetNo"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Postal Code, City"
                  v-model="form.info.postalCode"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Telefon"
                  v-model="form.info.phone"
                  :rules="[]"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="E-Mail"
                  v-model="form.info.email"
                  :rules="[]"
                />
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Location with geoinformation"
                  v-model="form.info.location"
                  :rules="[]"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="row"
          :class="form.editors.length > 0 ? 'items-baseline' : 'items-center'"
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              Invite Editor
            </p>
          </div>
          <div class="col-8">
            <UserSelect @update:user="form.editors = $event" />
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
              {{
                form.visibility === "only for me"
                  ? "This Document is visible only for you"
                  : form.visibility === "all users"
                  ? "This Document is visible for all Users"
                  : form.visibility === "listed only"
                  ? "This document is listed only"
                  : ""
              }}
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
              v-model="form.details.content"
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
              v-model="form.details.goals"
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
              v-model="form.details.valuesAndBenefits"
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
              v-model="form.details.partner"
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
              v-model="form.details.investive"
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
              v-model="form.details.status"
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
                  v-model="form.plannedStart"
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
                        <q-date v-model="form.plannedStart" mask="YYYY-MM-DD">
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
                  v-model="form.plannedEnd"
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
                        <q-date v-model="form.plannedEnd" mask="YYYY-MM-DD">
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
          :class="form.links.length > 0 ? 'items-baseline' : 'items-center'"
        >
          <div class="col-4">
            <p class="font-16 no-margin">
              Links
            </p>
          </div>
          <div class="col-8">
            <Links @update:link="updateLinks" />
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
          <div class="col-8">
            <q-file
              flat
              v-model="form.files"
              class="uploadInput input-radius-6 text-white"
              label-color="white"
              dark
              bg-color="primary"
              label="Select files"
              multiple
              use-chips
              style="max-width: 200px"
            >
              <template v-slot:prepend>
                <q-icon color="white" class="on-right" name="upload" />
              </template>
            </q-file>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row justify-center">
          <q-btn
            label="Save Draft"
            @click="submitNewProjectIdea(false)"
            size="16px"
            outline
            color="primary"
            :loading="isLoading"
            no-caps
            class="radius-6 q-px-xl q-py-xs q-mr-md"
          />
          <q-btn
            label="Publish"
            @click="submitNewProjectIdea(true)"
            size="16px"
            color="primary"
            :loading="isLoading"
            no-caps
            class="radius-6 q-px-xl q-py-xs q-ml-md"
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
      form: {
        title: "",
        plannedStart: "",
        plannedEnd: "",
        visibility: "only for me",
        info: {
          contactName: "",
          phone: "",
          email: "",
          location: "",
          streetNo: "",
          postalCode: ""
        },
        details: {
          content: "",
          goals: "",
          valuesAndBenefits: "",
          partner: "",
          investive: null,
          status: "Development"
        },
        municipality: "",
        editors: [],
        categories: [],
        tags: [],
        estimatedCosts: [],
        links: [],
        fundingGuidelines: "",
        files: null
      },
      visibilityOptions: ["only for me", "all users", "listed only"],
      investiveNoninvestiveOptions: [
        { label: "Investive", value: true },
        { label: "Nicht-investiv", value: false }
      ],
      projectStatuses: [
        { label: "Idea", value: "Idea" },
        { label: "Development", value: "Development" },
        { label: "Pre-Planing", value: "Pre-planning" },
        { label: "Detailed-Planning", value: "Detailed-planning" }
      ],
      isLoading: false
    };
  },
  methods: {
    submitNewProjectIdea(val) {
      const published = val;
      this.$refs.newProjectIdeaForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          const res = await this.$store.dispatch(
            "project/createNewProjectIdea",
            {
              data: {
                ...this.form,
                published: published,
                // info: {
                //   ...this.form.info,
                //   contactName: this.userDetails.fullName,
                //   phone: this.userDetails.phone,
                //   email: this.user.email,
                //   location: this.userDetails.location,
                //   streetNo: "",
                //   postalCode: ""
                // },
                municipality: {
                  id:
                    this.userDetails.municipality &&
                    this.userDetails.municipality.id
                },
                owner: {
                  id: this.user && this.user.id
                }
              }
            }
          );
          this.isLoading = false;
        } else {
          console.log("error");
        }
      });
    },
    updateEstimatedCosts(val) {
      this.form.estimatedCosts = val;
    },
    updateLinks(val) {
      this.form.links = val;
    }
  },
  computed: {
    userDetails() {
      return (
        this.$store.state.userCenter.user &&
        this.$store.state.userCenter.user.userDetails
      );
    },
    user() {
      return this.$store.state.userCenter.user;
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
.uploadInput {
}
</style>
