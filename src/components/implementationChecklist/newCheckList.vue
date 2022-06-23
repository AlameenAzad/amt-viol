<template>
  <q-page class="q-mt-lg" :class="$q.screen.gt.sm ? 'q-mx-xl' : 'q-mx-sm'">
    <p class="text-center font-36 text-weight-regular q-my-lg">
      Umsetzungscheckliste
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
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Ideengeber*in
            </p>
          </div>
          <div class="col-8">
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
          <div class="col-4">
            <p class="font-16 no-margin">
              Ansprechpartner*in*
            </p>
          </div>
          <div class="col-8">
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Name, Nachname"
                  :value="!!userDetails && userDetails.fullName"
                  :rules="[]"
                  disable
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  dense
                  disable
                  class="no-shadow input-radius-6"
                  placeholder="Gemeinde/Verwaltung"
                  :value="!!userDetails && userDetails.municipality.title"
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
                  :value="!!userDetails && userDetails.phone"
                  :rules="[]"
                  disable
                />
              </div>
              <div class="col-6">
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
            </div>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">
              Link for Project Idea
            </p>
          </div>
          <div class="col-8">
            <ProjectIdeas
              :editing="isEdit.projects"
              @update:linkToProject="form.project = $event"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <p class="font-16 no-margin">
              Invite Editor
            </p>
          </div>
          <div class="col-8">
            <UserSelect
              :editing="isEdit.editors"
              @update:user="form.editors = $event"
            />
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
          <div class="col-4">
            <p class="font-16 no-margin">Filter Categories</p>
          </div>
          <div class="col-8">
            <Categories
              :editing="isEdit.categories"
              @update:category="form.categories = $event"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            <p class="font-16 no-margin">Tags*</p>
          </div>
          <div class="col-8">
            <Tags :editing="isEdit.tags" @update:tag="form.tags = $event" />
          </div>
        </div>
        <q-card style="background:#16428B1A" class="q-pa-none shadow-0">
          <q-card-section class="q-pa-md font-16 text-weight-600"
            >project activity</q-card-section
          >
        </q-card>
        <div class="row items-start">
          <div class="col-4">
            <p class="font-16 no-margin text-weight-600">
              Initial contact with the politics
            </p>
            <div class="flex items-center row q-mt-md  ">
              <div class="col-2">
                <p class="font-14 no-margin">Start</p>
              </div>
              <div>
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  :value="dateFormatter(form.initialContact.start)"
                  readonly
                  color="primary"
                  bg-color="white"
                  :placeholder="$t('projectIdeaPlaceholder.plannedStartDate')"
                  @click="$refs.qPlannedStartDateProxy.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qPlannedStartDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.initialContact.start"
                          mask="YYYY-MM-DD"
                          @input="$refs.qPlannedStartDateProxy.hide()"
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
                  class="no-shadow input-radius-6"
                  :value="dateFormatter(form.initialContact.end)"
                  color="primary"
                  readonly
                  bg-color="white"
                  :placeholder="$t('projectIdeaPlaceholder.plannedEndDate')"
                  @click="$refs.qPlannedEndDateProxy.show()"
                >
                  <template v-slot:append>
                    <q-icon name="event" color="blue-5" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qPlannedEndDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.initialContact.end"
                          mask="YYYY-MM-DD"
                          @input="$refs.qPlannedEndDateProxy.hide()"
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
          <div class="col-8">
            <draggable
              handle=".handle"
              class="col-8"
              v-model="form.initialContact.items"
              ghost-class="movingClass"
              @change="onChange($event, form.initialContact.items)"
              :force-fallback="true"
            >
              <transition-group type="transition" tag="div" name="flip-list">
                <q-card
                  v-for="element in form.initialContact.items"
                  :key="element.id"
                  class="q-pa-none shadow-0"
                >
                  <div style="background:#16428B1A">
                    <q-card-section class="row items-center justify-between">
                      <div class="row items-center">
                        <q-icon
                          size="sm"
                          color="blue-5"
                          class="handle q-mr-md q-py-sm bg-white radius-6 cursor-pointer"
                          name="reorder"
                        />
                        <p class="no-margin font-18 text-blue text-weight-600">
                          {{ element.objectTitle }}
                        </p>
                      </div>
                      <q-toggle
                        size="lg"
                        color="primary"
                        class="customToggle"
                        v-model="element.active"
                      />
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
                            :editing="isEdit.projects"
                            @update:linkToProject="element.project = $event"
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            outlined
                            bg-color="white"
                            dense
                            class="no-shadow input-radius-6"
                            placeholder="text"
                            v-model="element.text"
                          />
                        </div>
                        <div class="col-4">
                          <q-file
                            outlined
                            bg-color="transparent"
                            v-model="form.files"
                            class="uploadInput input-radius-6"
                            label-color="primary"
                            :label="
                              !!form.files && form.files.length > 0
                                ? 'Add Files'
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
                      </div>
                      <div class="row">
                        <div
                          class="q-mt-sm"
                          v-if="form.files && form.files.length > 0"
                        >
                          <q-item
                            v-for="(file, index) in form.files"
                            :key="index"
                            clickable
                          >
                            <q-item-section side>
                              <q-avatar rounded size="48px">
                                <small>{{
                                  imgPreview(file).name.split(".")[1]
                                }}</small>
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
                    </q-card-section>
                  </div>
                  <draggable
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
                        :key="item.id"
                        class="shadow-0 q-mt-xs"
                      >
                        <q-card-section
                          style="background:#FDD50033"
                          class="flex items-center justify-between q-pa-sm"
                        >
                          <div class="row items-center ">
                            <q-icon
                              size="sm"
                              color="blue-5"
                              class="handle q-mr-md q-py-sm bg-white radius-6 cursor-pointer"
                              name="reorder"
                            />
                            <p class="no-margin font-16 text-weight-600">
                              {{ item.name }}
                            </p>
                          </div>
                          <q-toggle
                            size="lg"
                            color="primary"
                            class="customToggle"
                            v-model="item.active"
                          />
                        </q-card-section>
                        <draggable
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
                              :key="child.id"
                              class="shadow-0"
                            >
                              <q-card-section
                                class="flex items-center justify-between q-pa-sm"
                              >
                                <div class="row items-center ">
                                  <q-icon
                                    size="sm"
                                    color="blue-5"
                                    class="handle q-mr-md q-py-sm bg-white radius-6 cursor-pointer"
                                    name="reorder"
                                  />
                                  <p class="no-margin font-14">
                                    {{ child.name }}
                                  </p>
                                </div>
                                <q-toggle
                                  size="lg"
                                  color="primary"
                                  class="customToggle"
                                  v-model="child.active"
                                />
                              </q-card-section>
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
      </q-form>
    </div>
  </q-page>
