<template>
  <q-dialog v-model="$_options">
    <q-card class="q-px-xl radius-10 column">
      <q-card-section align="center">
        <h6 class="text-center font-20 q-mt-md q-mb-none">
          {{
            tab == "Delete category" ? "Delete category" : "Delete Keyword/Tag"
          }}
        </h6>
      </q-card-section>
      <q-card-section align="left"
        ><div class=" items-center text-center ">
          <p>
            {{
              tab == "Delete category"
                ? "Do you really want to delete the category? It will be removed from all documents."
                : "Do you really want to delete the tag? It will be removed from all documents."
            }}
          </p>
        </div></q-card-section
      >
      <q-card-section>
        <div class="row justify-center q-ml-lg ">
          <q-btn
            label="Cancel"
            outline
            v-close-popup
            size="14px"
            color="primary"
            no-caps
            class="no-shadow radius-6 q-px-xl  q-mr-sm "
          />
          <q-btn
            label="Confirm"
            unelevated
            :loading="isLoading"
            size="14px"
            color="red"
            no-caps
            class="no-shadow radius-6 q-px-xl q-py-sm"
            @click="deleteCategory"
          />
        </div>
      </q-card-section>
      {{ tab }}
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "deleteDialog",
  props: {
    dialogState: { type: Boolean, default: false },
    tab: { type: String, default: "" },
    id: { type: String, default: "" }
  },
  data() {
    return {};
  },
  methods: {
    deleteCategory() {
      this.$store
        .dispatch("project/deleteCategory", { id: this.categoryId })
        .then(() => {
          this.$_options = false;
        });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.general.loading;
    },
    $_options: {
      get: function() {
        return this.dialogState;
      },
      set: function(val) {
        this.$emit("update", val);
      }
    }
  }
};
</script>

<style></style>
