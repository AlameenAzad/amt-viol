<template>
  <q-dialog v-model="$_options">
    <q-card class="q-pa-md radius-10" style="width: 532px; max-width: 90vw;">
      <q-card-section class="no-padding">
        <h6 class="text-center font-24 q-mt-md">
          {{ $t("userAdministration.inviteUser") }}
        </h6>
        <q-form
          @submit.prevent.stop="inviteUser"
          ref="userInviteForm"
          class="q-gutter-md q-px-md q-mb-md "
        >
          <div class="row items-baseline">
            <div class="col-12 col-md-3">
              <p class="font-14 no-margin">
                Username*
              </p>
            </div>
            <div class="col-12 col-md-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.username"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Username"
              />
            </div>
          </div>
          <div class="row items-baseline ">
            <div class="col-12 col-md-3">
              <p class="font-14 no-margin">
                Email*
              </p>
            </div>
            <div class="col-12 col-md-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.email"
                :rules="[val => !!val || 'Field is required']"
                placeholder="E-Mail"
              />
            </div>
          </div>
          <div class="row items-baseline ">
            <div class="col-12 col-md-3 ">
              <p class="font-14 no-margin ">
                {{ $t("userAdministration.role") }}
              </p>
            </div>
            <div class="col-12 col-md-9">
              <q-select
                outlined
                :options="roleOptions"
                options-selected-class="text-primary"
                class="no-shadow input-radius-6"
                v-model="form.role"
                :rules="[val => !!val || 'Field is required']"
                placeholder="Editor"
                map-options
                emit-value
              >
                <template v-slot:selected>
                  <template v-if="form.role">
                    <span>
                      {{ form.role }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="text-grey">
                      Select Role
                    </span>
                  </template>
                </template>
              </q-select>
            </div>
          </div>
          <div class="row items-baseline">
            <div class="col-12 col-md-3">
              <p class="font-14 no-margin">
                {{ $t("userAdministration.administration") }}
              </p>
            </div>
            <div class="col-12 col-md-9">
              <Municipality @update:municipality="form.municipality = $event" />
            </div>
          </div>
          <div class="row items-baseline justify-evenly">
            <div class="col-12 col-md-3">
              <p class="font-14 no-margin">
                {{ $t("userAdministration.message") }}
              </p>
            </div>
            <div class="col-12 col-md-9">
              <q-input
                outlined
                class="no-shadow input-radius-6"
                v-model="form.message"
                :rules="[val => !!val || 'Field is required']"
                type="textarea"
                placeholder="Text"
              />
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-5 q-mr-sm">
              <q-btn
                :label="$t('userAdministration.cancel')"
                outline
                v-close-popup
                size="16px"
                color="primary"
                no-caps
                class="radius-6 q-py-xs full-width"
              />
            </div>
            <div class="col-5 q-ml-sm">
              <q-btn
                :label="$t('userAdministration.sendInvitation')"
                type="submit"
                unelevated
                size="16px"
                color="primary"
                no-caps
                :loading="isLoading"
                class="radius-6 q-py-xs full-width"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Municipality from "components/projects/create/Municipality.vue";
export default {
  name: "inviteUserDialog",
  props: {
    dialogState: { type: Boolean, default: false }
  },
  components: {
    Municipality
  },
  data() {
    return {
      roleOptions: [
        {
          label: "Admin",
          value: "admin"
        },
        {
          label: "User",
          value: "user"
        }
      ],
      form: {
        username: "",
        role: "",
        municipality: {
          id: null
        },
        message: "",
        email: ""
      },
      isLoading: false
    };
  },
  methods: {
    inviteUser() {
      this.$refs.userInviteForm.validate().then(async success => {
        if (success) {
          this.isLoading = true;
          const res = await this.$store.dispatch("userCenter/inviteUser", {
            data: this.form
          });
          this.isLoading = false;
          if (res !== false) {
            this.$_options = false;
            this.form.username = "";
            this.form.role = "";
            this.form.municipality = {
              id: null
            };
            this.form.message = "";
            this.form.email = "";
          }
        } else {
          console.log("error");
        }
      });
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
