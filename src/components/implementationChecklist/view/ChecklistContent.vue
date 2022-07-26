<template>
  <!-- TODO Turn everything into components -->
  <div v-if="!!checklist" :class="!isDashboardView ? 'container' : ''">
    <div class="row q-mt-xl">
      <div v-if="!isDashboardView" class="col-12">
        <q-btn @click="$router.go(-1)" color="back" align="left" flat no-caps>
          <q-icon name="chevron_left" color="primary" class="on-left" />
          Back
        </q-btn>
      </div>
      <div class="col-12">
        <h1 class="font-24 text-weight-600 q-my-none">
          {{ checklist.title || "Title not found" }}
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
                  Idea Provider/giver
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{ checklist.ideaProvider || "Provider not found" }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Contact Person
                </h4>
                <div class="q-ml-md font-16">
                  <p class="q-mb-sm">
                    {{ checklist.info.contactName || "Contact not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{
                      (checklist.municipality &&
                        checklist.municipality.location) ||
                        "Municipality not found"
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
                    {{ checklist.info.streetNo || "Street not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{ checklist.info.postalCode || "Postal Code not found" }}
                  </p>
                  <p class="q-mb-sm">
                    {{ checklist.info.phone || "Phone not found" }}
                  </p>
                  <p class="q-mb-sm text-overflow">
                    {{ checklist.info.email || "Email not found" }}
                  </p>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Invite Editor
                </h4>
                <div class="q-ml-md font-16">
                  <div v-if="checklist.editors && checklist.editors.length > 0">
                    <p
                      v-for="(editor, index) in checklist.editors"
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
              <q-separator inset class="bg-blue opacity-10" />
              <q-card-section>
                <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                  Link for Project Idea
                </h4>
                <div class="q-ml-md font-16">
                  <div v-if="checklist.project && checklist.project.id">
                    <a
                      class="q-mb-sm text-blue block text-weight-600 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click.prevent="viewProject(checklist.project.id)"
                      >{{ checklist.project.title }}</a
                    >
                  </div>
                  <div v-else>
                    <p class="q-mb-sm">No Project Idea linked</p>
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
              <q-card-section v-if="checklist.media">
                <q-carousel
                  swipeable
                  animated
                  v-model="slide"
                  infinite
                  class="radius-10"
                >
                  <q-carousel-slide
                    class="imageStyling"
                    v-for="(item, index) in checklist.media"
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
                        v-for="(item, index) in checklist.media"
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
                        checklist.categories && checklist.categories.length > 0
                      "
                    >
                      <q-chip
                        v-for="(category, index) in checklist.categories"
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
                    <div v-if="checklist.tags && checklist.tags.length > 0">
                      <q-chip
                        v-for="(tag, index) in checklist.tags"
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
              !!checklist.initialContact.start && !!checklist.initialContact.end
            "
            class="col-12 q-mb-md"
          >
            <q-card
              class="shadow-1 radius-20"
              :class="
                checkProgress(
                  checklist.initialContact.start,
                  checklist.initialContact.end
                )
              "
            >
              <q-card-section
                horizontal
                class="q-pa-md items-start q-col-gutter-x-sm"
              >
                <div class="col-4">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="font-20 text-weight-600 q-mb-xs q-mt-none">
                        Initial discussion with the politics
                      </h4>
                    </div>
                    <div class="col-2">
                      <p class="q-mb-none font-16">Start</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mb-none font-16">
                        {{
                          dateFormatter(
                            !!checklist.initialContact &&
                              checklist.initialContact.start
                          )
                        }}
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="q-mt-sm font-16">End</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mt-sm font-16">
                        {{
                          dateFormatter(
                            !!checklist.initialContact &&
                              checklist.initialContact.end
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-for="(card, propertyName) in checklist.initialContact"
                    :key="card.sortPosition"
                  >
                    <div
                      v-if="
                        (propertyName !== 'end' ||
                          propertyName !== 'start' ||
                          propertyName !== 'id') &&
                          card.active === true
                      "
                    >
                      <div class="q-mb-sm" style="background:#16428B1A">
                        <div class="q-pa-md font-16">
                          <div class="row justify-between items-start q-mb-md">
                            <div>
                              <p
                                class="font-18 text-blue text-weight-600 q-ma-none"
                              >
                                {{
                                  propertyName === "captureIdea"
                                    ? "Capture Project Idea"
                                    : "Capture Content"
                                }}
                              </p>
                              <p class="font-14 q-ma-none">
                                {{ card.name || "No name filled" }}
                              </p>
                            </div>
                            <div
                              v-if="
                                checkProgress(
                                  checklist.initialContact.start,
                                  checklist.initialContact.end
                                ) !== 'notStarted'
                              "
                            >
                              <q-chip square class="text-weight-600">{{
                                checkProgress(
                                  checklist.initialContact.start,
                                  checklist.initialContact.end
                                ) === "done"
                                  ? "Done"
                                  : "In Progress"
                              }}</q-chip>
                            </div>
                          </div>
                          <div class="row items-center q-mb-md">
                            <div
                              v-if="
                                propertyName === 'captureIdea' &&
                                  !!card.project &&
                                  card.project.id
                              "
                            >
                              <p class="font-16 text-blue-5 q-ma-none">
                                link for project idea
                              </p>
                              <a
                                class="q-mb-sm text-blue block text-weight-600 cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                                @click.prevent="viewProject(card.project.id)"
                                >{{ card.project.title }}</a
                              >
                            </div>
                          </div>
                          <div class="row items-center q-mb-md">
                            <div>
                              <p class="font-16 text-blue-5 q-ma-none">
                                Description
                              </p>
                              <p class="font-16 q-ma-none text-block">
                                {{ card.text || "No description filled" }}
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'captureIdea'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'caputreContect'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
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
                      <div v-if="!!card.tasks && card.tasks.length > 0">
                        <q-expansion-item
                          expand-icon-class="text-blue"
                          v-for="task in card.tasks"
                          :key="task.sortPosition"
                          style="background:#FDD50033"
                          class="q-mb-sm"
                          v-show="task.active === true"
                        >
                          <template v-slot:header>
                            <q-item-section>
                              <p class="font-18 text-weight-600 q-ma-none">
                                {{ task.name }}
                              </p>
                            </q-item-section>
                          </template>
                          <q-card>
                            <div
                              v-if="!!task.children && task.children.length > 0"
                            >
                              <q-card-section
                                horizontal
                                v-for="item in task.children"
                                :key="item.sortPosition"
                                class="q-pl-none q-py-sm q-pr-none"
                              >
                                <div class="col-12">
                                  <div class="row justify-between items-center">
                                    <div class="col-11">
                                      <p class="font-14 q-ma-none">
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="col-auto">
                                      <q-checkbox
                                        disable
                                        color="primary"
                                        class="isActiveCheckbox font-16 q-py-none"
                                        :value="item.active"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </div>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
            </q-card>
          </div>

          <div
            v-if="!!checklist.preparation.start && !!checklist.preparation.end"
            class="col-12 q-mb-md"
          >
            <q-card
              class="shadow-1 radius-20"
              :class="
                checkProgress(
                  checklist.preparation.start,
                  checklist.preparation.end
                )
              "
            >
              <q-card-section
                horizontal
                class="q-pa-md items-start q-col-gutter-x-sm"
              >
                <div class="col-4">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="font-20 text-weight-600 q-mb-xs q-mt-none">
                        Preparation of the project idea outline with internal
                        coordination
                      </h4>
                    </div>
                    <div class="col-2">
                      <p class="q-mb-none font-16">Start</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mb-none font-16">
                        {{
                          dateFormatter(
                            !!checklist.preparation &&
                              checklist.preparation.start
                          )
                        }}
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="q-mt-sm font-16">End</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mt-sm font-16">
                        {{
                          dateFormatter(
                            !!checklist.preparation && checklist.preparation.end
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-for="(card, propertyName) in checklist.preparation"
                    :key="card.sortPosition"
                  >
                    <div
                      v-if="
                        (propertyName != 'end' ||
                          propertyName != 'start' ||
                          propertyName != 'id') &&
                          card.active === true
                      "
                    >
                      <div class="q-mb-sm" style="background:#16428B1A">
                        <div class="q-pa-md font-16">
                          <div class="row justify-between items-start q-mb-md">
                            <div>
                              <p
                                class="font-18 text-blue text-weight-600 q-ma-none"
                              >
                                {{
                                  propertyName === "inspection"
                                    ? "Inspection"
                                    : propertyName === "captureRequirements"
                                    ? "Capture requirements"
                                    : propertyName === "captureNeeds"
                                    ? "Capture Needs"
                                    : ""
                                }}
                              </p>
                              <p class="font-14 q-ma-none">
                                {{ card.name || "No name filled" }}
                              </p>
                            </div>
                            <div
                              v-if="
                                checkProgress(
                                  checklist.preparation.start,
                                  checklist.preparation.end
                                ) !== 'notStarted'
                              "
                            >
                              <q-chip square class="text-weight-600">{{
                                checkProgress(
                                  checklist.preparation.start,
                                  checklist.preparation.end
                                ) === "done"
                                  ? "Done"
                                  : "In Progress"
                              }}</q-chip>
                            </div>
                          </div>

                          <div class="row items-center q-mb-md">
                            <div>
                              <p class="font-16 text-blue-5 q-ma-none">
                                Description
                              </p>
                              <p class="font-16 q-ma-none text-block">
                                {{ card.text || "No description filled" }}
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'inspection'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'captureRequirements'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'captureNeeds'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
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
                      <div v-if="!!card.tasks && card.tasks.length > 0">
                        <q-expansion-item
                          expand-icon-class="text-blue"
                          v-for="task in card.tasks"
                          :key="task.sortPosition"
                          style="background:#FDD50033"
                          class="q-mb-sm"
                          v-show="task.active === true"
                        >
                          <template v-slot:header>
                            <q-item-section>
                              <p class="font-18 text-weight-600 q-ma-none">
                                {{ task.name }}
                              </p>
                            </q-item-section>
                          </template>
                          <q-card>
                            <div
                              v-if="!!task.children && task.children.length > 0"
                            >
                              <q-card-section
                                horizontal
                                v-for="item in task.children"
                                :key="item.sortPosition"
                                class="q-pl-none q-py-sm q-pr-none"
                              >
                                <div class="col-12">
                                  <div class="row justify-between items-center">
                                    <div class="col-11">
                                      <p class="font-14 q-ma-none">
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="col-auto">
                                      <q-checkbox
                                        disable
                                        color="primary"
                                        class="isActiveCheckbox font-16 q-py-none"
                                        :value="item.active"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </div>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
            </q-card>
          </div>

          <div
            v-if="
              !!checklist.fundingResearch.start &&
                !!checklist.fundingResearch.end
            "
            class="col-12 q-mb-md"
          >
            <q-card
              :class="
                checkProgress(
                  checklist.fundingResearch.start,
                  checklist.fundingResearch.end
                )
              "
              class="shadow-1 radius-20"
            >
              <q-card-section
                horizontal
                class="q-pa-md items-start q-col-gutter-x-sm"
              >
                <div class="col-4">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="font-20 text-weight-600 q-mb-xs q-mt-none">
                        Funding research
                      </h4>
                    </div>
                    <div class="col-2">
                      <p class="q-mb-none font-16">Start</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mb-none font-16">
                        {{
                          dateFormatter(
                            !!checklist.fundingResearch &&
                              checklist.fundingResearch.start
                          )
                        }}
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="q-mt-sm font-16">End</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mt-sm font-16">
                        {{
                          dateFormatter(
                            !!checklist.fundingResearch &&
                              checklist.fundingResearch.end
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-for="(card, propertyName) in checklist.fundingResearch"
                    :key="card.sortPosition"
                  >
                    <div
                      v-if="
                        (propertyName != 'end' ||
                          propertyName != 'start' ||
                          propertyName != 'id') &&
                          card.active === true
                      "
                    >
                      <div class="q-mb-sm" style="background:#16428B1A">
                        <div class="q-pa-md font-16">
                          <div class="row justify-between items-start q-mb-md">
                            <div>
                              <p
                                class="font-18 text-blue text-weight-600 q-ma-none"
                              >
                                {{
                                  propertyName === "checkDatabase"
                                    ? "Check database “Fundings”"
                                    : propertyName === "checkForFunding"
                                    ? "Check for funding scouting"
                                    : propertyName === "checkWithFunding"
                                    ? "Joint research for funding or check of the project idea"
                                    : propertyName === "checkGuildlines"
                                    ? "Check Guidlines (long version)"
                                    : ""
                                }}
                              </p>
                              <p class="font-14 q-ma-none">
                                {{ card.name || "No name filled" }}
                              </p>
                            </div>
                            <div
                              v-if="
                                checkProgress(
                                  checklist.fundingResearch.start,
                                  checklist.fundingResearch.end
                                ) !== 'notStarted'
                              "
                            >
                              <q-chip square class="text-weight-600">{{
                                checkProgress(
                                  checklist.fundingResearch.start,
                                  checklist.fundingResearch.end
                                ) === "done"
                                  ? "Done"
                                  : "In Progress"
                              }}</q-chip>
                            </div>
                          </div>
                          <div class="row items-center q-mb-md">
                            <div>
                              <p class="font-16 text-blue-5 q-ma-none">
                                Description
                              </p>
                              <p class="font-16 q-ma-none text-block">
                                {{ card.text || "No description filled" }}
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkDatabase'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkForFunding'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkWithFunding'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkGuildlines'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
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
                      <div v-if="!!card.tasks && card.tasks.length > 0">
                        <q-expansion-item
                          expand-icon-class="text-blue"
                          v-for="task in card.tasks"
                          :key="task.sortPosition"
                          style="background:#FDD50033"
                          class="q-mb-sm"
                          v-show="task.active === true"
                        >
                          <template v-slot:header>
                            <q-item-section>
                              <p class="font-18 text-weight-600 q-ma-none">
                                {{ task.name }}
                              </p>
                            </q-item-section>
                          </template>
                          <q-card>
                            <div
                              v-if="!!task.children && task.children.length > 0"
                            >
                              <q-card-section
                                horizontal
                                v-for="item in task.children"
                                :key="item.sortPosition"
                                class="q-pl-none q-py-sm q-pr-none"
                              >
                                <div class="col-12">
                                  <div class="row justify-between items-center">
                                    <div class="col-11">
                                      <p class="font-14 q-ma-none">
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="col-auto">
                                      <q-checkbox
                                        disable
                                        color="primary"
                                        class="isActiveCheckbox font-16 q-py-none"
                                        :value="item.active"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </div>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
            </q-card>
          </div>

          <div
            v-if="
              !!checklist.preparationOfProject.start &&
                !!checklist.preparationOfProject.end
            "
            class="col-12 q-mb-md"
          >
            <q-card
              :class="
                checkProgress(
                  checklist.preparationOfProject.start,
                  checklist.preparationOfProject.end
                )
              "
              class="shadow-1 radius-20"
            >
              <q-card-section
                horizontal
                class="q-pa-md items-start q-col-gutter-x-sm"
              >
                <div class="col-4">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="font-20 text-weight-600 q-mb-xs q-mt-none">
                        Preparation/optimisation of project documents
                      </h4>
                    </div>
                    <div class="col-2">
                      <p class="q-mb-none font-16">Start</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mb-none font-16">
                        {{
                          dateFormatter(
                            !!checklist.preparationOfProject &&
                              checklist.preparationOfProject.start
                          )
                        }}
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="q-mt-sm font-16">End</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mt-sm font-16">
                        {{
                          dateFormatter(
                            !!checklist.preparationOfProject &&
                              checklist.preparationOfProject.end
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-for="(card,
                    propertyName) in checklist.preparationOfProject"
                    :key="card.sortPosition"
                  >
                    <div
                      v-if="
                        (propertyName != 'end' ||
                          propertyName != 'start' ||
                          propertyName != 'id') &&
                          card.active === true
                      "
                    >
                      <div class="q-mb-sm" style="background:#16428B1A">
                        <div class="q-pa-md font-16">
                          <div class="row justify-between items-start q-mb-md">
                            <div>
                              <p
                                class="font-18 text-blue text-weight-600 q-ma-none"
                              >
                                {{
                                  propertyName === "checkContent"
                                    ? "Check Content with Guidlines"
                                    : propertyName === "checkCooperations"
                                    ? "If necessary check cooperations"
                                    : propertyName === "checkSimilarProejcts"
                                    ? "If necessary check similar projects"
                                    : propertyName === "checkPlanning"
                                    ? "Check planning and financing with all relevant departments"
                                    : ""
                                }}
                              </p>
                              <p class="font-14 q-ma-none">
                                {{ card.name || "No name filled" }}
                              </p>
                            </div>
                            <div
                              v-if="
                                checkProgress(
                                  checklist.preparationOfProject.start,
                                  checklist.preparationOfProject.end
                                ) !== 'notStarted'
                              "
                            >
                              <q-chip square class="text-weight-600">{{
                                checkProgress(
                                  checklist.preparationOfProject.start,
                                  checklist.preparationOfProject.end
                                ) === "done"
                                  ? "Done"
                                  : "In Progress"
                              }}</q-chip>
                            </div>
                          </div>
                          <div class="row items-center q-mb-md">
                            <div>
                              <p class="font-16 text-blue-5 q-ma-none">
                                Description
                              </p>
                              <p class="font-16 q-ma-none text-block">
                                {{ card.text || "No description filled" }}
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkContent'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkCooperations'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkSimilarProejcts'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'checkPlanning'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
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
                      <div v-if="!!card.tasks && card.tasks.length > 0">
                        <q-expansion-item
                          expand-icon-class="text-blue"
                          v-for="task in card.tasks"
                          :key="task.sortPosition"
                          style="background:#FDD50033"
                          class="q-mb-sm"
                          v-show="task.active === true"
                        >
                          <template v-slot:header>
                            <q-item-section>
                              <p class="font-18 text-weight-600 q-ma-none">
                                {{ task.name }}
                              </p>
                            </q-item-section>
                          </template>
                          <q-card>
                            <div
                              v-if="!!task.children && task.children.length > 0"
                            >
                              <q-card-section
                                horizontal
                                v-for="item in task.children"
                                :key="item.sortPosition"
                                class="q-pl-none q-py-sm q-pr-none"
                              >
                                <div class="col-12">
                                  <div class="row justify-between items-center">
                                    <div class="col-11">
                                      <p class="font-14 q-ma-none">
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="col-auto">
                                      <q-checkbox
                                        disable
                                        color="primary"
                                        class="isActiveCheckbox font-16 q-py-none"
                                        :value="item.active"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </div>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
            </q-card>
          </div>

          <div
            v-if="
              !!checklist.legitimation.start && !!checklist.legitimation.end
            "
            class="col-12 q-mb-md"
          >
            <q-card
              :class="
                checkProgress(
                  checklist.legitimation.start,
                  checklist.legitimation.end
                )
              "
              class="shadow-1 radius-20"
            >
              <q-card-section
                horizontal
                class="q-pa-md items-start q-col-gutter-x-sm"
              >
                <div class="col-4">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="font-20 text-weight-600 q-mb-xs q-mt-none">
                        Legitimation for submission
                      </h4>
                    </div>
                    <div class="col-2">
                      <p class="q-mb-none font-16">Start</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mb-none font-16">
                        {{
                          dateFormatter(
                            !!checklist.legitimation &&
                              checklist.legitimation.start
                          )
                        }}
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="q-mt-sm font-16">End</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mt-sm font-16">
                        {{
                          dateFormatter(
                            !!checklist.legitimation &&
                              checklist.legitimation.end
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-for="(card, propertyName) in checklist.legitimation"
                    :key="card.sortPosition"
                  >
                    <div
                      v-if="
                        (propertyName != 'end' ||
                          propertyName != 'start' ||
                          propertyName != 'id') &&
                          card.active === true
                      "
                    >
                      <div class="q-mb-sm" style="background:#16428B1A">
                        <div class="q-pa-md font-16">
                          <div class="row justify-between items-start q-mb-md">
                            <div>
                              <p
                                class="font-18 text-blue text-weight-600 q-ma-none"
                              >
                                {{
                                  propertyName === "template"
                                    ? "Presentation/discussion of the project documents"
                                    : ""
                                }}
                              </p>
                              <p class="font-14 q-ma-none">
                                {{ card.name || "No name filled" }}
                              </p>
                            </div>
                            <div
                              v-if="
                                checkProgress(
                                  checklist.legitimation.start,
                                  checklist.legitimation.end
                                ) !== 'notStarted'
                              "
                            >
                              <q-chip square class="text-weight-600">{{
                                checkProgress(
                                  checklist.legitimation.start,
                                  checklist.legitimation.end
                                ) === "done"
                                  ? "Done"
                                  : "In Progress"
                              }}</q-chip>
                            </div>
                          </div>

                          <div class="row items-center q-mb-md">
                            <div>
                              <p class="font-16 text-blue-5 q-ma-none">
                                Description
                              </p>
                              <p class="font-16 q-ma-none text-block">
                                {{ card.text || "No description filled" }}
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'template'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
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
                      <div v-if="!!card.tasks && card.tasks.length > 0">
                        <q-expansion-item
                          expand-icon-class="text-blue"
                          v-for="task in card.tasks"
                          :key="task.sortPosition"
                          style="background:#FDD50033"
                          class="q-mb-sm"
                          v-show="task.active === true"
                        >
                          <template v-slot:header>
                            <q-item-section>
                              <p class="font-18 text-weight-600 q-ma-none">
                                {{ task.name }}
                              </p>
                            </q-item-section>
                          </template>
                          <q-card>
                            <div
                              v-if="!!task.children && task.children.length > 0"
                            >
                              <q-card-section
                                horizontal
                                v-for="item in task.children"
                                :key="item.sortPosition"
                                class="q-pl-none q-py-sm q-pr-none"
                              >
                                <div class="col-12">
                                  <div class="row justify-between items-center">
                                    <div class="col-11">
                                      <p class="font-14 q-ma-none">
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="col-auto">
                                      <q-checkbox
                                        disable
                                        color="primary"
                                        class="isActiveCheckbox font-16 q-py-none"
                                        :value="item.active"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </div>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
            </q-card>
          </div>

          <div
            v-if="
              !!checklist.finalExamination.start &&
                !!checklist.finalExamination.end
            "
            class="col-12 q-mb-md"
          >
            <q-card
              :class="
                checkProgress(
                  checklist.finalExamination.start,
                  checklist.finalExamination.end
                )
              "
              class="shadow-1 radius-20"
            >
              <q-card-section
                horizontal
                class="q-pa-md items-start q-col-gutter-x-sm"
              >
                <div class="col-4">
                  <div class="row">
                    <div class="col-12">
                      <h4 class="font-20 text-weight-600 q-mb-xs q-mt-none">
                        Final examination of the project documents
                      </h4>
                    </div>
                    <div class="col-2">
                      <p class="q-mb-none font-16">Start</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mb-none font-16">
                        {{
                          dateFormatter(
                            !!checklist.finalExamination &&
                              checklist.finalExamination.start
                          )
                        }}
                      </p>
                    </div>
                    <div class="col-2">
                      <p class="q-mt-sm font-16">End</p>
                    </div>
                    <div class="col-10">
                      <p class="q-mt-sm font-16">
                        {{
                          dateFormatter(
                            !!checklist.finalExamination &&
                              checklist.finalExamination.end
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-for="(card, propertyName) in checklist.finalExamination"
                    :key="card.sortPosition"
                  >
                    <div
                      v-if="
                        (propertyName != 'end' ||
                          propertyName != 'start' ||
                          propertyName != 'id') &&
                          card.active === true
                      "
                    >
                      <div class="q-mb-sm" style="background:#16428B1A">
                        <div class="q-pa-md font-16">
                          <div class="row justify-between items-start q-mb-md">
                            <div>
                              <p
                                class="font-18 text-blue text-weight-600 q-ma-none"
                              >
                                {{
                                  propertyName === "signatures"
                                    ? "Collection of signatures"
                                    : propertyName === "revision"
                                    ? "Revision of project documents"
                                    : ""
                                }}
                              </p>
                              <p class="font-14 q-ma-none">
                                {{ card.name || "No name filled" }}
                              </p>
                            </div>
                            <div
                              v-if="
                                checkProgress(
                                  checklist.finalExamination.start,
                                  checklist.finalExamination.end
                                ) !== 'notStarted'
                              "
                            >
                              <q-chip square class="text-weight-600">{{
                                checkProgress(
                                  checklist.finalExamination.start,
                                  checklist.finalExamination.end
                                ) === "done"
                                  ? "Done"
                                  : "In Progress"
                              }}</q-chip>
                            </div>
                          </div>

                          <div class="row items-center q-mb-md">
                            <div>
                              <p class="font-16 text-blue-5 q-ma-none">
                                Description
                              </p>
                              <p class="font-16 q-ma-none text-block">
                                {{ card.text || "No description filled" }}
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'signatures'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
                              </div>
                            </div>
                            <div v-else>
                              <p class="q-mt-sm q-mb-sm">
                                No Files Uploaded
                              </p>
                            </div>
                          </div>
                          <div v-if="propertyName === 'revision'">
                            <div
                              v-if="card.file && card.file.length > 0"
                              class="row items-center q-mb-none"
                            >
                              <div
                                v-for="(file, index) in card.file"
                                :key="index"
                                class="col-auto q-mr-md"
                              >
                                <a
                                  class="q-mb-md text-blue block text-weight-600"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  :href="`${appUrl}${file.url}`"
                                  >{{ file.name }}</a
                                >
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
                      <div v-if="!!card.tasks && card.tasks.length > 0">
                        <q-expansion-item
                          expand-icon-class="text-blue"
                          v-for="task in card.tasks"
                          :key="task.sortPosition"
                          style="background:#FDD50033"
                          class="q-mb-sm"
                          v-show="task.active === true"
                        >
                          <template v-slot:header>
                            <q-item-section>
                              <p class="font-18 text-weight-600 q-ma-none">
                                {{ task.name }}
                              </p>
                            </q-item-section>
                          </template>
                          <q-card>
                            <div
                              v-if="!!task.children && task.children.length > 0"
                            >
                              <q-card-section
                                horizontal
                                v-for="item in task.children"
                                :key="item.sortPosition"
                                class="q-pl-none q-py-sm q-pr-none"
                              >
                                <div class="col-12">
                                  <div class="row justify-between items-center">
                                    <div class="col-11">
                                      <p class="font-14 q-ma-none">
                                        {{ item.name }}
                                      </p>
                                    </div>
                                    <div class="col-auto">
                                      <q-checkbox
                                        disable
                                        color="primary"
                                        class="isActiveCheckbox font-16 q-py-none"
                                        :value="item.active"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-card-section>
                            </div>
                          </q-card>
                        </q-expansion-item>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator inset class="bg-blue opacity-10" />
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
  name: "checklistContent",
  data() {
    return {
      slide: 1,
      isLoading: false
    };
  },
  watch: {
    $route(to, from) {
      if (
        (to.params && to.params.id) !==
        (this.$store.state.implementationChecklist.checklist &&
          this.$store.state.implementationChecklist.checklist.id)
      ) {
        this.getNewData(to.params.id);
      }
    }
  },
  methods: {
    dateFormatter,
    checkProgress(start, end) {
      const currentDate = new Date();
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (currentDate < startDate) {
        return "notStarted";
      } else if (currentDate > endDate) {
        return "done";
      } else {
        return "inProgress";
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
    async viewChecklist() {
      console.log("Not yet implemented");
    },
    async getNewData(id) {
      console.log("url id", this.$route.params.id);
      console.log("funding Id", this.$store.state.funding.funding.id);
      if (!!id) {
        this.isLoading = true;
        await this.$store.dispatch("funding/getSpecificFunding", {
          id: id
        });
        this.isLoading = false;
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
    checklist() {
      return this.$store.state.implementationChecklist.checklist;
    }
  }
};
</script>

<style lang="scss">
.text-block {
  white-space: pre-line;
}
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
.isActiveCheckbox .q-checkbox__bg {
  background: transparent;
}
.isActiveCheckbox .q-checkbox__bg svg {
  color: $primary;
  padding: 2px;
}
.done {
  border: 1px solid $green;
  .q-chip {
    background: $green;
    .q-chip__content {
      color: white;
    }
  }
}
.inProgress {
  border: 1px solid $yellow;
  .q-chip {
    background: $yellow;
    .q-chip__content {
      color: black;
    }
  }
}
</style>
