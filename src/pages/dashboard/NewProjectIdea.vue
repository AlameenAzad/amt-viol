<template>
  <q-page class="q-mt-lg" :class="$q.screen.gt.sm ? 'q-mx-xl' : 'q-mx-sm'">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Project Ideas
    </p>
    <div class="bg-white radius-20 q-py-lg q-px-md">
      <q-form ref="newProjectIdeaForm" class="q-gutter-lg q-px-md q-mb-md">
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Project Name
            </p>
          </div>
          <div class="col-12 col-md-8">
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
        <div class="row items-center ">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Contact Person
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Name, Surname"
                  :value="!!userDetails && userDetails.fullName"
                  :rules="[]"
                  disable
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  disable
                  class="no-shadow input-radius-6"
                  placeholder="Administration"
                  :value="!!userDetails && userDetails.municipality.title"
                  :rules="[]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-baseline">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Contact Details (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div
              class="row q-col-gutter-x-md"
              :class="
                $q.screen.gt.sm ? 'q-col-gutter-y-lg' : 'q-col-gutter-y-md'
              "
            >
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Steet, Nr."
                  v-model="form.info.streetNo"
                  :rules="[]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Postal Code, City"
                  v-model="form.info.postalCode"
                  :rules="[]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Telefon"
                  :value="!!userDetails && userDetails.phone"
                  :rules="[]"
                  disable
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="E-Mail"
                  :value="!!user && user.email"
                  :rules="[]"
                  disable
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Invite Editor
            </p>
          </div>
          <div class="col-12 col-md-8">
            <UserSelect
              :editing="isEdit.editors"
              @update:user="form.editors = $event"
            />
          </div>
        </div>
        <div class="row items-baseline">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">Visibility</p>
          </div>
          <div class="col-12 col-md-8">
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">Filter Categories</p>
          </div>
          <div class="col-12 col-md-8">
            <Categories
              :editing="isEdit.categories"
              @update:category="form.categories = $event"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">Tags*</p>
          </div>
          <div class="col-12 col-md-8">
            <Tags :editing="isEdit.tags" @update:tag="form.tags = $event" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-start">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Project content*
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              type="textarea"
              rows="10"
              class="no-shadow input-radius-6"
              placeholder="Describe the project"
              v-model="form.details.content"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Project goals*
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              type="textarea"
              rows="10"
              class="no-shadow input-radius-6"
              placeholder="Project goals"
              v-model="form.details.goals"
              :rules="[]"
            />
            <!-- <q-editor
              v-model="form.details.goals"
              min-height="12rem"
              paragraph-tag="p"
              content-class=""
              class="no-shadow input-radius-6"
            /> -->
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              project values &amp; benefits*
            </p>
          </div>
          <div class="col-12 col-md-8">
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              cooperation partners (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Investive/ non-investive*
            </p>
          </div>
          <div class="col-12 col-md-8">
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              project status (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-btn-toggle
              v-model="form.details.status"
              :spread="$q.screen.gt.sm"
              no-caps
              clearable
              toggle-color="yellow"
              padding="12px 10px"
              color="transparent"
              toggle-text-color="black"
              text-color="black"
              class="no-shadow toggleGap"
              :class="{ flexWrap: $q.screen.lt.md }"
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Estimated Costs (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
            <EstimatedCost
              :editing="isEdit.estimatedCosts"
              @update:cost="form.estimatedCosts = $event"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              funding guidlines (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
            <Fundings
              :editing="isEdit.fundingGuideline"
              @update:linkToFunding="form.fundingGuideline = $event"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Planned Period
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  :value="dateFormatter(form.plannedStart)"
                  readonly
                  color="primary"
                  bg-color="white"
                  placeholder="Planned Start"
                  @click="$refs.qPlannedStartDateProxy.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qPlannedStartDateProxy"
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
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  :value="dateFormatter(form.plannedEnd)"
                  color="primary"
                  readonly
                  bg-color="white"
                  placeholder="Planned End"
                  @click="$refs.qPlannedEndDateProxy.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qPlannedEndDateProxy"
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Links
            </p>
          </div>
          <div class="col-12 col-md-8">
            <Links :editing="isEdit.links" @update:link="form.links = $event" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row items-baseline">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Uploads
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-file
                  flat
                  v-model="form.media"
                  class="uploadInput input-radius-6 text-white"
                  label-color="white"
                  dark
                  bg-color="primary"
                  :label="
                    !!form.media && form.media.length > 0
                      ? 'Add Images'
                      : 'Select Images'
                  "
                  multiple
                  display-value=""
                  append
                >
                  <template v-slot:prepend>
                    <q-icon color="white" class="on-right" name="upload" />
                  </template>
                </q-file>
                <div class="q-mt-sm" v-if="form.media && form.media.length > 0">
                  <q-item
                    v-for="(image, index) in form.media"
                    :key="index"
                    clickable
                  >
                    <q-item-section side>
                      <q-avatar rounded size="48px">
                        <q-img
                          :ratio="1"
                          contain
                          :src="imgPreview(image).url"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="ellipsis" caption>{{
                        imgPreview(image).name
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        icon="delete"
                        @click.prevent.stop="removeImg(index)"
                        size="sm"
                        round
                        text-color="red"
                        dense
                      >
                      </q-btn>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <q-file
                  flat
                  v-model="form.files"
                  class="uploadInput input-radius-6 text-white"
                  label-color="white"
                  dark
                  bg-color="primary"
                  :label="
                    !!form.files && form.files.length > 0
                      ? 'Add Files'
                      : 'Select Files'
                  "
                  multiple
                  display-value=""
                  append
                >
                  <template v-slot:prepend>
                    <q-icon color="white" class="on-right" name="upload" />
                  </template>
                </q-file>
                <div class="q-mt-sm" v-if="form.files && form.files.length > 0">
                  <q-item
                    v-for="(file, index) in form.files"
                    :key="index"
                    clickable
                  >
                    <q-item-section side>
                      <q-avatar rounded size="48px">
                        <small>{{ imgPreview(file).name.split(".")[1] }}</small>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="ellipsis" caption>{{
                        imgPreview(file).name
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        icon="delete"
                        @click.prevent.stop="removeFile(index)"
                        size="sm"
                        round
                        text-color="red"
                        dense
                      >
                      </q-btn>
                    </q-item-section>
                  </q-item>
                </div>
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
          :class="$q.screen.gt.sm ? 'justify-center' : 'justify-between'"
        >
          <q-btn
            :label="isEdit ? 'Edit as Draft' : 'Save Draft'"
            @click="
              isEdit ? editProjectIdea(false) : submitNewProjectIdea(false)
            "
            size="16px"
            outline
            color="primary"
            :loading="isLoading"
            no-caps
            class="radius-6 q-py-xs"
            :class="$q.screen.gt.sm ? 'q-mr-md q-px-xl' : 'q-px-sm'"
          />
          <q-btn
            :label="isEdit ? 'Edit' : 'Publish'"
            @click="isEdit ? editProjectIdea(true) : submitNewProjectIdea(true)"
            size="16px"
            color="primary"
            :loading="isLoading"
            no-caps
            class="radius-6 q-py-xs"
            :class="$q.screen.gt.sm ? 'q-ml-md q-px-xl' : 'q-px-md'"
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
import Fundings from "components/funding/Fundings.vue";
import { dateFormatter } from "src/boot/dateFormatter";

export default {
  name: "newProjectIdea",
  components: {
    UserSelect,
    Categories,
    Tags,
    EstimatedCost,
    Links,
    Fundings
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
          investive: true,
          status: ""
        },
        fundingGuideline: [],
        municipality: "",
        editors: [],
        categories: [],
        tags: [],
        estimatedCosts: [],
        links: [],
        media: null,
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
        { label: "Pre-Planning", value: "Pre-Planning" },
        { label: "Detailed-Planning", value: "Detailed-Planning" }
      ],
      isLoading: false
    };
  },
  //  TODO do I need to check for the route id so I get new data in case a user changes the id in the url
  methods: {
    dateFormatter,
    imgPreview(val) {
      return {
        url: !!val.id ? `${this.appUrl}${val.url}` : URL.createObjectURL(val),
        name: val.name
      };
    },
    removeImg(index) {
      this.form.media.splice(index, 1);
    },
    removeFile(index) {
      this.form.files.splice(index, 1);
    },
    submitNewProjectIdea(val) {
      const published = val;
      this.$refs.newProjectIdeaForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          await this.checkOptionalParameters();
          const res = await this.$store.dispatch(
            "project/createNewProjectIdea",
            {
              data: {
                ...this.form,
                published: published,
                info: {
                  ...this.form.info,
                  contactName: this.userDetails.fullName,
                  phone: this.userDetails.phone,
                  email: this.user.email
                  // location: this.userDetails.location
                  // TODO add some more required details
                },
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
    async checkOptionalParameters() {
      if (
        !!this.form.fundingGuideline &&
        this.form.fundingGuideline.length < 1
      ) {
        delete this.form.fundingGuideline;
      }
      if (!this.form.details.status) {
        delete this.form.details.status;
      }
    },
    editProjectIdea(val) {
      const published = val;
      this.$refs.newProjectIdeaForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          await this.checkOptionalParameters();
          const res = await this.$store.dispatch("project/editProjectIdea", {
            data: {
              ...this.form,
              published: published
              // info: {
              //   ...this.form.info,
              //   contactName: this.userDetails.fullName,
              //   phone: this.userDetails.phone,
              //   email: this.user.email,
              //   location: this.userDetails.location,
              //   streetNo: "",
              //   postalCode: ""
              // },
              // municipality: {
              //   id:
              //     this.userDetails.municipality &&
              //     this.userDetails.municipality.id
              // },
            }
          });
          this.isLoading = false;
        } else {
          console.log("error");
        }
      });
    },
    setData() {
      this.form = {
        ...this.form,
        ...JSON.parse(
          JSON.stringify({
            ...this.project,
            files: this.project.files,
            media: this.project.media
          })
        )
      };
    }
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
    },
    project() {
      return this.$store.state.project.project;
    },
    isEdit() {
      return (
        !!this.$route.params.id &&
        JSON.parse(JSON.stringify(this.$store.state.project.project))
      );
    }
  },
  mounted() {
    if (!!this.project && !!this.$route.params.id) {
      this.setData();
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
.flexWrap {
  flex-wrap: wrap !important;
}
</style>
