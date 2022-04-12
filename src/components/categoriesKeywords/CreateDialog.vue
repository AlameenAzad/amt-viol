<template>
  <q-dialog @before-show="getItemInfo" v-model="$_options">
    <q-card class="q-px-xl radius-10  column ">
      <q-form @submit.prevent="!!editingId ? editItem() : addItem()">
        <q-card-section align="center">
          <h6 class="text-center font-20 q-mt-md q-mb-none">
            {{
              !!editingId
                ? tab == "Edit categories"
                  ? "New categories"
                  : "Edit Keywords/Tags"
                : tab == "New categories"
                ? "New categories"
                : "New Keywords/Tags"
            }}
          </h6>
        </q-card-section>
        <q-card-section align="left">
          <div class=" items-center ">
            <div class="col-3">
              <p class="font-14 no-margin">
                {{
                  tab == "New categories"
                    ? "Title of the category"
                    : "Title of the keyword/Tag"
                }}
              </p>
            </div>
            <div class="col-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="createDialogInput"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Title"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center">
            <q-btn
              label="Cancel"
              v-close-popup
              outline
              size="14px"
              color="primary"
              no-caps
              class="no-shadow radius-6 q-px-xl q-mr-sm"
            />
            <q-btn
              :label="!!editingId ? 'Edit' : 'Save'"
              type="submit"
              unelevated
              :loading="isLoading"
              size="14px"
              color="primary"
              no-caps
              class="no-shadow radius-6 q-px-xl q-py-sm"
            />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "createCategoryKeywordDialog",
  props: {
    dialogState: { type: Boolean, default: false },
    tab: { type: String, default: "" },
    editingId: { type: Number, default: null }
  },
  data() {
    return {
      createDialogInput: "",
      isLoading: false,
      item: {}
    };
  },
  methods: {
    async addItem() {
      if (!!this.createDialogInput) {
        let res = null;
        this.isLoading = true;
        if (this.tab === "New categories") {
          res = await this.$store.dispatch("category/addCategory", {
            name: this.createDialogInput
          });
        } else {
          res = await this.$store.dispatch("tag/addTag", {
            name: this.createDialogInput
          });
        }
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
          this.createDialogInput = "";
        }
      }
    },
    async editItem() {
      if (!!this.createDialogInput && !!this.editingId) {
        if (this.createDialogInput !== this.item.title) {
          let res = null;
          this.isLoading = true;
          if (this.tab === "New categories") {
            res = await this.$store.dispatch("category/editCategory", {
              id: this.editingId,
              title: this.createDialogInput
            });
          } else {
            res = await this.$store.dispatch("tag/editTag", {
              id: this.editingId,
              title: this.createDialogInput
            });
          }
          this.isLoading = false;
          if (res !== false) {
            this.$_options = false;
            this.createDialogInput = "";
          }
        } else {
          this.$q.notify({
            type: "negative",
            message: "Please pick a different title"
          });
        }
      }
    },
    async getItemInfo() {
      if (!!this.editingId) {
        let res = null;
        this.isLoading = true;
        if (this.tab === "New categories") {
          try {
            res = await this.$api.get(`api/categories/${this.editingId}`);
            this.item = res.data.data;
            this.createDialogInput = res.data.data && res.data.data.title;
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        } else {
          try {
            res = await this.$api.get(`api/tags/${this.editingId}`);
            this.item = res.data.data;
            this.createDialogInput = res.data.data && res.data.data.title;
            this.isLoading = false;
          } catch (error) {
            this.isLoading = false;
          }
        }
      }
    }
  },
  computed: {
    $_options: {
      get: function() {
        return this.dialogState;
      },
      set: function(val) {
        this.createDialogInput = "";
        this.$emit("update", val);
      }
    }
  }
};
</script>
