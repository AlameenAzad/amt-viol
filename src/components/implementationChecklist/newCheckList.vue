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
            <Projects
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
        <q-card style="background:#16428B1A" class="q-pa-md">
          <q-card-title>project activity</q-card-title>
        </q-card>
        <div class="row items-start position-fixed">
          <div class="col-4 ">
            <p class="font-16 no-margin">Initial contact with the politics</p>
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
            <q-card class="q-pa-md" style="background:#16428B1A">
              <q-card-title class="flex items-center justify-between">
                <div class="row items-center ">
                  <q-icon size="sm" class="text-blue q-mr-md" name="list" />
                  <p class="no-margin ">Capture project idea</p>
                </div>
                <q-toggle
                  @input="changeSomething($event)"
                  size="lg"
                  color="primary"
                  class="customToggle"
                  v-model="projectIdea"
                />
              </q-card-title>
              <q-card-section class="q-gutter-md  ">
                <div class="row">
                  <div class="col-12">
                    <q-input
                      outlined
                      dense
                      class="no-shadow input-radius-6"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <q-select
                      outlined
                      dense
                      :options="options"
                      class="no-shadow input-radius-6"
                      v-model="form.projectIdea.role"
                      :rules="[]"
                      placeholder="Select Project"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <q-input
                      outlined
                      dense
                      class="no-shadow input-radius-6"
                      placeholder="text"
                    />
                  </div>
                </div>
                <div class="row">
                  <q-file
                    flat
                    v-model="form.files"
                    class="uploadInput input-radius-6 text-white"
                    label-color="primary"
                    outline
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
                      <q-icon color="primary" class="on-right" name="upload" />
                    </template>
                  </q-file>
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
            </q-card>
            <q-card class="q-mt-sm p">
              <q-card-section style="background:#FDD50033">
                <q-card-title class="flex items-center justify-between">
                  <div class="row items-center ">
                    <q-icon size="sm" class="text-blue q-mr-md" name="list" />
                    <p class="no-margin ">Projektidee-Quellen nutzen</p>
                  </div>
                  <q-toggle
                    @input="changeSomething($event)"
                    size="lg"
                    color="primary"
                    class="customToggle"
                    v-model="projectIdea"
                  />
                </q-card-title>
              </q-card-section>
              <q-card-section
                v-for="element in projectQuellen"
                :id="element.id"
                :key="element.id"
              >
                <div class="row items-center justify-between">
                  <q-card-title class="  justify-between q-ml-sm">
                    <div class="row items-center   ">
                      <q-icon size="sm" class="text-blue q-mr-md" name="list" />
                      <p class=" flex-1 no-margin font-12 ">{{ element.name }}</p>
                    </div>
                  </q-card-title>
                  <q-toggle
                    @input="changeSomething($event)"
                    size="lg"
                    color="primary"
                    class="customToggle flex-end"
                    v-model="projectIdea"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <!-- <draggble
            class="col-8"
            v-model="myArray"
            ghost-class="ghost"
            @end="onEnd"
          >
            <transition-group type="transition" name="flip-list">
              <q-card
                :id="element.id"
                v-for="element in myArray"
                :key="element.id"
                class="q-pa-md sortable"
                style="background:#16428B1A"
              >
                <q-card-title class="flex items-center justify-between">
                  <div class="row items-center ">
                    <q-icon size="sm" class="text-blue q-mr-md" name="list" />
                    <p class="no-margin ">{{ element.name }}</p>
                  </div>
                  <q-toggle
                    @input="changeSomething($event)"
                    size="lg"
                    color="primary"
                    class="customToggle"
                    v-model="projectIdea"
                  />
                </q-card-title>
                <q-card-section class="q-gutter-md  ">
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        outlined
                        dense
                        class="no-shadow input-radius-6"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-select
                        outlined
                        dense
                        :options="options"
                        class="no-shadow input-radius-6"
                        v-model="form.projectIdea.role"
                        :rules="[]"
                        placeholder="Select Project"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <q-input
                        outlined
                        dense
                        class="no-shadow input-radius-6"
                        placeholder="text"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <q-file
                      flat
                      v-model="form.files"
                      class="uploadInput input-radius-6 text-white"
                      label-color="primary"
                      outline
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
              </q-card>
            </transition-group>
          </draggble> -->
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import Projects from "components/implementationChecklist/Projects.vue";
import UserSelect from "components/user/UserSelect.vue";
import Categories from "components/projects/create/Categories.vue";
import Tags from "components/projects/create/Tags.vue";
import draggble from "vuedraggable";

export default {
  name: "newCheckList",
  components: {
    // draggble,
    Projects,
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
        { name: "Capture project idea", id: 0 },
        { name: "Capture project ideaaa", id: 0 }
      ],
      oldIndex: "",
      newIndex: "",
      projectQuellen: [
        {
          name:
            "Projektidee aus bestehenden kommunalen Entwicklungskonzept entnommen"
        },
        {
          name: "Projektidee aus Antragder Politik entnommen"
        },
        {
          name: "Projektidee aus lokalem Arbeitskreis entnommen"
        },
        {
          name:
            "Projektidee im Erstgespräch (Einzelgemeindeoder Zusammenschluss) entwickelt"
        },
        {
          name:
            "Projektidee aus Vernetzungsgespräch mit anderen Kommunen oder Institutionen (z.B. Hochschulen, Privatwirtschaft, Vereine) entnommen"
        },
        {
          name:
            "Projektidee durch externe Dienstleister*in/Produktanbieter*in in Beratungsgespräch eingebracht"
        },
        {
          name: "Veröffentlichungvon Förderprogrammen als Basisfür Projektidee"
        }
      ]
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
    changeSomething(value) {
      console.log(value);
    },
    onEnd: function(event) {
      console.log(event);
      this.oldIndex = event.oldIndex;
      this.newIndex = event.newIndex;
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
