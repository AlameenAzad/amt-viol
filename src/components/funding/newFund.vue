<template>
  <q-page :class="$q.screen.gt.sm ? 'q-mx-xl' : 'q-mx-sm'" class="q-mt-lg">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Fundings
    </p>
    <div
      class="bg-white radius-20 q-py-lg"
      :class="{ 'q-px-md': $q.screen.gt.sm }"
    >
      <q-form
        @validation-error="scrollToInvalidElement"
        ref="newFundingForm"
        class="q-gutter-lg q-px-md q-mb-md"
      >
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Funding guidelines
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="official title"
              v-model="form.title"
              :rules="[val => !!val || 'Title is required']"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              funding provider
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="funding provider"
                  v-model="form.provider"
                  :rules="[]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-baseline">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Contact person
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Name, Surname"
                  v-model="form.info.contactName"
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
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Street, Nr."
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
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Invite Editor
            </p>
          </div>
          <div class="col-12 col-md-8">
            <UserSelect
              :editing="funding.editors"
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
                  <span class="text-grey">Auf Anfrage</span>
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">Filter Categories</p>
          </div>
          <div class="col-12 col-md-8">
            <Categories
              :editing="funding.categories"
              @update:category="form.categories = $event"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">Tags*</p>
          </div>
          <div class="col-12 col-md-8">
            <Tags :editing="funding.tags" @update:tag="form.tags = $event" />
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
              funding goal
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Förderziel"
              v-model="form.details.goal"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              What is funded?
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Was wird gefördert"
              v-model="form.details.funded"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              What is not funded?
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Was wird nicht gefördert"
              v-model="form.details.notFunded"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Who will be funded?
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Kooperationspartner"
              v-model="form.details.willBeFunded"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Conditions for Applicants
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Rahmenbedingungen für Antragsteller"
              v-model="form.details.condition"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              funding rates
            </p>
          </div>
          <div class="col-12 col-md-8">
            <FundingRate
              :editing="funding.rates"
              @update:fundingRate="form.rates = $event"
            />
          </div>
        </div>

        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Own contribution
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6 removeArrow"
              suffix="%"
              placeholder="Own Contribution"
              v-model="form.ownContribution"
              :rules="[]"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Accumulability
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-btn-toggle
              v-model="form.accumulability"
              spread
              no-caps
              toggle-color="yellow"
              padding="12px 10px"
              color="transparent"
              toggle-text-color="black"
              text-color="black"
              class="no-shadow toggleGap"
              :options="accumulabilityOptions"
            />
          </div>
        </div>
        <div v-if="form.accumulability" class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Link to fundings
            </p>
          </div>
          <div class="col-12 col-md-8">
            <Fundings
              :editing="funding.fundingsLinkedTo"
              @update:linkToFunding="form.fundingsLinkedTo = $event"
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
              Basis for assessment
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-input
              outlined
              dense
              class="no-shadow input-radius-6"
              placeholder="Was wird nicht gefördert"
              v-model="form.assessment"
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
              Funding Period
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
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
                  :rules="[val => !!val || 'Required']"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qPlannedStartDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          :options="plannedStartOptions"
                          v-model="form.plannedStart"
                          mask="YYYY-MM-DD"
                          @input="$refs.qPlannedStartDateProxy.hide()"
                          first-day-of-week="1"
                        >
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
                  :value="dateFormatter(form.plannedEnd)"
                  color="primary"
                  readonly
                  bg-color="white"
                  placeholder="Planned End"
                  @click="$refs.qPlannedEndDateProxy.show()"
                  :rules="[val => !!val || 'Required']"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qPlannedEndDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          :options="plannedEndOptions"
                          v-model="form.plannedEnd"
                          mask="YYYY-MM-DD"
                          @input="$refs.qPlannedEndDateProxy.hide()"
                          first-day-of-week="1"
                        >
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
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Notes to the funding period
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  v-model="form.notes"
                  color="primary"
                  bg-color="white"
                  placeholder="Hinweise zum Förderzeitraum"
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
        <div class="row">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Links
            </p>
          </div>
          <div class="col-12 col-md-8">
            <Links
              :editing="funding.links"
              @update:link="form.links = $event"
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
              Uploads
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-md">
              <div class="col-6">
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
              <div class="col-6">
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
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Link to project ideas (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
            <ProjectIdeas
              :editing="funding.projects"
              @update:linkToProject="form.projects = $event"
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
            <p
              class="font-16 no-margin"
              :class="$q.screen.gt.md ? 'q-pr-xl' : ''"
            >
              Link to implementation checklist (optional)
            </p>
          </div>
          <div class="col-12 col-md-8">
            <ImplementationChecklists
              :editing="funding.checklist"
              @update:linkToImplementationChecklist="form.checklist = $event"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-separator class="bg-blue opacity-10" />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-5 col-md-2 q-mr-sm">
            <q-btn
              :label="'Save as Draft'"
              @click="!!funding ? editFunding(false) : submitNewFunding(false)"
              outline
              size="16px"
              color="primary"
              no-caps
              class="radius-6 q-py-xs full-width"
              :loading="isLoading"
            />
          </div>
          <div class="col-5 col-md-2 q-ml-sm">
            <q-btn
              :label="'Publish'"
              @click="!!funding ? editFunding(true) : submitNewFunding(true)"
              unelevated
              size="16px"
              color="primary"
              no-caps
              class="radius-6 q-py-xs full-width"
              :loading="isLoading"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;
import { dateFormatter } from "src/boot/dateFormatter";
import UserSelect from "components/user/UserSelect.vue";
import Categories from "components/projects/create/Categories.vue";
import Tags from "components/projects/create/Tags.vue";
import FundingRate from "src/components/funding/FundingRate.vue";
import Links from "src/components/projects/create/Links.vue";
import ProjectIdeas from "components/funding/ProjectIdeas.vue";
import ImplementationChecklists from "components/funding/ImplementationChecklists.vue";
import Fundings from "components/funding/Fundings.vue";
export default {
  name: "newFund",
  components: {
    UserSelect,
    Categories,
    Tags,
    FundingRate,
    Links,
    ProjectIdeas,
    ImplementationChecklists,
    Fundings
  },
  data() {
    return {
      form: {
        title: "",
        visibility: "only for me",
        provider: "",
        assessment: "",
        info: {
          contactName: "",
          phone: "",
          email: "",
          streetNo: "",
          postalCode: ""
        },
        details: {
          goal: "",
          funded: "",
          notFunded: "",
          willBeFunded: "",
          condition: ""
        },
        ownContribution: "",
        accumulability: false,
        plannedStart: "",
        plannedEnd: "",
        notes: "",
        editors: [],
        rates: [],
        links: [],
        categories: [],
        tags: [],
        projects: [],
        checklist: null,
        media: null,
        files: null,
        fundingsLinkedTo: []
      },
      visibilityOptions: ["only for me", "all users", "listed only"],
      accumulabilityOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ],
      isLoading: false
    };
  },
  methods: {
    plannedEndOptions(date) {
      if (!!this.form.plannedStart) {
        const calendarDate = date.replace(/\//g, "-");
        return calendarDate >= this.form.plannedStart;
      } else {
        return true;
      }
    },
    plannedStartOptions(date) {
      if (!!this.form.plannedEnd) {
        const calendarDate = date.replace(/\//g, "-");
        return calendarDate <= this.form.plannedEnd;
      } else {
        return true;
      }
    },
    scrollToInvalidElement(ref) {
      const el = ref.$el;
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    },
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
    submitNewFunding(val) {
      const published = val;
      this.$refs.newFundingForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          await this.checkOptionalParameters();
          const res = await this.$store.dispatch("funding/createNewFunding", {
            data: {
              ...this.form,
              published: published,
              municipality: {
                id:
                  this.userDetails.municipality &&
                  this.userDetails.municipality.id
              },
              owner: {
                id: this.user && this.user.id
              }
            }
          });
          if (res !== false) {
            console.log("RES WASN'T FALSE");
          }
          this.isLoading = false;
        } else {
          const elements = this.$refs.newFundingForm.getValidationComponents();
          elements.map(el => {
            if (el.validate) {
              el.validate();
            }
          });
        }
      });
    },
    checkOptionalParameters() {
      if (this.form.accumulability === false) {
        delete this.form.fundingsLinkedTo;
      }
      if (!this.form.checklist) {
        delete this.form.checklist;
      }
      if (!!this.form.projects && this.form.projects.length < 1) {
        delete this.form.projects;
      }
    },
    editFunding(val) {
      const published = val;
      this.$refs.newFundingForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          await this.checkOptionalParameters();
          const res = await this.$store.dispatch("funding/editFunding", {
            data: {
              ...this.form,
              published: published,
              municipality: {
                id:
                  this.userDetails.municipality &&
                  this.userDetails.municipality.id
              }
              // owner: {
              //   id: this.user && this.user.id
              // }
            }
          });
          this.isLoading = false;
        } else {
          const elements = this.$refs.newFundingForm.getValidationComponents();
          elements.map(el => {
            if (el.validate) {
              el.validate();
            }
          });
        }
      });
    },
    setData() {
      this.form = {
        ...this.form,
        ...JSON.parse(
          JSON.stringify({
            ...this.funding,
            files: this.funding.files,
            media: this.funding.media
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
    funding() {
      return (
        !!this.$route.params.id &&
        JSON.parse(JSON.stringify(this.$store.state.funding.funding))
      );
    }
  },
  mounted() {
    if (!!this.funding && !!this.$route.params.id) {
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
.removeArrow input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.removeArrow input[type="number"] {
  -moz-appearance: textfield;
}
</style>
