<template>
  <q-page class="q-mx-xl q-mt-lg">
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
              v-model="form.details.investive"
              spread
              no-caps
              toggle-color="yellow"
              padding="12px 10px"
              color="transparent"
              toggle-text-color="black"
              text-color="black"
              class="no-shadow toggleGap"
              :options="IdeengeberOptions"
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
              Link to project
            </p>
          </div>
          <div class="col-8">
            <ProjectIdeas
              :editing="isEdit.projects"
              @update:linkToProject="form.projects = $event"
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
            <p class="font-16 no-margin">Sichtbarkeit</p>
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
                  filled
                  dense
                  v-model="startDate"
                  class="no-shadow  input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="01.08.2021"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="startDate" mask="DD.MM.YYYY">
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
                  filled
                  dense
                  v-model="endDate"
                  class="no-shadow  input-radius-4"
                  color="primary"
                  bg-color="white"
                  placeholder="01.08.2021"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="endDate" mask="DD.MM.YYYY">
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
              v-model="bilend"
              ghost-class="ghost"
              @end="onEnd"
              @sort="onSort"
              :force-fallback="true"
            >
              <transition-group type="transition" tag="div" name="flip-list">
                <q-card
                  class="q-pa-none shadow-0"
                  v-for="element in bilend"
                  :id="element.order"
                  :key="element.order"
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
                          {{ element.title }}
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
                          />
                        </div>
                        <div class="col-12">
                          <ProjectIdeas
                            :isInChecklist="true"
                            :editing="isEdit.projects"
                            @update:linkToProject="form.projects = $event"
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            outlined
                            bg-color="white"
                            dense
                            class="no-shadow input-radius-6"
                            placeholder="text"
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
                    v-model="element.children"
                    ghost-class="ghost"
                    @end="onEnd"
                    @sort="onSort"
                    :force-fallback="true"
                  >
                    <transition-group
                      type="transition"
                      tag="div"
                      name="flip-list"
                    >
                      <q-card
                        v-for="item in element.children"
                        :id="item.order"
                        :key="item.order"
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
                          @end="onEnd"
                          @change="horse"
                          @update="onUpdate"
                          :force-fallback="true"
                        >
                          <transition-group
                            type="transition"
                            tag="div"
                            name="flip-list"
                          >
                            <q-card
                              v-for="child in item.children"
                              :key="child.order"
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
      startDate: "",
      endDate: "",
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
        projectIdea: {
          name: "",
          role: "",

          text: ""
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
      IdeengeberOptions: [
        { label: "Ehrenamt", value: true },
        { label: "Hauptamt", value: false }
      ],
      projectStatuses: [
        { label: "Idea", value: "Idea" },
        { label: "Development", value: "Development" },
        { label: "Pre-Planning", value: "Pre-Planning" },
        { label: "Detailed-Planning", value: "Detailed-Planning" }
      ],
      isLoading: false,
      myArray: [
        { name: "Capture project idea", order: 1 },
        { name: "Capture project ideaaa", order: 2 }
      ],
      oldIndex: "",
      newIndex: "",
      bilend: [
        {
          title: "Capture project idea",
          active: true,
          name: "",
          project: null,
          text: "",
          order: 1,
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
                },
                {
                  name: "Child 4",
                  order: 4,
                  active: true
                },
                {
                  name: "Child 5",
                  order: 5,
                  active: false
                },
                {
                  name: "Child 6",
                  order: 6,
                  active: false
                },
                {
                  name: "Child 7",
                  order: 7,
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
                },
                {
                  name: "Child 3",
                  order: 3,
                  active: true
                },
                {
                  name: "Child 4",
                  order: 4,
                  active: true
                }
              ]
            }
          ]
        },
        {
          title: "Caputre contect",
          active: false,
          name: "",
          text: "",
          order: 2
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
  methods: {
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
      console.log("yes", event);
    },
    onUpdate(event) {
      console.log("On Update Event", event);
      // const newIndex = event.newIndex;
      // const oldIndex = event.oldIndex;
      // this.list.splice(newIndex, 0, this.list.splice(oldIndex, 1)[0]);
      // // update order property based on position in array
      // this.list.forEach(function(item, index){
      //   item.order = index;
      // });
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