</template>

<script>
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
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      projectIdea: true,
      form: {
        title: "",
        ideaProvider: "",
        project: "",
        visibility: "only for me",
        editors: [],
        initialContact: {
          start: "",
          end: "",
          items: [
            // captureIdea
            {
              objectName: "captureIdea",
              objectTitle: "capture Project Idea",
              name: "",
              text: "",
              sortPosition: 1,
              active: false,
              project: null,
              id: 1,
              tasks: [
                {
                  name: "Parent 1",
                  sortPosition: 1,
                  id: 1,
                  active: true,
                  children: [
                    {
                      name: "Child 1",
                      sortPosition: 1,
                      active: true,
                      id: 1
                    },
                    {
                      name: "Child 2",
                      sortPosition: 2,
                      active: false,
                      id: 2
                    },
                    {
                      name: "Child 3",
                      sortPosition: 3,
                      active: true,
                      id: 3
                    },
                    {
                      name: "Child 4",
                      sortPosition: 4,
                      active: true,
                      id: 4
                    },
                    {
                      name: "Child 5",
                      sortPosition: 5,
                      active: false,
                      id: 5
                    },
                    {
                      name: "Child 6",
                      sortPosition: 6,
                      active: false,
                      id: 6
                    },
                    {
                      name: "Child 7",
                      sortPosition: 7,
                      active: true,
                      id: 7
                    }
                  ]
                },
                {
                  name: "Parent 2",
                  sortPosition: 2,
                  id: 2,
                  active: true,
                  children: [
                    {
                      name: "Child 1",
                      sortPosition: 1,
                      active: true,
                      id: 1
                    },
                    {
                      name: "Child 2",
                      sortPosition: 2,
                      active: false,
                      id: 2
                    },
                    {
                      name: "Child 3",
                      sortPosition: 3,
                      active: true,
                      id: 3
                    },
                    {
                      name: "Child 4",
                      sortPosition: 4,
                      active: true,
                      id: 4
                    }
                  ]
                }
              ]
            },
            // caputreContect
            {
              objectName: "caputreContect",
              objectTitle: "Caputre contect",
              name: "",
              text: "",
              active: true,
              tasks: null,
              sortPosition: 2,
              id: 2
            }
          ]
        },
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
        categories: [],
        tags: [],
        estimatedCosts: [],
        links: [],
        media: null,
        files: null
      },
      visibilityOptions: ["only for me", "all users", "listed only"],
      ideaProviderOptions: [
        { label: "Volunteering", value: "volunteering" },
        { label: "Main Office", value: "main office" }
      ],

      isLoading: false,
      oldIndex: "",
      newIndex: "",
      bilend: [
        {
          title: "Capture project idea",
          active: true,
          name: "",
          project: null,
          text: "",
          order: 1
        },
        {
          title: "Caputre contect",
          active: false,
          name: "",
          text: "",
          order: 2,
          children: [
            {
              name: "Parent 1",
              order: 1,
              active: true,
              children: [
                {
                  name: "Child 1",
                  order: 1,
                  active: true
                },
                {
                  name: "Child 2",
                  order: 2,
                  active: false
                },
                {
                  name: "Child 3",
                  order: 3,
                  active: true
                }
              ]
            },
            {
              name: "Parent 2",
              order: 2,
              active: true,
              children: [
                {
                  name: "Child 1",
                  order: 1,
                  active: true
                },
                {
                  name: "Child 2",
                  order: 2,
                  active: false
                }
              ]
            }
          ]
        }
      ]
      // bilend: [
      //   {
      //     name: "Projektidee-Quellen nutzen",
      //     order: 1,
      //     active: true,
      //     children: [
      //       {
      //         name:
      //           "Projektidee aus bestehenden kommunalen Entwicklungskonzept entnommen",
      //         order: 1,
      //         active: true
      //       },
      //       {
      //         name: "Projektidee aus Antragder Politik entnommen",
      //         order: 2,
      //         active: false
      //       },
      //       {
      //         name: "Projektidee aus lokalem Arbeitskreis entnommen",
      //         order: 3,
      //         active: true
      //       },
      //       {
      //         name:
      //           "Projektidee im Erstgespräch (Einzelgemeindeoder Zusammenschluss) entwickelt",
      //         order: 4,
      //         active: true
      //       },
      //       {
      //         name:
      //           "Projektidee aus Vernetzungsgespräch mit anderen Kommunen oder Institutionen (z.B. Hochschulen, Privatwirtschaft, Vereine) entnommen",
      //         order: 5,
      //         active: false
      //       },
      //       {
      //         name:
      //           "Projektidee durch externe Dienstleister*in/Produktanbieter*in in Beratungsgespräch eingebracht",
      //         order: 6,
      //         active: false
      //       },
      //       {
      //         name:
      //           "Veröffentlichungvon Förderprogrammen als Basisfür Projektidee",
      //         order: 7,
      //         active: true
      //       }
      //     ]
      //   },
      //   {
      //     name: "Allgemeine Rahmenbedingungen ermitteln",
      //     order: 2,
      //     active: true,
      //     children: [
      //       {
      //         name: "ZielundNutzenderProjektideedefinieren",
      //         order: 1,
      //         active: true
      //       },
      //       {
      //         name:
      //           "BedarfederBürger*innenermitteln(z.B.überAbfrageüberderHomepage)",
      //         order: 2,
      //         active: false
      //       },
      //       {
      //         name: "Projektinitiator*innenfestlegen",
      //         order: 3,
      //         active: true
      //       },
      //       {
      //         name:
      //           "Finanzielle Rahmenbedingungenim Bauamt und der Kämmereiprüfen (u.a. Kostenschätzung und Liquidität der Kommune)",
      //         order: 4,
      //         active: true
      //       }
      //     ]
      //   }
      // ]
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
  methods: {
    dateFormatter,
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    toggleActive(item) {
      console.log("item", item);
    },
    horse(event) {
      console.log("event", event);
    },
    changeSomething(value) {
      console.log(value);
    },
    onEnd: function(event) {
      console.log("ON END", event);
      // TODO Not sure if the below are needed
      // this.oldIndex = event.oldIndex;
      // this.newIndex = event.newIndex;
    },
    onSort(event) {
      console.log("on SORT", event);
    },
    onChange({ moved }, items) {
      items.map((item, index) => {
        item.sortPosition = index + 1;
      });
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
</style>
