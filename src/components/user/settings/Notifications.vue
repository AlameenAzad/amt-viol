<template>
  <div>
    <h6 class="text-center font-24 q-mt-md">Notifications</h6>
    <q-form ref="notificationsDataForn" class="q-gutter-lg q-px-md q-mb-md">
      <h2 class="text-left font-16 text-weight-bold q-mb-none text-grey">
        IN THE APP
      </h2>
      <q-separator inset class="bg-blue-5 q-mt-none" />

      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            {{ $t("notifications.updateRequest") }}
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.app.dataRequests"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />

      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            {{ $t("notifications.invitations") }}
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.app.inquiry"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            {{ $t("notifications.newProjects") }}
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.app.newProjects"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Fördermöglichkeit läuft aus
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.app.fundingExpiry"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Neue Umsetzungschecklisten
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.app.newChecklists"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Wenn mich jemand als Kontakt hinzufügen möchte
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.app.networkRequest"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <h2
        class="text-left font-16 text-weight-bold q-mb-none q-mt-md text-grey"
      >
        VIA EMAIL
      </h2>
      <q-separator inset class="bg-blue-5 q-mt-none" />

      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Anfragen zur Daten
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.dataRequests"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />

      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Anfrage
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.inquiry"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Neue Projekte
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.newProjects"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Fördermöglichkeit läuft aus
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.fundingExpiry"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Neue Umsetzungschecklisten
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.newChecklists"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Wenn mich jemand als Kontakt hinzufügen möchte
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.networkRequests"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row items-center q-mt-xs q-pl-md">
        <div class="col-10">
          <p class="font-16 no-margin">
            Sichere E-Mails
          </p>
        </div>
        <div class="col-2 text-right">
          <q-toggle
            size="lg"
            color="primary"
            class="customToggle"
            v-model="form.notifications.email.secureEmails"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
      <div class="row justify-center">
        <q-btn
          label="Save Changes"
          @click="saveNotificationsData"
          :loading="isLoading"
          size="16px"
          color="primary"
          no-caps
          class="radius-6 q-px-xl q-py-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "NotificationsTab",
  data() {
    return {
      isLoading: false,
      form: {
        notifications: {
          app: {
            dataRequests: true,
            inquiry: true,
            newProjects: true,
            fundingExpiry: true,
            newChecklists: true,
            networkRequest: true
          },
          email: {
            dataRequests: true,
            inquiry: true,
            newProjects: true,
            fundingExpiry: true,
            newChecklists: true,
            networkRequests: true,
            secureEmails: true
          }
        }
      }
    };
  },
  methods: {
    saveNotificationsData() {
      this.$refs.notificationsDataForn.validate().then(async success => {
        if (success) {
          console.log("Success");
          // this.isLoading = true;
          // const res = await this.$store.dispatch(
          //   "userCenter/updatePersonalData",
          //   {
          //     data: {
          //       fullName: this.form.fullName,
          //       phone: this.form.telephone,
          //       location: this.form.location
          //     }
          //   }
          // );
          // this.isLoading = false;
          // if (res !== false) {
          //   // TODO do something
          // }
        } else {
          console.log("error");
        }
      });
    },
    setData() {
      this.form.notifications = {
        ...this.form.notifications,
        ...JSON.parse(
          JSON.stringify(
            this.$store.state.userCenter.user.userDetails.notifications
          )
        )
      };
    }
  },
  mounted() {
    this.setData();
  },
  computed: {
    userDetails() {
      return (
        this.$store.state.userCenter.user &&
        this.$store.state.userCenter.user.userDetails
      );
    }
  }
};
</script>

<style lang="scss">
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
</style>
