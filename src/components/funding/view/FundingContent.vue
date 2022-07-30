<template>
  <div>
    <div v-if="!!funding" :class="!isDashboardView ? 'container' : ''">
      <div class="row">
        <div v-if="!isDashboardView" class="col-12">
          <q-btn @click="$router.go(-1)" color="back" align="left" flat no-caps>
            <q-icon name="chevron_left" color="primary" class="on-left" />
            Back
          </q-btn>
        </div>
        <div v-if="isAdmin" class="col-12">
          <div class="row">
            <q-card class="col-12 shadow-1 radius-20 q-mb-none q-pa-none">
              <q-card-section class="row items-center justify-between q-pa-md">
                <div class="col-8">
                  <div class="row">
                    <div class="col-3">
                      <p class="font-14 no-margin text-blue-5">
                        Erstelldatum
                      </p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        {{
                          dateFormatter(
                            !!funding.createdAt &&
                              funding.createdAt.split("T"[0])
                          ) || ""
                        }}
                      </p>
                    </div>
                    <div class="col-3">
                      <p class="font-14 no-margin text-blue-5">Besitzer*in</p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        {{ (!!funding.owner && funding.owner.username) || "" }}
                      </p>
                    </div>
                    <div class="col-3">
                      <p class="font-14 no-margin text-blue-5">Typ</p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        Förderinfo
                      </p>
                    </div>
                    <div class="col-3">
                      <p class="font-14 no-margin text-blue-5">Sichtbarkeit</p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        {{ funding.visibility || "" }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="row justify-between">
                    <div class="col-auto">
                      <q-btn
                        @click="addToWatchlist()"
                        color="blue"
                        unelevated
                        class="radius-6 q-ml-md text-weight-600"
                        no-caps
                        outline
                        icon="star_outline"
                        :loading="watchlistIsLoading"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        @click="editFunding()"
                        color="blue"
                        unelevated
                        class="radius-6 q-ml-md text-weight-600"
                        no-caps
                        icon="edit"
                        :loading="editIsLoading"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        @click="archiveFunding()"
                        color="blue"
                        unelevated
                        class="radius-6 q-ml-md text-weight-600"
                        no-caps
                        icon="inventory"
                        :loading="archiveIsLoading"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        @click="deleteFunding()"
                        color="red"
                        unelevated
                        class="radius-6 q-ml-md text-weight-600"
                        no-caps
                        icon="delete"
                        :loading="deleteIsLoading"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div v-if="!isAdmin" class="col-12">
          <div class="row">
            <q-card class="col-12 shadow-1 radius-20 q-mb-none q-pa-none">
              <q-card-section class="row items-center justify-between q-pa-md">
                <div class="col-8">
                  <div class="row">
                    <div class="col-4">
                      <p class="font-14 no-margin text-blue-5">
                        Erstelldatum
                      </p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        {{
                          dateFormatter(
                            !!funding.createdAt &&
                              funding.createdAt.split("T"[0])
                          ) || ""
                        }}
                      </p>
                    </div>
                    <div class="col-4">
                      <p class="font-14 no-margin text-blue-5">Besitzer*in</p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        {{ (!!funding.owner && funding.owner.username) || "" }}
                      </p>
                    </div>
                    <div class="col-4">
                      <p class="font-14 no-margin text-blue-5">Typ</p>
                      <p class="font-16 q-mt-xs q-mb-none text-weight-600 ">
                        Förderinfo
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="row justify-end">
                    <div class="col-auto">
                      <q-btn
                        @click="addToWatchlist()"
                        color="blue"
                        unelevated
                        class="radius-6 q-ml-md text-weight-600"
                        no-caps
                        outline
                        icon="star_outline"
                        :loading="watchlistIsLoading"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        @click="addComment()"
                        color="blue"
                        unelevated
                        class="radius-6 q-ml-md text-weight-600"
                        no-caps
                        icon="comment"
                        :loading="commentIsLoading"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1 class="font-24 text-weight-regular q-my-none">
            {{ funding.title || "Title not found" }}
          </h1>
        </div>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-4">
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <div v-if="!!funding.title">
                  <q-card-section>
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Funding Guidelines
                    </h4>
                    <div class="q-ml-md font-16">
                      <p class="q-mb-sm">
                        {{ funding.title || "Title not found" }}
                      </p>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div v-if="!!funding.provider">
                  <q-card-section>
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Funding Provider
                    </h4>
                    <div class="q-ml-md font-16">
                      <p class="q-mb-sm">
                        {{ funding.provider || "Provider not found" }}
                      </p>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Contact Person
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">
                      {{
                        (!!funding.info && funding.info.contactName) ||
                          "Contact not found"
                      }}
                    </p>
                    <p class="q-mb-sm">
                      {{
                        (funding.municipality &&
                          funding.municipality.location) ||
                          "Municipality not found"
                      }}
                    </p>
                  </div>
                </q-card-section>
                <q-separator inset class="bg-blue opacity-10" />
                <div
                  v-if="
                    (!!funding.info && funding.info.streetNo) ||
                      (!!funding.info && funding.info.postalCode) ||
                      (!!funding.info && funding.info.phone) ||
                      (!!funding.info && funding.info.email)
                  "
                >
                  <q-card-section>
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Contact details
                    </h4>
                    <div class="q-ml-md font-16">
                      <p class="q-mb-sm">
                        {{
                          (!!funding.info && funding.info.streetNo) ||
                            "Street not found"
                        }}
                      </p>
                      <p class="q-mb-sm">
                        {{
                          (!!funding.info && funding.info.postalCode) ||
                            "Postal Code not found"
                        }}
                      </p>
                      <p class="q-mb-sm">
                        {{
                          (!!funding.info && funding.info.phone) ||
                            "Phone not found"
                        }}
                      </p>
                      <p class="q-mb-sm text-overflow">
                        {{
                          (!!funding.info && funding.info.email) ||
                            "Email not found"
                        }}
                      </p>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <q-card-section
                  v-if="funding.editors && funding.editors.length > 0"
                >
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Invite Editor
                  </h4>
                  <div class="q-ml-md font-16">
                    <div v-if="funding.editors && funding.editors.length > 0">
                      <p
                        v-for="(editor, index) in funding.editors"
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
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section v-if="funding.media">
                  <q-carousel
                    swipeable
                    animated
                    v-model="slide"
                    infinite
                    class="radius-10"
                  >
                    <q-carousel-slide
                      class="imageStyling"
                      v-for="(item, index) in funding.media"
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
                          v-for="(item, index) in funding.media"
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
          </div>
        </div>
        <div class="col-12 q-pt-none">
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section horizontal class="q-pa-md">
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Categories
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-md font-16">
                      <div
                        v-if="
                          funding.categories && funding.categories.length > 0
                        "
                      >
                        <q-chip
                          v-for="(category, index) in funding.categories"
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
                        <p class="q-mt-sm q-mb-sm">
                          No categories set
                        </p>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-separator inset class="bg-blue opacity-10" />
                <q-card-section horizontal class="q-pa-md">
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Tags
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-md font-16">
                      <div v-if="funding.tags && funding.tags.length > 0">
                        <q-chip
                          v-for="(tag, index) in funding.tags"
                          :key="index"
                          square
                          size="16px"
                          color="yellow-10"
                          text-color="blue"
                        >
                          {{ tag.title }}
                        </q-chip>
                      </div>
                      <div v-else>
                        <p class="q-mt-sm q-mb-sm">
                          No Tags Set
                        </p>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div
              v-if="
                (!!funding.details && funding.details.goal) ||
                  (!!funding.details && funding.details.funded) ||
                  (!!funding.details && funding.details.notFunded) ||
                  (!!funding.details && funding.details.willBeFunded) ||
                  (!!funding.details && funding.details.condition)
              "
              class="col-12 q-mb-md"
            >
              <q-card class="shadow-1 radius-20">
                <div v-if="!!funding.details.goal">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Funding Goal
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p
                            class="q-mt-sm q-mb-sm text-block"
                            v-html="
                              !!funding.details.goal
                                ? funding.details.goal
                                : 'Funding Goals not set'
                            "
                          ></p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div v-if="!!funding.details.funded">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        What is funded?
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p
                            class="q-mt-sm q-mb-sm text-block"
                            v-html="
                              !!funding.details.funded
                                ? funding.details.funded
                                : 'What is Funded not set'
                            "
                          ></p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div v-if="!!funding.details.notFunded">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        What is not funded?
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p
                            class="q-mt-sm q-mb-sm text-block"
                            v-html="
                              !!funding.details.notFunded
                                ? funding.details.notFunded
                                : 'What is not funded not set'
                            "
                          ></p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div v-if="!!funding.details.willBeFunded">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Who will be funded?
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p
                            class="q-mt-sm q-mb-sm text-block"
                            v-html="
                              !!funding.details.willBeFunded
                                ? funding.details.willBeFunded
                                : 'Who will be funded not set'
                            "
                          ></p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <q-card-section
                  v-if="!!funding.details.condition"
                  horizontal
                  class="q-pa-md items-start"
                >
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Guidlines for Applicants
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-xs">
                      <div class="q-ml-md font-16">
                        <p
                          class="q-mt-sm q-mb-sm text-block"
                          v-html="
                            !!funding.details.condition
                              ? funding.details.condition
                              : 'Guidelines not set'
                          "
                        ></p>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <div v-if="funding.rates && funding.rates.length > 0">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Funding Rates
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <div v-if="funding.rates && funding.rates.length > 0">
                            <div
                              v-for="(rate, index) in funding.rates"
                              :key="index"
                              class="row q-col-gutter-x-xl"
                            >
                              <div class="col-6 col-md-auto">
                                <p class="q-mt-sm q-mb-sm inline-block">
                                  {{ rate.amount || "Amount not set" }}%
                                </p>
                              </div>
                              <div class="col-6 col-md-auto">
                                <p class="q-mt-sm q-mb-sm inline-block">
                                  {{ rate.content || "Content not set" }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <p class="q-mt-sm q-mb-sm">
                              No Funding Rates Set
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div v-if="!!funding.ownContribution">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Own Contribution
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p class="q-mt-sm q-mb-sm">
                            {{
                              funding.ownContribution ||
                                "Own contribution is not set"
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div>
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Accumulability
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p class="q-mt-sm q-mb-sm">
                            {{
                              funding.accumulability === true
                                ? "Yes"
                                : "No" || "Accumulability is not set"
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <q-card-section
                  v-if="
                    funding.accumulability === true &&
                      funding.fundingsLinkedTo &&
                      funding.fundingsLinkedTo.length > 0
                  "
                  horizontal
                  class="q-pa-md items-start"
                >
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Links to the fundings
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-xs">
                      <div class="q-ml-md font-16">
                        <div
                          v-if="
                            funding.fundingsLinkedTo &&
                              funding.fundingsLinkedTo.length > 0
                          "
                          class="q-gutter-sm"
                        >
                          <q-btn
                            v-for="(funding, index) in funding.fundingsLinkedTo"
                            :key="index"
                            flat
                            color="primary"
                            :label="funding.title"
                            @click.prevent="viewFunding(funding.id)"
                            :loading="isLoading"
                          >
                          </q-btn>
                          <!-- <q-item
                          v-for="(funding, index) in funding.fundingsLinkedTo"
                          :key="index"
                          clickable
                          @click.prevent.stop="viewFunding(funding.id)"
                        >
                          <q-item-section
                            ><span class="text-right font-14">
                              {{ funding.title }}
                              <q-icon
                                v-if="!isLoading"
                                size="sm"
                                class="text-blue"
                                name="visibility"
                              />
                              <q-spinner
                                v-else
                                color="primary"
                                size="sm"
                                :thickness="2"
                              /> </span
                          ></q-item-section>
                        </q-item> -->
                        </div>
                        <div v-else>
                          <p class="q-mt-sm q-mb-sm">
                            No Links to other fundings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <div v-if="!!funding.assessment">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Determination Base
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p
                            class="q-mt-sm q-mb-sm text-block"
                            v-html="
                              !!funding.assessment
                                ? funding.assessment
                                : 'Determination base is not set'
                            "
                          ></p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <q-card-section horizontal class="q-pa-md items-start">
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Funding Period
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-xs">
                      <div class="q-ml-md font-16">
                        <div class="row">
                          <div class="col-6 col-md-2">
                            <p class="q-mt-sm q-mb-sm inline-block">
                              Start
                            </p>
                          </div>
                          <div class="col-6 col-md-6">
                            <p class="q-mt-sm q-mb-sm inline-block">
                              {{
                                dateFormatter(funding.plannedStart) ||
                                  "Planned Start not set"
                              }}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-6 col-md-2">
                            <p class="q-mt-sm q-mb-sm inline-block">
                              End
                            </p>
                          </div>
                          <div class="col-6 col-md-6">
                            <p class="q-mt-sm q-mb-sm inline-block">
                              {{
                                dateFormatter(funding.plannedEnd) ||
                                  "Planned End not set"
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-separator inset class="bg-blue opacity-10" />
                <div v-if="!!funding.notes">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Notes to the funding period
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <p class="q-mt-sm q-mb-sm">
                            {{ funding.notes || "Notes is not set" }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <div v-if="funding.links && funding.links.length > 0">
                  <q-card-section horizontal class="q-pa-md items-start">
                    <div class="col-4">
                      <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                        Links
                      </h4>
                    </div>
                    <div class="col-8">
                      <div class="q-ml-xs">
                        <div class="q-ml-md font-16">
                          <div v-if="funding.links && funding.links.length > 0">
                            <div
                              v-for="(link, index) in funding.links"
                              :key="index"
                              class="row"
                            >
                              <div class="col-12">
                                <p class="q-mt-sm q-mb-xs inline-block">
                                  {{ link.title || "Link title not set" }}
                                </p>
                              </div>
                              <div class="col-auto">
                                <a
                                  class="q-mb-sm text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="
                                    link.link
                                      .split('://')[0]
                                      .substring(0, 5) === 'https'
                                      ? link.link
                                      : link.link
                                          .split('://')[0]
                                          .substring(0, 4) === 'http'
                                      ? link.link
                                      : `http://${link.link}`
                                  "
                                  >{{ link.link }}</a
                                >
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <p class="q-mt-sm q-mb-sm">
                              No Links set
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator inset class="bg-blue opacity-10" />
                </div>
                <q-card-section
                  v-if="funding.files && funding.files.length > 0"
                  horizontal
                  class="q-pa-md items-start"
                >
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Uploads
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-xs">
                      <div class="q-ml-md font-16">
                        <div v-if="funding.files && funding.files.length > 0">
                          <div
                            v-for="(file, index) in funding.files"
                            :key="index"
                            class="row"
                          >
                            <div class="col-auto">
                              <a
                                class="q-mb-sm text-blue block text-weight-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                :href="`${appUrl}${file.url}`"
                                >{{ file.name }}</a
                              >
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <p class="q-mt-sm q-mb-sm">
                            No Files Uploaded
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div
              v-if="
                (funding.projects && funding.projects.length > 0) ||
                  (!!funding.checklist && !!funding.checklist.id)
              "
              class="col-12 q-mb-md"
            >
              <q-card class="shadow-1 radius-20">
                <q-card-section horizontal class="q-pa-md items-start">
                  <div class="col-4">
                    <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                      Relevant Documents
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="q-ml-xs">
                      <div
                        v-if="funding.projects && funding.projects.length > 0"
                        class="q-ml-md font-16"
                      >
                        <div class="row">
                          <p class="q-mt-sm q-mb-xs">
                            Project Ideas
                          </p>
                        </div>
                        <div
                          v-if="funding.projects && funding.projects.length > 0"
                        >
                          <div
                            class="row"
                            v-for="(project, index) in funding.projects"
                            :key="index"
                          >
                            <div class="col-auto">
                              <a
                                class="q-mb-sm text-blue block text-weight-600 cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                                @click.prevent="viewProject(project.id)"
                                >{{ project.title }}</a
                              >
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <p class="q-mt-xs q-mb-sm">
                            No Linked Projects
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="!!funding.checklist && !!funding.checklist.id"
                        class="q-ml-md font-16"
                      >
                        <div class="row">
                          <p class="q-mt-sm q-mb-xs">
                            Implementation Checklist
                          </p>
                        </div>
                        <div
                          v-if="!!funding.checklist && !!funding.checklist.id"
                        >
                          <div class="row">
                            <div class="col-auto">
                              <a
                                class="q-mb-sm text-blue block text-weight-600 cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                                @click.prevent="
                                  viewChecklist(funding.checklist.id)
                                "
                                >{{ funding.checklist.title }}</a
                              >
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <p class="q-mt-xs q-mb-sm">
                            No Linked Implementation Checklist
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteDialog
      :id="itemId"
      :tab="tab"
      :dialogState="deleteDialog"
      @update="closeDialog($event), (itemId = null)"
    />
    <CommentDialog
      :fundingId="itemId"
      :dialogState="commentDialog"
      @update="(commentDialog = $event), (commentIsLoading = false)"
    />
  </div>
</template>

<script>
import { dateFormatter } from "src/boot/dateFormatter";
import DeleteDialog from "components/data/DeleteDialog.vue";
import CommentDialog from "components/funding/view/CommentDialog.vue";
export default {
  name: "FundingView",
  data() {
    return {
      slide: 1,
      itemId: null,
      tab: "fundings",
      deleteDialog: false,
      isLoading: false,
      editIsLoading: false,
      deleteIsLoading: false,
      archiveIsLoading: false,
      watchlistIsLoading: false,
      commentIsLoading: false,
      commentDialog: false
    };
  },
  components: {
    DeleteDialog,
    CommentDialog
  },
  watch: {
    $route(to, from) {
      if (
        (to.params && to.params.id) !==
        (this.$store.state.funding.funding &&
          this.$store.state.funding.funding.id)
      ) {
        this.getNewData(to.params.id);
      }
    }
  },
  methods: {
    dateFormatter,
    closeDialog(val) {
      this.deleteDialog = val;
      if (!!this.funding && !this.funding.id) {
        this.$router.go(-1);
      }
    },
    async getData() {
      console.log("this.$router", this.$router);
      const startLocation =
        !!this.$router.history && this.$router.history._startLocation;
      const funding =
        !!this.$router.history &&
        this.$router.history.current &&
        this.$router.history.current.fullPath;
      if (
        (!!this.$route.params && Number(this.$route.params.id)) !==
        (!!this.$store.state.funding.funding &&
          this.$store.state.funding.funding.id)
      ) {
        this.isLoading = true;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: Number(this.$route.params.id)
        });
        this.isLoading = false;
      } else if (
        startLocation.includes(`newFunding/${this.$route.params.id}`) &&
        funding.includes(`newFunding/${this.$route.params.id}`)
      ) {
        console.log("HORSESSS");
        this.isLoading = true;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: Number(this.$route.params.id)
        });
        this.isLoading = false;
      } else {
        this.isLoading = true;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: Number(this.$route.params.id)
        });
        this.isLoading = false;
      }
    },
    async viewFunding(id) {
      if (!!id) {
        // await this.getNewData(id);
        // await this.$store.dispatch("funding/getSpecificFunding", {
        //   id: idd
        // });
        // this.$q.loading.hide();
        this.$router.push({ path: `/user/newFunding/${id}` });
      }
    },
    async viewProject(id) {
      if (!!id) {
        //  this.viewIsLoading = true;
        // const id = row && row.id;
        await this.$store.dispatch("project/viewProject", {
          id: id
        });
        // this.viewIsLoading = false;
      }
    },
    async viewChecklist(id) {
      if (!!id) {
        // if (!!this.loading[index]) {
        //   this.loading[index].loading = true;
        // }
        await this.$store.dispatch(
          "implementationChecklist/getSpecificChecklist",
          {
            id: id
          }
        );
        // if (!!this.loading[index]) {
        //   this.loading[index].loading = false;
        // }
        this.$router.push({ path: `/user/newChecklist/${id}` });
      }
    },
    async getNewData(id) {
      if (!!id) {
        this.isLoading = true;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        this.isLoading = false;
      }
    },
    async addToWatchlist() {
      this.watchlistIsLoading = true;
      const id = !!this.funding && this.funding.id;
      await this.$store.dispatch("funding/addToWatchlist", {
        id: id
      });
      this.watchlistIsLoading = false;
    },
    async editFunding() {
      this.editIsLoading = true;
      const id = !!this.funding && this.funding.id;
      await this.$store.dispatch("funding/getSpecificFunding", {
        id: id
      });
      this.editIsLoading = false;
      this.$router.push({ path: `/user/newFunding/edit/${id}` });
    },
    async archiveFunding() {
      this.archiveIsLoading = true;
      const id = !!this.funding && this.funding.id;
      await this.$store.dispatch("funding/archiveFunding", {
        id: id
      });
      this.archiveIsLoading = false;
      this.$router.go(-1);
    },
    async addComment() {
      this.commentIsLoading = true;
      this.commentDialog = true;
      this.itemId = !!this.funding && this.funding.id;

      // await this.$store.dispatch("funding/getSpecificFunding", {
      //   id: id
      // });
      // this.editIsLoading = false;
      // this.$router.push({ path: `/user/newFunding/edit/${id}` });
    },
    async deleteFunding() {
      this.itemId = !!this.funding && this.funding.id;
      this.deleteDialog = true;
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters["userCenter/isAdmin"];
    },
    appUrl() {
      return process.env.VUE_APP_MAIN_URL;
    },
    isDashboardView() {
      return (
        this.$router.currentRoute.meta &&
        this.$router.currentRoute.meta.backLink === "/user/data"
      );
    },
    funding() {
      return this.$store.state.funding.funding;
    }
  },
  mounted() {
    this.getData();
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
