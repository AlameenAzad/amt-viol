<template>
  <q-dialog @before-show="addItemInfo" v-model="$_options">
    <q-card class="q-px-xl radius-10  column ">
      <q-form @submit.prevent="editingId ? editItem() : addItem()">
        <q-card-section align="center">
          <h6 class="text-center font-20 q-mt-md q-mb-none">
            {{
              tab == "New categories" ? "New categories" : "New Keywords/Tags"
            }}
          </h6>
        </q-card-section>
        <q-card-section align="left"
          ><div class=" items-center ">
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
            </div></div
        ></q-card-section>
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
              :label="editingId ? 'Edit' : 'Save'"
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
    editingId: { type: String, default: "" }
  },
  data() {
    return {
      createDialogInput: "",
      isLoading: false
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
    editItem() {
      console.log("Edit item");
    },
    addItemInfo() {
      console.log("this.editingId :>> ", this.editingId);
      if (!!this.editingId) {
        // TODO change this to categories and tags like above
        this.$api.get(`api/categories/${this.editingId}`).then(res => {
          // this.createDialogInput = res.data.name;
          // TODO getting forbidden error
          console.log(res);
        });
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

<style></style>
