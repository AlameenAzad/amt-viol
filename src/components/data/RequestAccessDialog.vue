<template>
  <q-dialog v-model="$_options">
    <q-card class="q-px-xl radius-10 column">
      <q-card-section align="center">
        <h6 class="text-center font-20 q-mt-md q-mb-none">
          {{
            tab == "projectIdeas"
              ? "Delete Project Idea"
              : tab === "fundings"
              ? "Delete Funding"
              : tab === "implementationChecklist"
              ? "Delete Checklist"
              : ""
          }}
        </h6>
      </q-card-section>
      <q-card-section align="left"
        ><div class=" items-center text-center ">
          <p>
            {{
              tab == "projectIdeas"
                ? "Are you sure you want to delete this Project Idea? It will be removed from all documents."
                : tab === "fundings"
                ? "Are you sure you want to delete this Funding? It will be removed from all documents."
                : tab === "implementationChecklist"
                ? "Are you sure you want to delete this Implementation Checklist? It will be removed from all documents."
                : ""
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
            @click="deleteItem"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "requestAccessDialog",
  props: {
    dialogState: { type: Boolean, default: false },
    tab: { type: String, default: "" },
    id: { type: Number, default: null }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async deleteItem() {
      if (this.tab === "projectIdeas") {
        this.isLoading = true;
        const id = this.id;
        const res = await this.$store.dispatch("project/deleteProjectIdea", {
          id: id
        });
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
        }
      } else if (this.tab === "fundings") {
        this.isLoading = true;
        const id = this.id;
        const res = await this.$store.dispatch("funding/deleteFunding", {
          id: id
        });
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
        }
      } else {
        this.isLoading = true;
        const id = this.id;
        const res = await this.$store.dispatch(
          "implementationChecklist/deleteChecklist",
          {
            id: id
          }
        );
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
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
        this.$emit("update", val);
      }
    }
  }
};
</script>

<style></style>
