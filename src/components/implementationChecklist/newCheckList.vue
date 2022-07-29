<template>
  <q-page class="q-mt-lg" :class="$q.screen.gt.sm ? 'q-mx-xl' : 'q-mx-sm'">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Umsetzungscheckliste
    </p>
    <div
      class="bg-white radius-20 q-py-lg"
      :class="{ 'q-px-md': $q.screen.gt.sm }"
    >
      <q-form
        ref="newChecklistForm"
        @validation-error="scrollToInvalidElement"
        class="q-gutter-lg q-px-md q-mb-md"
      >
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
              :rules="[val => !!val || 'Required']"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Ideengeber*in
            </p>
          </div>
          <div class="col-12 col-md-8">
            <q-btn-toggle
              v-model="form.ideaProvider"
              spread
              no-caps
              toggle-color="yellow"
              padding="12px 10px"
              color="transparent"
              toggle-text-color="black"
              text-color="black"
              class="no-shadow toggleGap"
              :options="ideaProviderOptions"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Ansprechpartner*in*
            </p>
          </div>
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-x-md q-col-gutter-y-lg">
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6 disabledClass"
                  placeholder="Name, Nachname"
                  :value="
                    !!checklist
                      ? form.info.contactName
                      : !!userDetails && userDetails.fullName
                  "
                  :rules="[]"
                  disable
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  disable
                  class="no-shadow input-radius-6 disabledClass"
                  placeholder="Gemeinde/Verwaltung"
                  :value="
                    !!checklist
                      ? form.municipality.title
                      : !!userDetails && userDetails.municipality.title
                  "
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
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  disable
                  dense
                  class="no-shadow input-radius-6 disabledClass"
                  placeholder="Steet, Nr."
                  :value="
                    !!checklist
                      ? form.info.streetNo
                      : !!userDetails && userDetails.streetNo
                  "
                  :rules="[]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  disable
                  class="no-shadow input-radius-6 disabledClass"
                  placeholder="Postal Code, City"
                  :value="
                    !!checklist
                      ? form.info.postalCode
                      : !!userDetails && userDetails.postalCode
                  "
                  :rules="[]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6 disabledClass"
                  placeholder="Telefon"
                  :value="
                    !!checklist
                      ? form.info.phone
                      : !!userDetails && userDetails.phone
                  "
                  :rules="[]"
                  disable
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6 disabledClass"
                  placeholder="E-Mail"
                  :value="!!checklist ? form.info.email : !!user && user.email"
                  :rules="[]"
                  disable
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">
              Link for Project Idea
            </p>
          </div>
          <div class="col-12 col-md-8">
            <ProjectIdeas
              :isInChecklist="true"
              :editing="checklist.project"
              @update:linkToProject="form.project = $event"
            />
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
              :editing="checklist.editors"
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
              Dieses Dokument ist nur für Sie sichtbar. Wenn Sie möchten, dass
              andere Benutzer dieses Dokument sehen können, können Sie "Auf
              Anfrage" oder "Für alle Benutzer" auswählen.
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
              :requiresValidation="true"
              :editing="checklist.categories"
              @update:category="form.categories = $event"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-12 col-md-4">
            <p class="font-16 no-margin">Tags*</p>
          </div>
          <div class="col-12 col-md-8">
            <Tags
              :requiresValidation="true"
              :editing="checklist.tags"
              @update:tag="form.tags = $event"
            />
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
                    class="radius-6"
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
            </div>
          </div>
        </div>
        <q-card style="background:#16428B1A" class="q-pa-none shadow-0">
          <q-card-section class="q-pa-md font-16 text-weight-600"
            >project activity</q-card-section
          >
        </q-card>
        <div
          v-for="(card, index) in form.items"
          :key="index"
          class="row items-start"
        >
          <div class="col-12 col-md-4 q-pr-sm">
            <p class="font-16 no-margin text-weight-600">
              {{ card.cardTitle }}
            </p>
            <div class="flex items-center row q-mt-md">
              <div class="col-2">
                <p class="font-14 no-margin">Start</p>
              </div>
              <div>
                <q-input
                  outlined
                  dense
                  :disable="disableDate(index)"
                  :rules="[val => !!val || 'Required']"
                  class="no-shadow input-radius-6"
                  :value="disableDate(index) ? '' : dateFormatter(card.start)"
                  readonly
                  color="primary"
                  bg-color="white"
                  :placeholder="$t('projectIdeaPlaceholder.plannedStartDate')"
                  @click="$refs.startDateProxy[index].show()"
                  ref="startDate"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        :ref="'startDateProxy'"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          :options="plannedStartOptions"
                          v-model="card.start"
                          mask="YYYY-MM-DD"
                          @input="$refs.startDateProxy[index].hide()"
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
            <div class="flex items-center row q-mt-md  ">
              <div class="col-2">
                <p class="font-14 no-margin">End</p>
              </div>
              <div>
                <q-input
                  outlined
                  dense
                  :disable="disableDate(index)"
                  :rules="[val => !!val || 'Required']"
                  class="no-shadow input-radius-6"
                  :value="disableDate(index) ? '' : dateFormatter(card.end)"
                  color="primary"
                  readonly
                  bg-color="white"
                  :placeholder="$t('projectIdeaPlaceholder.plannedEndDate')"
                  @click="$refs.endDateProxy[index].show()"
                  ref="endDate"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        :ref="'endDateProxy'"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          :options="plannedEndOptions"
                          v-model="card.end"
                          mask="YYYY-MM-DD"
                          @input="$refs.endDateProxy[index].hide()"
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
          <div class="col-12 col-md-8">
            <draggable
              handle=".handle"
              class="col-12 col-md-8"
              v-model="card.items"
              ghost-class="movingClass"
              @change="onChange($event, card.items)"
              :force-fallback="true"
              :move="onMove"
            >
              <transition-group type="transition" tag="div" name="flip-list">
                <q-card
                  v-for="(element, secondIndex) in card.items"
                  :key="element.objectId"
                  class="q-pa-none shadow-0"
                  :class="secondIndex > 0 ? 'q-mt-xs' : ''"
                >
                  <div style="background:#16428B1A">
                    <q-card-section
                      horizontal
                      class="items-center justify-between q-pa-sm"
                    >
                      <div class="col-auto">
                        <q-icon
                          size="sm"
                          color="blue-5"
                          class="handle q-mr-md q-py-sm bg-white radius-6 cursor-pointer"
                          :name="!!element.fixed ? 'lock' : 'reorder'"
                        />
                      </div>
                      <div class="col-10">
                        <div class="row items-center">
                          <div class="col-11 q-pr-sm">
                            <div class="row">
                              <div class="col-12">
                                <p
                                  class="no-margin font-18 text-blue text-weight-600"
                                >
                                  {{ element.objectTitle }}
                                </p>
                              </div>
                              <div v-show="!!element.desc" class="col-12">
                                <p class="no-margin font-14 text-italic">
                                  {{ element.desc }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-1">
                            <div
                              v-show="!!element.info && element.info.length > 0"
                              class="col-auto"
                            >
                              <q-btn
                                flat
                                round
                                class="q-pa-none"
                                icon="help_outline"
                                color="primary"
                              >
                                <q-tooltip
                                  content-class="bg-transparent shadow-2 text-black q-pa-none"
                                  content-style="min-width: 600px; max-width: 600px; max-height: 400px;"
                                  anchor="top left"
                                  self="bottom right"
                                  :offset="[-50, 10]"
                                >
                                  <q-card>
                                    <q-card-section class="q-pb-xs">
                                      <p
                                        class="no-margin font-16 text-weight-600"
                                      >
                                        Prüffrage:
                                      </p>
                                    </q-card-section>
                                    <q-card-section horizontal class="q-pr-md">
                                      <ul class="listClass">
                                        <li
                                          v-for="(info, index) in element.info"
                                          :key="index"
                                        >
                                          {{ info }}
                                        </li>
                                      </ul>
                                    </q-card-section>
                                  </q-card>
                                </q-tooltip>
                              </q-btn>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <q-toggle
                          size="lg"
                          color="primary"
                          class="customToggle"
                          @input="disableDate(index)"
                          v-model="element.active"
                        />
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row q-col-gutter-md">
                        <div class="col-12">
                          <q-input
                            outlined
                            bg-color="white"
                            dense
                            class="no-shadow input-radius-6"
                            placeholder="Name"
                            v-model="element.name"
                          />
                        </div>

                        <div
                          v-if="element.hasOwnProperty('project')"
                          class="col-12"
                        >
                          <ProjectIdeas
                            :isInChecklist="true"
                            :editing="
                              !!checklist
                                ? checklist.initialContact.captureIdea.project
                                : form.items
                                    .find(
                                      item => item.cardName === 'initialContact'
                                    )
                                    .items.find(
                                      item => item.objectName === 'captureIdea'
                                    ).project
                            "
                            @update:linkToProject="element.project = $event"
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            outlined
                            type="textarea"
                            rows="10"
                            bg-color="white"
                            class="no-shadow input-radius-6"
                            placeholder="text"
                            v-model="element.text"
                          />
                        </div>
                        <div class="col-12">
                          <div class="row items-center q-col-gutter-x-sm">
                            <div class="col-12 col-md-4">
                              <q-file
                                outlined
                                bg-color="transparent"
                                v-model="element.file"
                                class="uploadInput input-radius-6"
                                label-color="primary"
                                :label="
                                  !!element.file && element.file.length > 0
                                    ? 'Add file'
                                    : 'Upload File'
                                "
                                multiple
                                display-value=""
                                append
                              >
                                <template v-slot:prepend>
                                  <q-icon
                                    color="primary"
                                    class="on-right"
                                    name="upload"
                                  />
                                </template>
                              </q-file>
                            </div>
                            <div
                              class="col-12 q-mt-sm"
                              v-if="element.file && element.file.length > 0"
                            >
                              <q-item
                                class="q-py-none q-pl-none inline radius-6 items-center"
                                v-for="(file, index) in element.file"
                                :key="index"
                                clickable
                              >
                                <q-item-section side class="col-auto q-pr-xs">
                                  <q-avatar rounded size="48px">
                                    <p class="font-16 no-margin">
                                      {{ imgPreview(file).name.split(".")[1] }}
                                    </p>
                                  </q-avatar>
                                </q-item-section>
                                <q-item-section class="col-auto ">
                                  <q-item-label class="ellipsis" caption>{{
                                    imgPreview(file).name
                                  }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                  <q-btn
                                    icon="delete"
                                    @click.prevent.stop="
                                      removeFile(card, element, index)
                                    "
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
                    </q-card-section>
                  </div>
                  <draggable
                    v-if="element.active === true"
                    handle=".handle"
                    class="col-8"
                    v-model="element.tasks"
                    ghost-class="movingClass"
                    @change="onChange($event, element.tasks)"
                    :force-fallback="true"
                  >
                    <transition-group
                      type="transition"
                      tag="div"
                      name="flip-list"
                    >
                      <q-card
                        v-for="item in element.tasks"
                        :key="item.objectId"
                        class="shadow-0 q-my-xs"
                      >
                        <q-card-section
                          style="background:#FDD50033"
                          class="q-pa-sm items-center justify-between"
                          horizontal
                        >
                          <div class="col-auto">
                            <q-icon
                              size="sm"
                              color="blue-5"
                              class="handle q-mr-md q-py-sm bg-white radius-6 cursor-pointer"
                              name="reorder"
                            />
                          </div>
                          <div class="col-10">
                            <div class="row items-center">
                              <div class="col-11 q-pr-sm">
                                <div class="row">
                                  <div class="col-12">
                                    <p
                                      class="no-margin font-18 text-blue text-weight-600"
                                    >
                                      {{ item.name }}
                                    </p>
                                  </div>
                                  <div v-show="!!item.desc" class="col-12">
                                    <p class="no-margin font-14 text-italic">
                                      {{ item.desc }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="col-1">
                                <div
                                  v-show="!!item.info && item.info.length > 0"
                                  class="col-auto"
                                >
                                  <q-btn
                                    flat
                                    round
                                    class="q-pa-none"
                                    icon="help_outline"
                                    color="primary"
                                  >
                                    <q-tooltip
                                      content-class="bg-transparent shadow-2 text-black q-pa-none"
                                      content-style="min-width: 600px; max-width: 600px; max-height: 400px;"
                                      anchor="top left"
                                      self="bottom right"
                                      :offset="[-50, 10]"
                                    >
                                      <q-card>
                                        <q-card-section class="q-pb-xs">
                                          <p
                                            class="no-margin font-16 text-weight-600"
                                          >
                                            Prüffrage:
                                          </p>
                                        </q-card-section>
                                        <q-card-section
                                          horizontal
                                          class="q-pr-md"
                                        >
                                          <ul class="listClass">
                                            <li
                                              v-for="(info, index) in item.info"
                                              :key="index"
                                            >
                                              {{ info }}
                                            </li>
                                          </ul>
                                        </q-card-section>
                                      </q-card>
                                    </q-tooltip>
                                  </q-btn>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto">
                            <q-toggle
                              size="lg"
                              color="primary"
                              class="customToggle"
                              v-model="item.active"
                            />
                          </div>
                        </q-card-section>
                        <draggable
                          v-if="item.active === true"
                          handle=".handle"
                          class="col-8 q-ml-lg"
                          v-model="item.children"
                          ghost-class="movingClass"
                          @change="onChange($event, item.children)"
                          :force-fallback="true"
                        >
                          <transition-group
                            type="transition"
                            tag="div"
                            name="flip-list"
                          >
                            <q-card
                              v-for="child in item.children"
                              :key="child.objectId"
                              class="shadow-0"
                            >
                              <q-card-section
                                horizontal
                                class="items-center q-pa-xs justify-evenly"
                              >
                                <div class="col-auto ">
                                  <q-icon
                                    size="sm"
                                    color="blue-5"
                                    class="handle q-mr-md q-py-sm bg-white radius-6 cursor-pointer"
                                    name="reorder"
                                  />
                                </div>
                                <div class="col-10">
                                  <div class="row items-center">
                                    <div class="col-11">
                                      <p
                                        class="no-margin font-14 text-overflow"
                                      >
                                        {{ child.name }}
                                      </p>
                                    </div>
                                    <div class="col-1">
                                      <div
                                        v-show="
                                          !!child.info && child.info.length > 0
                                        "
                                        class="col-auto"
                                      >
                                        <q-btn
                                          flat
                                          round
                                          class="q-pa-none"
                                          icon="help_outline"
                                          color="primary"
                                        >
                                          <q-tooltip
                                            content-class="bg-transparent shadow-2 text-black q-pa-none"
                                            content-style="min-width: 600px; max-width: 600px; max-height: 400px;"
                                            anchor="top left"
                                            self="bottom right"
                                            :offset="[-50, 10]"
                                          >
                                            <q-card>
                                              <q-card-section class="q-pb-xs">
                                                <p
                                                  class="no-margin font-16 text-weight-600"
                                                >
                                                  Prüffrage:
                                                </p>
                                              </q-card-section>
                                              <q-card-section
                                                horizontal
                                                class="q-pr-md"
                                              >
                                                <ul class="listClass">
                                                  <li
                                                    v-for="(info,
                                                    index) in child.info"
                                                    :key="index"
                                                  >
                                                    {{ info }}
                                                  </li>
                                                </ul>
                                              </q-card-section>
                                            </q-card>
                                          </q-tooltip>
                                        </q-btn>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-auto">
                                  <q-toggle
                                    size="lg"
                                    color="primary"
                                    class="customToggle"
                                    v-model="child.active"
                                  />
                                </div>
                              </q-card-section>
                              <q-separator class="bg-blue q-mb-sm opacity-10" />
                            </q-card>
                          </transition-group>
                        </draggable>
                      </q-card>
                    </transition-group>
                  </draggable>
                </q-card>
              </transition-group>
            </draggable>
          </div>
          <div class="col-12">
            <q-separator class="bg-blue q-mt-md opacity-10" />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-5 col-md-2 q-mr-sm">
            <q-btn
              :label="$t('draftButton.saveAsDraft')"
              @click="
                !!checklist ? editChecklist(false) : submitNewChecklist(false)
              "
              size="16px"
              outline
              color="primary"
              :loading="isLoading"
              no-caps
              class="radius-6 q-py-xs full-width"
            />
          </div>
          <div class="col-5 col-md-2 q-ml-sm">
            <q-btn
              :label="$t('publishButton.publish')"
              @click="
                !!checklist ? editChecklist(true) : submitNewChecklist(true)
              "
              size="16px"
              color="primary"
              :loading="isLoading"
              no-caps
              class="radius-6 q-py-xs full-width"
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
import ProjectIdeas from "components/funding/ProjectIdeas.vue";
import UserSelect from "components/user/UserSelect.vue";
import Categories from "components/projects/create/Categories.vue";
import Tags from "components/projects/create/Tags.vue";
import draggable from "vuedraggable";
import { dateFormatter } from "src/boot/dateFormatter";

export default {
  name: "newCheckList",
  components: {
    draggable,
    ProjectIdeas,
    UserSelect,
    Categories,
    Tags
  },
  data() {
    return {
      projectIdea: true,
      form: {
        title: "",
        ideaProvider: "volunteering",
        project: {},
        visibility: "only for me",
        editors: [],
        items: [
          {
            cardName: "initialContact",
            cardTitle: "Erstgespräch mit dem politischen Ehrenamt",
            start: "",
            end: "",
            items: [
              // captureIdea
              {
                objectName: "captureIdea",
                objectTitle: "Erfassung der Projektidee (Themen, Inhalte)",
                desc:
                  "Wie kann eine potenzielle Projektidee vor einem Erstgespräch ermittelt werden?",
                name: "",
                text: "",
                sortPosition: 1,
                active: false,
                project: null,
                objectId: 1,
                file: null,
                tasks: [
                  {
                    name: "Projektidee-Quellen Nutzen",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Projektidee aus bestehenden kommunalen Entwicklungskonzept entnommen ",
                        sortPosition: 1,
                        active: false,
                        objectId: 1,
                        info: ["Sind Entwicklungskonzepte noch gültig?"]
                      },
                      {
                        name: "Projektidee aus Antrag der Politik entnommen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Projektidee aus lokalem Arbeitskreis entnommen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Projektidee im Erstgespräch (Einzelgemeinde oder Zusammenschluss) entwickelt",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Projektidee aus Vernetzungsgespräch mit anderen Kommunen oder Institutionen (z.B. Hochschulen, Privatwirtschaft, Vereine) entnommen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5,
                        info: [
                          "Umgang mit Projektideen von Seiten des nicht-politischen Ehrenamtes klären?"
                        ]
                      },
                      {
                        name:
                          "Projektidee durch externe Dienstleister/ Produktanbieter in Beratungsgespräch eingebracht",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name:
                          "Veröffentlichung von Förderprogrammen als Basis für Projektidee",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      }
                    ]
                  },
                  {
                    name: "Allgemeine Rahmenbedingungen ermitteln",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name: "Ziel und Nutzen der Projektidee definieren",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Bedarfe der Bürger*innen ermitteln (z.B. über Abfrage über der Homepage)",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Projektinitiator festlegen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3,
                        info: [
                          "Wer ist inhaltlicher Ansprechpartner für die Projektkoordination?"
                        ]
                      },
                      {
                        name:
                          "Finanzielle Rahmenbedingungen im Bauamt und der Kämmerei prüfen (u.a. Kostenschätzung und Liquidität der Kommune",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      }
                    ]
                  }
                ]
              },
              // caputreContect
              {
                objectName: "caputreContect",
                objectTitle:
                  "Erfassung Kontext (Themen, Inhalte, Mehrwert, Nutzen)",
                desc:
                  "Wie kann der Kontext einer Projektidee im Erstgespräch skizziert und im Nachgang konkretisiert werden?",
                name: "",
                text: "",
                active: false,
                sortPosition: 2,
                file: null,
                objectId: 2,
                info: [
                  "Könnte die Idee genehmigungspflichtig sein?",
                  "Sind die Eigentumsverhältnisse geklärt?",
                  "Könnte es weitere Hürden und Hindernisse geben?"
                ],
                tasks: [
                  {
                    name:
                      "Erste Einschätzungen zu den allgemeinen Rahmenbedingungen dokumentieren",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Offene Abfrage der kommunalen Rahmenbedingungen im Erstgespräch dokumentieren",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Bestehende Dokumente (Konzepte, Planungen, Strategien) analysieren",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Diskussion zu weiteren wichtigen Gesprächspartnern führen und dokumentieren",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Produktrecherche, Kostenplanung und Wirtschaftlichkeitsprüfung skizzieren",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      }
                    ]
                  },
                  {
                    name:
                      "Input von weiteren Akteur*innen ermitteln und dokumentieren (z.B. Fachbereiche der Verwaltung, existierende Projektideen/ Referenzprojekte)",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name:
                          "Best-Practice-Beispiele zu existierende Projektideen/ Referenzprojekte finden und mit kommunalen Rahmenbedingungen abgleichen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Input wichtiger Akteure im Nachgang über Workshopformat dokumentieren",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Input wichtiger Akteure im Nachgang über Interviewformat dokumentieren",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cardName: "preparation",
            cardTitle: "Erstellung der Projektideen-Skizze",
            start: "",
            end: "",
            items: [
              {
                objectName: "inspection",
                objectTitle: "Ggf. Begehung (Abschätzung Projektumfang)",
                name: "",
                text: "",
                sortPosition: 1,
                objectId: 1,
                active: false,
                fixed: true,
                file: null,
                info: [
                  "Sind Gutachten/Vorstudien nötig?",
                  "Müssen externe Dienstleister beauftragt werden?"
                ],
                tasks: [
                  {
                    name: "Begehung zielgerichtet vorbereiten",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Alle relevanten Akteure (z.B. Bauamt, externe Akteure) zur Begehung einladen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Allgemeine Blickwinkel der Fachabteilungen der Verwaltung einholen (Kämmerei, Bauamt, etc.)",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Investitionskosten anhand von Projektideen/ Referenzprojekten grob ermitteln",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Erweiterten Prüfauftrag an die Verwaltung (kein endgültiger Beschluss) mit Entscheider*innen abstimmen und veranlassen",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Bedarfe der Bürger*innen einfließen lassen, bspw. über Mängel-Melder (digital, Telefon, Bürgerservice, Bürgermeister etc.), Workshops, Entwicklungskonzepte",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name:
                          "Kurzinfos zu potenziellen Fördermöglichkeiten vorbereiten",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      }
                    ]
                  },
                  {
                    name:
                      "Weitere Rahmenbedingungen beim Vor-Ort-Termin sondieren",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name:
                          "Besprechung durchführen samt Dokumentation des Gesprächsverlauf, Anfertigung einer Planskizze etc.",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Besprechung im Büro anhand von Projektideen-Skizze, Bildern, Karten und Planskizzen etc.",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Finanzielle Spielräume mit der Kämmerei anhand der Projektideen-Skizze und den Kurzinfos zu Fördermöglichkeiten besprechen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "captureRequirements",
                objectTitle: "Erfassung Anforderungen (Projektumfang)",
                name: "",
                text: "",
                desc: "Wie können Anforderungen erfasst werden?",
                sortPosition: 2,
                objectId: 2,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name:
                      "Projektentwicklung partizipativ gestalten und konkretisieren",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name: "Arbeitsgruppe einrichten",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Strukturiertes Brainstorming mit entsprechenden Fragestellungen und geeigneter Methodik durchführen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Offenes Brainstorming mit entsprechenden Fragestellungen durchführen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Ideen werden auch aus der Bürgerschaft mit entsprechenden Fragestellungen und geeigneter Methodik mitgenommen– nicht nur Politik",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name: "Genehmigung bei der Kommunalaufsicht prüfen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      }
                    ]
                  },
                  {
                    name:
                      "Projektsteckbrief für die weiteren Schritte dokumentieren",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name:
                          "Bedarfsanalyse aus den vorherigen Schritten dokumentieren (Phase 0)",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Recherche zu Projektideen/ Referenzprojekten samt Abstimmung mit Kommune dokumentieren",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Fragebogen-Abfrage durchführen (Zielgruppen)",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Interview-Abfrage durchführen (Kooperationspartner)",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Genehmigungen prüfen, ggf. schon einholen und dokumentieren (Zeitvorlauf, Voranfragen, Gutachten)",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "captureNeeds",
                objectTitle: "Erfassung Bedarfe/Ziele",
                name: "",
                text: "",
                desc: "Wie können Ziele und Bedarfe erfasst werden?",
                sortPosition: 3,
                objectId: 3,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name: "Erwartungen an das Projekt definieren",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name: "Alle Beteiligten auf einen Nenner bringen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Erwartungshaltung transparent machen und konsolidieren",
                        sortPosition: 2,
                        active: false,
                        objectId: 2,
                        info: [
                          "Mit welchen Methoden-Formaten kann man das am besten machen?"
                        ]
                      },
                      {
                        name:
                          "Offenes Sammlung von Zielen (und Zwischenzielen) und Bedarfen in einer Gruppendiskussion",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name: "Fragebogen-Abfrage (Zielgruppen)",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      }
                    ]
                  },
                  {
                    name: "Ressourcen der Akteure bündeln",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name:
                          "Kommunikation und Absprache im eigenen Haus koordinieren",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Zeitschiene abstimmen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Ressourcen und Aufgaben zielgerichtet verteilen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Kommunikation mit Bürger*innen (Homepage, Gemeindebrief, Presse) ermöglichen",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Strukturierte Sammlung von Zielen und Bedarfen in einer Gruppendiskussion",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name:
                          "Interview-Abfrage durchführen (Kooperationspartner)",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name:
                          "Recherche zu Projekten mit ähnlichen Zielen und Bedarfen",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cardName: "fundingResearch",
            cardTitle: "Fördermittelrecherche",
            start: "",
            end: "",
            items: [
              {
                objectName: "checkDatabase",
                objectTitle: "Check Datenbank „Fördermittel“",
                name: "",
                text: "",
                desc: "Welche grundlegenden Informationen werden benötigt?",
                sortPosition: 1,
                objectId: 1,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name: "Zeitschiene und Inhalte abgleichen",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Eigene Zeitplanung mit zeitlichem Rahmen des Fördertopfes abgleichen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Themenkategorien abgleichen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Projektinhalte aus User Aktivität 2 abgleichen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Projektnutzen und Kosten aus User Aktivität 2 abgleichen",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Akteurskonstellation/ Kooperationsbedarf abgleichen, u.a. auch zwecks inhaltlicher und/ oder finanzieller Anpassungen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      }
                    ]
                  },
                  {
                    name: "Kosten- und Finanzierungsplan aufstellen",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name:
                          "Projektmehrwert/ -nutzen mit Kosten- und Finanzierungsplan verknüpfen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Kostenschätzung einholen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Akteurskonstellation bzgl. Finanzierung/ Inhalte bewerten und prüfen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "checkForFunding",
                objectTitle: "Check über Förderscouting",
                name: "",
                text: "",
                desc:
                  "Welche grundlegenden Informationen werden benötigt? Kann ggf. schon ab User Aktivität 2 mit dem Förderscouting erfolgen (2.1 oder 2.2)",
                sortPosition: 2,
                objectId: 2,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name:
                      "Gemeinsame Fördermittelrecherche bzw. Check der Projektidee durchführen",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name: "Förderscouting prüft Themenkategorien gegen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Förderscouting hinterfragt Projektziele",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Förderscouting hinterfragt Projektmehrwert/ -nutzen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name: "Förderscouting hinterfragt Kostenschätzung",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Förderscouting hinterfragt Kooperationspartner*innen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name:
                          "Projektkoordinator holt erste Kostenangebote (über Fachamt) ein",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name:
                          "Protokollauszüge relevanter Ausschüsse im Projektsteckbrief dokumentieren",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "checkWithFunding",
                objectTitle: "Check beim Fördermittelgeber",
                name: "",
                text: "",
                desc:
                  "Welche Informationen müssen für ein zielführendes Gespräch ermittelt werden?",
                sortPosition: 3,
                objectId: 3,
                active: false,
                fixed: false,
                file: null,
                tasks: [
                  {
                    name:
                      "Worauf muss im Gespräch mit dem Fördermittelgeber geachtet werden?",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name: "Fristen beachten",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Check des Projektsteckbriefes mit dem Fördermittelgeber",
                        sortPosition: 2,
                        active: false,
                        objectId: 2,
                        info: [
                          "Passen die Projektziele mit den Förderzielen zusammen?",
                          "Sind alle relevanten Themenkategorien in die Projektidee integriert?",
                          "Passt der Projektinhalte zum Förderzweck?",
                          "Passt der Projektmehrwert/ -nutzen zum Förderzweck?",
                          "Passen die Kostenschätzungen (Eigenmittel, Folgekosten) in das Fördervolumen?",
                          "Was ist hinsichtlich der Besitzverhältnisse zu beachten?",
                          "Was ist hinsichtlich der Kooperationspartner*innen zu beachten?"
                        ]
                      },
                      {
                        name:
                          "Check Rahmenbedingungen (allgemein) mit Projektplanung",
                        sortPosition: 3,
                        active: false,
                        objectId: 3,
                        info: ["Welchen Planungsstand sollte das Projekt haben"]
                      },
                      {
                        name:
                          "Check alternative Finanzierungs-/ Fördermöglichkeiten ",
                        sortPosition: 4,
                        active: false,
                        objectId: 4,
                        info: [
                          "Welche Möglichkeiten der Kumulierung gibt es?",
                          "Wie hoch muss der Eigenanteil sein"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "checkGuildlines",
                objectTitle: "Check Richtlinie (Langfassung)",
                name: "",
                text: "",
                desc:
                  "Worauf muss bei der Durchsicht von Langfassungen geachtet werden?",
                sortPosition: 4,
                objectId: 4,
                active: false,
                fixed: false,
                file: null,
                tasks: [
                  {
                    name:
                      "Worauf muss beim Abgleich des Projektsteckbriefes mit der Richtlinie geachtet werden?",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name: "Fristen beachten",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Check des Projektsteckbriefes mit Richtlinie",
                        sortPosition: 2,
                        active: false,
                        objectId: 2,
                        info: [
                          "Passen die Projektziele mit den Förderzielen zusammen?",
                          "Sind alle relevanten Themenkategorien in die Projektidee integriert?",
                          "Passt der Projektinhalte zum Förderzweck?",
                          "Passt der Projektmehrwert/ -nutzen zum Förderzweck?",
                          "Passen die Kostenschätzungen (Eigenmittel, Folgekosten) in das Fördervolumen?",
                          "Was ist hinsichtlich der Besitzverhältnisse zu beachten?",
                          "Was ist hinsichtlich der Kooperationspartner*innen zu beachten?"
                        ]
                      }
                    ]
                  },
                  {
                    name: "Grundlegende Förderbedingungen prüfen",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name: "Antragsberechtigung prüfen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Brutto/netto Förderung prüfen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Schwellenwerte/Bagatellgrenze prüfen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Spezielle Rahmenbedingungen und Bedeutung (z.B. AZA-Richtlinie) prüfen",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Projektsteckbrief ggf. nachjustieren/ Passgenauigkeit zum Förderprogramm herstellen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name:
                          "Die richtigen Schlagwörter definieren/ adressieren",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name:
                          "Bei Unsicherheit weitere Rücksprache mit dem Fördermittelgeber",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      },
                      {
                        name:
                          "Alternative Finanzierungs- und Fördermöglichkeiten prüfen",
                        sortPosition: 8,
                        active: false,
                        objectId: 8
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cardName: "preparationOfProject",
            cardTitle: "Ausarbeitung/Optimierung Projektunterlagen",
            start: "",
            end: "",
            items: [
              {
                objectName: "checkContent",
                objectTitle: "Check Inhalt mit Richtlinie",
                name: "",
                text: "",
                desc:
                  "Welche inhaltlichen Hinweise gibt die Richtlinie, um die Förderfähigkeit des Projektantrages zu verbessern/zu erreichen?",
                sortPosition: 1,
                objectId: 1,
                active: false,
                fixed: false,
                file: null,
                tasks: [
                  {
                    name:
                      "Projektsteckbrief anhand der Richtlinien-Hinweise überarbeiten",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Inhaltliche Anpassung des Projektsteckbriefes anhand User Aktivität 3",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Überführung des Projektsteckbriefes in den Projektantrag",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Kostenschätzungen mit Fachamt präzisieren",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name: "Budgetsituation beim Fördermittelgeber erfragen",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Klärung letzter offener Fragen nach der Bearbeitung (telefonisch, E-Mail",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "checkCooperations",
                objectTitle: "Ggf. Check Kooperationen",
                name: "",
                text: "",
                desc:
                  "Welche weiteren Kooperationen sind zielführend, um die Projektqualität nachhaltig zu verbessern?",
                sortPosition: 2,
                objectId: 2,
                active: false,
                fixed: false,
                file: null,
                tasks: [
                  {
                    name: "Weitere zielführende Kooperationen identifizieren",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Beteiligte=Zielgruppe; PR/ÖA, Fachexperten, Kämmerei (hier breit denken)",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "ggf. Kontaktaufnahme mit weiteren Kooperationspartnern via Mail, Telefon, Gespräch",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Beteiligte aus allen Bereichen zusammenbringen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Private und Öffentliche Akteure (Vereine, Verbände etc.)",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      }
                    ]
                  },
                  {
                    name:
                      "Projektqualität durch weitere Kooperationspartner nachhaltig verbessern",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name: "Abfrage von weiteren Bedarfen bei Zielgruppe",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Reflektion des Projektinhaltes und Auslotung der Kooperationsmöglichkeiten",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Vereinbarung der Zusammenarbeit und ggf. Schließung einer Kooperationsvereinbarung",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "checkSimilarProejcts",
                objectTitle: "Ggf. Check vergleichbare Projekte",
                name: "",
                text: "",
                desc:
                  "Wie findet man vergleichbare Projekte und nutzt die Informationen für die Verbesserung der Projektqualität?",
                sortPosition: 3,
                objectId: 3,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name: "Vergleichbare Projekte identifizieren",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name: "Suche im Internet",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name:
                          "Kontaktaufnahme und Austausch mit Projektinitiatoren",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Suche über Netzwerkpartner und Kollegium",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Akteure mit Erfahrung mit Fördermittelgeber kontaktieren",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      }
                    ]
                  },
                  {
                    name:
                      "Projektqualität durch Abgleich mit vergleichbaren Projekten nachhaltig verbessern",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    children: [
                      {
                        name:
                          "Transfer in den eigenen Projektkontext (Nachnutzung)",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "checkPlanning",
                objectTitle:
                  "Check Planung und Finanzierung mit allen relevanten Fachämtern",
                name: "",
                text: "",
                desc:
                  "Wie kann die interne Zusammenarbeit effizient koordiniert werden?",
                sortPosition: 4,
                objectId: 4,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name: "Interne Fachabteilungen konkret einbeziehen",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Vorherige Abstimmungen mit einzelnen Fachleuten zusammenfügen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Mögliche Einwände/ Projektsinn prüfen ",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Besprechung der formalen Anforderungen an die Projektunterlagen",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Abstimmung der Aufgaben/ ToDos mit den Fachämtern",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Koordination der Aufgaben mit zentralem Ansprechpartner*innen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name:
                          "Beschlüsse zur Gestaltung des Projektes müssen getroffen werden",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name:
                          "Alternativen prüfen, ggf. ohne Förderung bei zu geringer Fördersumme",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cardName: "legitimation",
            cardTitle: "Legitimierung zur Einreichung",
            start: "",
            end: "",
            items: [
              {
                objectName: "template",
                objectTitle: "Vorlage/ Diskussion der Projektunterlagen",
                name: "",
                text: "",
                desc:
                  "Was muss erarbeitet werden, um einen breiten Konsens herbei zu führen?",
                sortPosition: 1,
                objectId: 1,
                active: false,
                fixed: true,
                file: null,
                tasks: [
                  {
                    name:
                      "Projektantrag zielführend in Gemeindevertretung einbringen",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Rechtzeitige Infos an Ausschüsse/ Gemeindevertretung/ Bürgermeister geben",
                        sortPosition: 1,
                        active: false,
                        objectId: 1,
                        info: ["Zusätzliche Gremien einbinden?"]
                      },
                      {
                        name:
                          "Schlüssiger Projektantrag -> transparent, nachvollziehbar, kurz, prägnant",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Vollständige Projektunterlagen (möglichst)",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name: "Projekt-Informationsblatt/ One-Pager",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name:
                          "Kostenschätzungen, Kosten- und Finanzierungsplan und Folgekosten",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name:
                          "Präsentation durch Funktionsträger/ Projektkoordinator",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name:
                          "Moderation der finalen Diskussion zum Projektantrag",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      },
                      {
                        name:
                          "Ggf. Umlaufbeschluss falls Entscheidungsgremium zu spät tagt",
                        sortPosition: 8,
                        active: false,
                        objectId: 8
                      }
                    ]
                  },
                  {
                    name: "Beschlussfassung vorbereiten und herbeiführen",
                    sortPosition: 2,
                    objectId: 2,
                    active: false,
                    info: [
                      "Wann und wie müssen Gemeindevertreter involviert werden? >> Mehrfach im Prozess"
                    ],
                    children: [
                      {
                        name:
                          "Beschlussvorlage auf Basis der Projektunterlagen anfertigen",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Abstimmung der Beschlussvorlage",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name: "Anhörung Experten",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name: "Protokollauszug den Projektunterlagen beifügen",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cardName: "finalExamination",
            cardTitle: "Prüfung der Projektunterlagen final",
            start: "",
            end: "",
            items: [
              {
                objectName: "revision",
                objectTitle: "Überarbeitung Projektunterlagen",
                name: "",
                text: "",
                desc:
                  "Was muss bei der finalen Überarbeitung aller Projektunterlagen beachtet werden?",
                sortPosition: 1,
                objectId: 1,
                active: false,
                fixed: false,
                file: null,
                tasks: [
                  {
                    name: "Überarbeitung der Projektunterlagen",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    info: [
                      "Ist das Geld beim Projektträger vorhanden? (Budget pro Aufruf)"
                    ],
                    children: [
                      {
                        name:
                          "Diese Aktivität muss frühzeitig koordiniert werden",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Zeit einplanen",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Einreichungsmodalitäten und technische Rahmenbedingungen (siehe EasyOnline)",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Inhaltliche Durchsicht aller Unterlagen (inklusive Anlagen, eigene Checkliste ob alles da ist)",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name: "Formale Durchsicht aller Unterlagen",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name: "Check Kostenplan mit Angeboten",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      },
                      {
                        name: "Bei gravierenden Änderungen neuer Beschluss",
                        sortPosition: 7,
                        active: false,
                        objectId: 7
                      },
                      {
                        name: "Finale Besprechung mit dem Projektträger",
                        sortPosition: 8,
                        active: false,
                        objectId: 8
                      }
                    ]
                  }
                ]
              },
              {
                objectName: "signatures",
                objectTitle: "Einholung von Unterschriften",
                name: "",
                text: "",
                desc:
                  "Was muss bei der Einholung von Unterschriften beachtet werden?",
                sortPosition: 2,
                objectId: 2,
                active: false,
                fixed: false,
                file: null,
                tasks: [
                  {
                    name: "Koordination der Unterschriftensammlung",
                    sortPosition: 1,
                    objectId: 1,
                    active: false,
                    children: [
                      {
                        name:
                          "Rechtzeitige Informationen zu weitere Ablauf an alle Unterzeichner (Wann? Nach Antragstellung?)",
                        sortPosition: 1,
                        active: false,
                        objectId: 1
                      },
                      {
                        name: "Richtlinie geändert? -> Anpassung",
                        sortPosition: 2,
                        active: false,
                        objectId: 2
                      },
                      {
                        name:
                          "Rechtzeitige Übermittelung der Vorlagen (Antrag, Kooperationsvereinbarungen etc.)",
                        sortPosition: 3,
                        active: false,
                        objectId: 3
                      },
                      {
                        name:
                          "Abstimmung der finalen Sammlung von Unterschriften (Zeit und Postweg einplanen)",
                        sortPosition: 4,
                        active: false,
                        objectId: 4
                      },
                      {
                        name: "Prüfung der Unterschriften",
                        sortPosition: 5,
                        active: false,
                        objectId: 5
                      },
                      {
                        name: "Digitalisierung Archiv/ Ablage",
                        sortPosition: 6,
                        active: false,
                        objectId: 6
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        info: {
          contactName: "",
          phone: "",
          email: "",
          streetNo: "",
          postalCode: ""
        },
        municipality: "",
        categories: [],
        tags: [],
        media: null
      },
      visibilityOptions: ["only for me", "all users", "listed only"],
      ideaProviderOptions: [
        { label: "Volunteering", value: "volunteering" },
        { label: "Main Office", value: "mainOffice" }
      ],
      isLoading: false
    };
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
      return (
        !!this.$store.state.userCenter.user &&
        this.$store.state.userCenter.user.user
      );
    },
    // checklist() {
    //   return this.$store.state.implementationChecklist.checklist;
    // },
    checklist() {
      return (
        !!this.$route.params.id &&
        JSON.parse(
          JSON.stringify(this.$store.state.implementationChecklist.checklist)
        )
      );
    }
  },
  methods: {
    disableDate(index) {
      if (index !== null || index !== undefined) {
        const disabledItems = this.form.items[index].items.map(item => {
          return item.active === true;
        });
        return !disabledItems.includes(true);
      }
    },
    dateFormatter,
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
    imgPreview(val) {
      return {
        url: !!val.id ? `${this.appUrl}${val.url}` : URL.createObjectURL(val),
        name: val.name
      };
    },
    removeFile(card, element, index) {
      if (!!card && !!element) {
        this.form.items
          .find(item => item.cardName === card.cardName)
          .items.find(item => item.objectName === element.objectName)
          .file.splice(index, 1);
      }
    },
    removeImg(index) {
      this.form.media.splice(index, 1);
    },
    scrollToInvalidElement(ref) {
      const el = ref.$el;
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    onChange({ moved }, items) {
      items.map((item, index) => {
        item.sortPosition = index + 1;
      });
    },
    // async validateDates() {
    //   const form = this.form.items.map((item, index) => {
    //     console.log("item", item, index);
    //     item.items.map((nestedItem, indexTwo) => {
    //       console.log("nestedItem", nestedItem, indexTwo);
    //       if (
    //         (item.start === "" || item.end === "") &&
    //         nestedItem.active === true
    //       ) {
    //         this.$refs.startDate[index].validate();
    //         this.$refs.startDate[index].validate();
    //       } else {
    //         console.log("No need to validate");
    //       }
    //     });
    //   });
    // },
    async submitNewChecklist(val) {
      const published = val;
      this.$refs.newChecklistForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          const res = await this.$store.dispatch(
            "implementationChecklist/createNewChecklist",
            {
              data: {
                ...this.form,
                published: published,
                info: {
                  ...this.form.info,
                  contactName: this.userDetails.fullName,
                  phone: this.userDetails.phone,
                  email: this.user.email,
                  streetNo: this.userDetails.streetNo,
                  postalCode: this.userDetails.postalCode
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
          const elements = this.$refs.newChecklistForm.getValidationComponents();
          elements.map(el => {
            if (el.validate) {
              el.validate();
            }
          });
        }
      });
    },
    editChecklist(val) {
      const published = val;
      this.$refs.newChecklistForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          const res = await this.$store.dispatch(
            "implementationChecklist/editChecklist",
            {
              data: {
                ...this.form,
                published: published
              }
            }
          );
          this.isLoading = false;
        } else {
          const elements = this.$refs.newChecklistForm.getValidationComponents();
          elements.map(el => {
            if (el.validate) {
              el.validate();
            }
          });
        }
      });
    },
    async setData() {
      console.log("this.form", this.form);
      const specificChecklist = JSON.parse(JSON.stringify(this.checklist));
      console.log("specificChecklist :>> ", specificChecklist);
      this.form = {
        ...this.form,
        ...specificChecklist
      };
      await this.setItems(specificChecklist);
    },
    async setItems(checklist) {
      this.form.items = [
        {
          ...this.setInitialContact(checklist)
        },
        {
          ...this.setPreparation(checklist)
        },
        {
          ...this.setFundingResearch(checklist)
        },
        {
          ...this.setPreparationOfProject(checklist)
        },
        {
          ...this.setLegitimation(checklist)
        },
        {
          ...this.setFinalExamination(checklist)
        }
      ];
    },
    setInitialContact(checklist) {
      return {
        ...this.form.items.find(item => item.cardName === "initialContact"),
        start: checklist.initialContact.start,
        end: checklist.initialContact.end,
        id: checklist.initialContact.id,
        items: [
          {
            ...this.form.items
              .find(item => item.cardName === "initialContact")
              .items.find(item => item.objectName === "captureIdea"),
            name: checklist.initialContact.captureIdea.name,
            text: checklist.initialContact.captureIdea.text,
            sortPosition: checklist.initialContact.captureIdea.sortPosition,
            active: checklist.initialContact.captureIdea.active,
            tasks: checklist.initialContact.captureIdea.tasks,
            file: checklist.initialContact.captureIdea.file,
            id: checklist.initialContact.captureIdea.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "initialContact")
              .items.find(item => item.objectName === "caputreContect"),
            name: checklist.initialContact.caputreContect.name,
            text: checklist.initialContact.caputreContect.text,
            sortPosition: checklist.initialContact.caputreContect.sortPosition,
            active: checklist.initialContact.caputreContect.active,
            tasks: checklist.initialContact.caputreContect.tasks,
            file: checklist.initialContact.caputreContect.file,
            id: checklist.initialContact.caputreContect.id
          }
        ]
      };
    },
    setPreparation(checklist) {
      return {
        ...this.form.items.find(item => item.cardName === "preparation"),
        start: checklist.preparation.start,
        end: checklist.preparation.end,
        id: checklist.preparation.id,
        items: [
          {
            ...this.form.items
              .find(item => item.cardName === "preparation")
              .items.find(item => item.objectName === "inspection"),
            name: checklist.preparation.inspection.name,
            text: checklist.preparation.inspection.text,
            sortPosition: 1,
            active: checklist.preparation.inspection.active,
            tasks: checklist.preparation.inspection.tasks,
            file: checklist.preparation.inspection.file,
            id: checklist.preparation.inspection.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "preparation")
              .items.find(item => item.objectName === "captureRequirements"),
            name: checklist.preparation.captureRequirements.name,
            text: checklist.preparation.captureRequirements.text,
            sortPosition: 2,
            active: checklist.preparation.captureRequirements.active,
            tasks: checklist.preparation.captureRequirements.tasks,
            file: checklist.preparation.captureRequirements.file,
            id: checklist.preparation.captureRequirements.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "preparation")
              .items.find(item => item.objectName === "captureNeeds"),
            name: checklist.preparation.captureNeeds.name,
            text: checklist.preparation.captureNeeds.text,
            sortPosition: 3,
            active: checklist.preparation.captureNeeds.active,
            tasks: checklist.preparation.captureNeeds.tasks,
            file: checklist.preparation.captureNeeds.file,
            id: checklist.preparation.captureNeeds.id
          }
        ]
      };
    },
    setFundingResearch(checklist) {
      return {
        ...this.form.items.find(item => item.cardName === "fundingResearch"),
        start: checklist.fundingResearch.start,
        end: checklist.fundingResearch.end,
        id: checklist.fundingResearch.id,
        items: [
          {
            ...this.form.items
              .find(item => item.cardName === "fundingResearch")
              .items.find(item => item.objectName === "checkDatabase"),
            name: checklist.fundingResearch.checkDatabase.name,
            text: checklist.fundingResearch.checkDatabase.text,
            sortPosition: 1,
            active: checklist.fundingResearch.checkDatabase.active,
            tasks: checklist.fundingResearch.checkDatabase.tasks,
            file: checklist.fundingResearch.checkDatabase.file,
            id: checklist.fundingResearch.checkDatabase.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "fundingResearch")
              .items.find(item => item.objectName === "checkForFunding"),
            name: checklist.fundingResearch.checkForFunding.name,
            text: checklist.fundingResearch.checkForFunding.text,
            sortPosition: 2,
            active: checklist.fundingResearch.checkForFunding.active,
            tasks: checklist.fundingResearch.checkForFunding.tasks,
            file: checklist.fundingResearch.checkForFunding.file,
            id: checklist.fundingResearch.checkForFunding.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "fundingResearch")
              .items.find(item => item.objectName === "checkWithFunding"),
            name: checklist.fundingResearch.checkWithFunding.name,
            text: checklist.fundingResearch.checkWithFunding.text,
            sortPosition:
              checklist.fundingResearch.checkWithFunding.sortPosition,
            active: checklist.fundingResearch.checkWithFunding.active,
            tasks: checklist.fundingResearch.checkWithFunding.tasks,
            file: checklist.fundingResearch.checkWithFunding.file,
            id: checklist.fundingResearch.checkWithFunding.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "fundingResearch")
              .items.find(item => item.objectName === "checkGuildlines"),
            name: checklist.fundingResearch.checkGuildlines.name,
            text: checklist.fundingResearch.checkGuildlines.text,
            sortPosition:
              checklist.fundingResearch.checkGuildlines.sortPosition,
            active: checklist.fundingResearch.checkGuildlines.active,
            tasks: checklist.fundingResearch.checkGuildlines.tasks,
            file: checklist.fundingResearch.checkGuildlines.file,
            id: checklist.fundingResearch.checkGuildlines.id
          }
        ]
      };
    },
    setPreparationOfProject(checklist) {
      return {
        ...this.form.items.find(
          item => item.cardName === "preparationOfProject"
        ),
        start: checklist.preparationOfProject.start,
        end: checklist.preparationOfProject.end,
        id: checklist.preparationOfProject.id,
        items: [
          {
            ...this.form.items
              .find(item => item.cardName === "preparationOfProject")
              .items.find(item => item.objectName === "checkContent"),
            name: checklist.preparationOfProject.checkContent.name,
            text: checklist.preparationOfProject.checkContent.text,
            sortPosition:
              checklist.preparationOfProject.checkContent.sortPosition,
            active: checklist.preparationOfProject.checkContent.active,
            tasks: checklist.preparationOfProject.checkContent.tasks,
            file: checklist.preparationOfProject.checkContent.file,
            id: checklist.preparationOfProject.checkContent.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "preparationOfProject")
              .items.find(item => item.objectName === "checkCooperations"),
            name: checklist.preparationOfProject.checkCooperations.name,
            text: checklist.preparationOfProject.checkCooperations.text,
            sortPosition:
              checklist.preparationOfProject.checkCooperations.sortPosition,
            active: checklist.preparationOfProject.checkCooperations.active,
            tasks: checklist.preparationOfProject.checkCooperations.tasks,
            file: checklist.preparationOfProject.checkCooperations.file,
            id: checklist.preparationOfProject.checkCooperations.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "preparationOfProject")
              .items.find(item => item.objectName === "checkSimilarProejcts"),
            name: checklist.preparationOfProject.checkSimilarProejcts.name,
            text: checklist.preparationOfProject.checkSimilarProejcts.text,
            sortPosition:
              checklist.preparationOfProject.checkSimilarProejcts.sortPosition,
            active: checklist.preparationOfProject.checkSimilarProejcts.active,
            tasks: checklist.preparationOfProject.checkSimilarProejcts.tasks,
            file: checklist.preparationOfProject.checkSimilarProejcts.file,
            id: checklist.preparationOfProject.checkSimilarProejcts.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "preparationOfProject")
              .items.find(item => item.objectName === "checkPlanning"),
            name: checklist.preparationOfProject.checkPlanning.name,
            text: checklist.preparationOfProject.checkPlanning.text,
            sortPosition: 4,
            active: checklist.preparationOfProject.checkPlanning.active,
            tasks: checklist.preparationOfProject.checkPlanning.tasks,
            file: checklist.preparationOfProject.checkPlanning.file,
            id: checklist.preparationOfProject.checkPlanning.id
          }
        ]
      };
    },
    setLegitimation(checklist) {
      return {
        ...this.form.items.find(item => item.cardName === "legitimation"),
        start: checklist.legitimation.start,
        end: checklist.legitimation.end,
        id: checklist.legitimation.id,
        items: [
          {
            ...this.form.items
              .find(item => item.cardName === "legitimation")
              .items.find(item => item.objectName === "template"),
            name: checklist.legitimation.template.name,
            text: checklist.legitimation.template.text,
            sortPosition: 1,
            active: checklist.legitimation.template.active,
            tasks: checklist.legitimation.template.tasks,
            file: checklist.legitimation.template.file,
            id: checklist.legitimation.template.id
          }
        ]
      };
    },
    setFinalExamination(checklist) {
      return {
        ...this.form.items.find(item => item.cardName === "finalExamination"),
        start: checklist.finalExamination.start,
        end: checklist.finalExamination.end,
        id: checklist.finalExamination.id,
        items: [
          {
            ...this.form.items
              .find(item => item.cardName === "finalExamination")
              .items.find(item => item.objectName === "revision"),
            name: checklist.finalExamination.revision.name,
            text: checklist.finalExamination.revision.text,
            sortPosition: checklist.finalExamination.revision.sortPosition,
            active: checklist.finalExamination.revision.active,
            tasks: checklist.finalExamination.revision.tasks,
            file: checklist.finalExamination.revision.file,
            id: checklist.finalExamination.revision.id
          },
          {
            ...this.form.items
              .find(item => item.cardName === "finalExamination")
              .items.find(item => item.objectName === "signatures"),
            name: checklist.finalExamination.signatures.name,
            text: checklist.finalExamination.signatures.text,
            sortPosition: checklist.finalExamination.signatures.sortPosition,
            active: checklist.finalExamination.signatures.active,
            tasks: checklist.finalExamination.signatures.tasks,
            file: checklist.finalExamination.signatures.file,
            id: checklist.finalExamination.signatures.id
          }
        ]
      };
    }
  },
  mounted() {
    if (!!this.checklist && !!this.$route.params.id) {
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
.flip-list-move {
  transition: transform 0.5s;
}
.customToggle .q-toggle__track {
  height: 0.4em;
  border-radius: 0.2em;
}
.customToggle .q-toggle__inner--truthy .q-toggle__track {
  background: $primary;
  opacity: 1;
}
.customToggle .q-toggle__thumb {
  color: white;
  transform: scale(0.64);
  top: 0.27em;
}
.movingClass {
  background: $blue-1;
}
.listClass {
  list-style: none;
  li {
    font-size: 14px;
    margin-block: 0.5em;
  }
  li::before {
    content: "\2022";
    color: $primary;
    font-weight: bold;
    display: inline-block;
    width: 2em;
    margin-left: -1em;
    margin-right: -1em;
  }
}
.disabledClass {
  .q-field__inner .q-field__control input {
    color: black;
    opacity: 1 !important;
  }
  .q-field__inner .q-field__control:before {
    border-color: $primary;
  }
}
</style>
