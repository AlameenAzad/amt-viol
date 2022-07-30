<template>
  <q-dialog v-model="$_options">
    <q-card class="q-pa-md radius-10" style="width: 532px; max-width: 90vw;">
      <q-form @submit.prevent="addComment()">
        <q-card-section class="q-pt-none" align="center">
          <h6 class="text-center font-20 q-mt-md q-mb-none">
            Add Comment
          </h6>
        </q-card-section>
        <q-card-section class="q-pb-none">
          <div class=" items-center ">
            <div class="col-12 col-md-9">
              <q-input
                outlined
                type="textarea"
                rows="10"
                class="no-shadow input-radius-6"
                v-model="comment"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Your Comment"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-5 q-mr-sm">
              <q-btn
                label="Cancel"
                v-close-popup
                outline
                size="14px"
                color="primary"
                no-caps
                class="q-py-xs radius-6 full-width"
              />
            </div>
            <div class="col-5 q-ml-sm">
              <q-btn
                label="Add Comment"
                type="submit"
                unelevated
                :loading="isLoading"
                size="14px"
                color="primary"
                no-caps
                class="q-py-xs radius-6 full-width"
              />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "addCommentDialog",
  props: {
    dialogState: { type: Boolean, default: false },
    fundingId: { type: Number, default: null }
  },
  data() {
    return {
      comment: "",
      isLoading: false
    };
  },
  methods: {
    async addComment() {
      if (!!this.comment) {
        this.isLoading = true;
        const res = await this.$store.dispatch("funding/addComment", {
          comment: this.comment,
          fundingId: this.fundingId,
          userId: !!this.loggedInUser && this.loggedInUser.id
        });
        console.log("res", res);
        this.isLoading = false;
        if (res !== false) {
          this.$_options = false;
          this.comment = "";
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
        this.comment = "";
        this.$emit("update", val);
      }
    },
    loggedInUser() {
      return (
        !!this.$store.state.userCenter.user &&
        this.$store.state.userCenter.user.user
      );
    }
  }
};
</script>
