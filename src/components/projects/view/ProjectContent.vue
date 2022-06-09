<template>
  <!-- TODO Turn everything into components -->
  <div v-if="!!project" :class="!isDashboardView ? 'container' : ''">
    <div class="row q-mt-xl">
      <div v-if="!isDashboardView" class="col-12">
        <q-btn @click="$router.go(-1)" color="back" align="left" flat no-caps>
          <q-icon name="chevron_left" color="primary" class="on-left" />
          Back
        </q-btn>
      </div>
      <div class="col-12">
        <h1 class="font-24 text-weight-600 q-my-none">
          {{ project.title || "Title not found" }}
        </h1>
      </div>
    </div>
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-4">
        <div class="row">
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Contact Person
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{ project.info.contactName || "Contact not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{
                      project.municipality.location || "Municipality not found"
                    }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Contact details
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{ project.info.streetNo || "Street not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{ project.info.postalCode || "Postal Code not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{ project.info.phone || "Phone not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{ project.info.email || "Email not found" }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Location of the project
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{ project.info.location || "Project Location not set" }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Invite Editor
                </h4>
                <div class="q-ml-md font-16">
                  <div v-if="project.editors && project.editors.length > 0">
                    <p
                      v-for="(editor, index) in project.editors"
                      :key="index"
                      class="q-mb-sm"
                    >
                      {{ editor.username }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="q-mb-sm">No editors Invited</p>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Categories
                </h4>
                <div class="q-ml-md font-16">
                  <div
                    v-if="project.categories && project.categories.length > 0"
                  >
                    <q-chip
                      v-for="(category, index) in project.categories"
                      :key="index"
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      {{ category.title }}
                    </q-chip>
                  </div>
                  <div v-else>
                    No categories set
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Tags
                </h4>
                <div class="q-ml-md font-16">
                  <div v-if="project.tags && project.tags.length > 0">
                    <q-chip
                      v-for="(tag, index) in project.tags"
                      :key="index"
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      {{ tag.title }}
                    </q-chip>
                  </div>
                  <div v-else>No Tags Set</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Investive/ non-investive
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{
                      project.details.investive === true
                        ? "Investive"
                        : project.details.investive === false
                        ? "Non-Investive"
                        : "Not Set"
                    }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Project Status
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{
                      !!project.details.status && project.details.satus !== ""
                        ? project.details.status
                        : "Not Set"
                    }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Estimated costs
                </h4>
                <div
                  v-if="
                    project.estimatedCosts && project.estimatedCosts.length > 0
                  "
                >
                  <div
                    class="q-ml-md font-16 row"
                    v-for="(cost, index) in project.estimatedCosts"
                    :key="index"
                  >
                    <div class="col-8">
                      <p class="q-mb-sm">
                        {{ cost.name }}
                      </p>
                    </div>
                    <div class="col-4 text-right">
                      <p class="q-mb-sm">{{ cost.price }}€</p>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="q-ml-md font-16 row">
                    <div class="col-12">
                      <p class="q-mb-sm">
                        No costs set
                      </p>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Funding Guidelines
                </h4>
                <div
                  v-if="
                    project.fundingGuideline &&
                      project.fundingGuideline.length > 0
                  "
                  class="font-16"
                >
                  <div
                    class="row"
                    v-for="(funding, index) in project.fundingGuideline"
                    :key="index"
                  >
                    <div class="col-auto">
                      <q-btn
                        flat
                        align="left"
                        :label="funding.title"
                        color="primary"
                        @click.prevent.stop="viewFunding(index, funding.id)"
                        :loading="loading[index] && loading[index].loading"
                      />
                    </div>
                  </div>
                </div>
                <div class="q-ml-md font-16" v-else>
                  <p class="q-mb-sm q-mt-xs">
                    No Funding Guidlines
                  </p>
                </div>
              </q-card-section>

              <q-separator inset class="bg-blue opacity-10" />

              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Planned period
                </h4>
                <div class="q-ml-md font-16 row">
                  <div class="col-6 text-left">
                    <p class="q-mb-sm">Start</p>
                  </div>
                  <div class="col-6 text-right">
                    <p class="q-mb-sm">
                      {{
                        dateFormatter(project.plannedStart) ||
                          "No start date found"
                      }}
                    </p>
                  </div>
                  <div class="col-6 text-left">
                    <p class="q-mb-sm">End</p>
                  </div>
                  <div class="col-6 text-right">
                    <p class="q-mb-sm">
                      {{
                        dateFormatter(project.plannedEnd) || "No end date found"
                      }}
                    </p>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Links
                </h4>
                <div class="q-ml-md font-16">
                  <div v-if="project.links && project.links.length > 0">
                    <div
                      class="row"
                      v-for="(link, index) in project.links"
                      :key="index"
                    >
                      <p class="q-mb-none">{{ link.title }}</p>
                      <a
                        class="col-12 q-mb-sm text-blue block text-weight-600"
                        target="_blank"
                        rel="noopener noreferrer"
                        :href="
                          link.link.split('://')[0].substring(0, 5) === 'https'
                            ? link.link
                            : link.link.split('://')[0].substring(0, 4) ===
                              'http'
                            ? link.link
                            : `http://${link.link}`
                        "
                      >
                        {{ link.link }}
                      </a>
                    </div>
                  </div>
                  <div v-else>
                    <p class="col-12 q-mb-none">No links set</p>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Uploads
                </h4>
                <div class="q-ml-md font-16">
                  <div v-if="project.files && project.files.length > 0">
                    <div
                      class="row"
                      v-for="(file, index) in project.files"
                      :key="index"
                    >
                      <a
                        class="q-mb-sm text-blue block text-weight-600"
                        target="_blank"
                        rel="noopener noreferrer"
                        :href="`${appUrl}${file.url}`"
                        >{{ file.name }}</a
                      >
                    </div>
                  </div>
                  <div v-else>
                    No Files uploaded
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Relevant documents
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-none">Förderinfo</p>
                  <a
                    class="q-mb-sm text-blue block text-weight-600"
                    href="http://link.to.page"
                    >Förderinfo name</a
                  >
                  <p class="q-mb-none">Umsetzungscheckliste</p>
                  <a
                    class="q-mb-sm text-blue block text-weight-600"
                    href="http://link.to.page"
                    >Umsetzungscheckliste name</a
                  >
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="row">
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section v-if="project.media">
                <q-carousel
                  swipeable
                  animated
                  v-model="slide"
                  infinite
                  class="radius-10"
                >
                  <q-carousel-slide
                    class="imageStyling"
                    v-for="(item, index) in project.media"
                    :key="index"
                    :name="index + 1"
                    :img-src="`${appUrl}${item.url}`"
                  />
                </q-carousel>
                <div class="row justify-center">
                  <div class="col-9">
                    <q-tabs
                      swipeable
                      v-model="slide"
                      indicator-color="transparent"
                      outside-arrows
                      inline-label
                      mobile-arrows
                      align="center"
                      active-class="opacity-50"
                      class="no-padding q-mt-md carouselThumbnails"
                    >
                      <q-tab
                        :name="index + 1"
                        @click="slide = index + 1"
                        v-for="(item, index) in project.media"
                        :key="index"
                        class="no-padding q-mx-sm radius-10"
                        content-class="no-padding overflow-hidden"
                      >
                        <div
                          class="no-padding radius-10 overflow-hidden"
                          style="width:100px; height:100px"
                        >
                          <q-card-section class="no-padding">
                            <q-img
                              class="tabStyling"
                              :src="`${appUrl}${item.url}`"
                              height="100px"
                              width="100px"
                            />
                          </q-card-section>
                        </div>
                      </q-tab>
                    </q-tabs>
                  </div>
                </div>
              </q-card-section>
              <q-card-section
                class="flex flex-center"
                v-else
                style="height: 548px"
              >
                <div>
                  <h6 class="text-grey">No Images</h6>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-mb-md">
            <q-card class="shadow-1 radius-20">
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Project Goals
                </h4>
                <div class="q-ml-md font-16">
                  <p
                    class="q-mb-sm text-block"
                    v-html="
                      !!project.details.goals
                        ? project.details.goals
                        : 'No Project Goals found'
                    "
                  >
                    <!-- {{ project.details.goals || "No Project Goals found" }} -->
                  </p>
                </div>
              </q-card-section>

              <q-separator inset class="bg-blue opacity-10" />

              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Project value &amp; benefits
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{
                      project.details.valuesAndBenefits ||
                        "No Project Values and Benefits found"
                    }}
                  </p>
                </div>
              </q-card-section>

              <q-separator inset class="bg-blue opacity-10" />

              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Cooperation partner
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{ project.details.partner || "No Project Partners found" }}
                  </p>
                </div>
              </q-card-section>

              <q-separator inset class="bg-blue opacity-10" />

              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  project content
                </h4>
                <div class="q-ml-md font-16">
                  <p
                    class="q-mb-sm text-block"
                    v-html="
                      !!project.details.content
                        ? project.details.content
                        : 'No Project Content found'
                    "
                  ></p>
                  <!-- <p class="q-mb-sm">
                    {{ project.details.content || "No Project Content found" }}
                  </p> -->
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatter } from "src/boot/dateFormatter";
export default {
  name: "documentView",
  data() {
    return {
      slide: 1,
      loading: []
    };
  },
  methods: {
    dateFormatter,
    async viewFunding(index, id) {
      if (!!id) {
        if (!!this.loading[index]) {
          this.loading[index].loading = true;
        }
        console.log(this.loading[index].loading);
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        if (!!this.loading[index]) {
          this.loading[index].loading = false;
        }
        this.$router.push({ path: `/user/newFunding/${id}` });
      }
    },
    setLoadingData() {
      if (
        !!this.project.fundingGuideline &&
        this.project.fundingGuideline.length > 0
      ) {
        return this.project.fundingGuideline.map(item => {
          this.loading.push({ loading: false });
        });
      } else {
        return;
      }
    }
  },
  computed: {
    appUrl() {
      return process.env.VUE_APP_MAIN_URL;
    },
    isDashboardView() {
      return (
        this.$router.currentRoute.meta &&
        this.$router.currentRoute.meta.backLink === "/user/data"
      );
    },
    project() {
      return this.$store.state.project.project;
    }
  },
  mounted() {
    this.setLoadingData();
  }
};
</script>

<style lang="scss">
.carouselThumbnails .q-tabs__arrow--end {
  right: -70px;
  color: $blue;
}
.carouselThumbnails .q-tabs__arrow--start {
  left: -70px;
  color: $blue;
}
.imageStyling {
  background-size: contain;
  background-repeat: no-repeat;
}
.tabStyling div.q-img__image {
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
.text-block {
  white-space: pre-line;
}
</style>
