<template>
  <div>
    <p class="text-center font-36 text-weight-regular q-my-lg ppeditorial">
      Create a new discussion
    </p>
    <div class="q-mb-lg q-mx-xl">
      <q-card class="shadow-1 radius-20 q-mb-md q-pa-none">
        <q-card-section>
          <q-form ref="newDiscussionForm" class="q-gutter-lg q-px-md q-mb-md">
            <div class="row items-baseline">
              <div class="col-12 col-md-4">
                <p class="font-16 no-margin">Title</p>
              </div>
              <div class="col-12 col-md-8">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Title"
                  v-model="form.title"
                  :rules="[(val) => !!val || $t('Required')]"
                />
              </div>
            </div>
            <div class="row items-baseline">
              <div class="col-12 col-md-4">
                <p class="font-16 no-margin">Subject</p>
              </div>
              <div class="col-12 col-md-8">
                <q-input
                  outlined
                  dense
                  class="no-shadow input-radius-6"
                  placeholder="Subject"
                  v-model="form.subject"
                  :rules="[(val) => !!val || $t('Required')]"
                />
              </div>
            </div>
            <div class="row items-baseline">
              <div class="col-12 col-md-4">
                <p class="font-16 no-margin">Description</p>
              </div>
              <div class="col-12 col-md-8">
                <div>
                  <q-editor
                    v-model="form.description"
                    min-height="10rem"
                    :toolbar="[
                      [
                        {
                          icon: $q.iconSet.editor.align,
                          list: 'only-icons',
                          options: ['left', 'center', 'right', 'justify'],
                        },
                      ],
                      ['bold', 'italic', 'strike', 'underline'],
                      ['token', 'hr', 'link', 'custom_btn'],
                      ['fullscreen'],
                      [
                        {
                          label: $q.lang.editor.fontSize,
                          icon: $q.iconSet.editor.fontSize,
                          fixedLabel: true,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7',
                          ],
                        },
                      ],
                      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                      ['undo', 'redo'],
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="row items-baseline q-mt-xl">
              <div class="col-12 col-md-4">
                <p class="font-16 no-margin">{{ $t("Filter Categories") }}</p>
              </div>
              <div class="col-12 col-md-8">
                <Categories
                  :requiresValidation="true"
                  :editing="[]"
                  @update:category="form.categories = $event"
                />
              </div>
            </div>
          </q-form>
          <div class="text-right">
            <q-btn
              :label="$t('newProjectIdeaForm.publish')"
              @click="createDiscussion"
              unelevated
              size="16px"
              color="primary"
              no-caps
              class="radius-6 q-py-xs"
              :loading="isLoading"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import Categories from "components/projects/create/Categories.vue";
export default {
  name: "createDiscuss",
  components: {
    Categories,
  },
  data() {
    return {
      form: {
        description: "",
      },
      isLoading: false,
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
  },
  methods: {
    async createDiscussion() {
      const valid = await this.$refs.newDiscussionForm.validate();
      if (!valid || this.form.description.length === 0) return;
      this.isLoading = true;
      const res = await this.$store.dispatch(
        "forum/createDiscussion",
        this.form
      );
      this.isLoading = false;
      if (res) {
        this.$router.push({ name: "discuss" });
      }
    },
  },
  mounted() {
    this.$store.dispatch("category/getCategories");
  },
};
</script>

<style lang="scss">
.create-discussions {
  background-color: $page-color;
}
</style>
