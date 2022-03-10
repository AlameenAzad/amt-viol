<template>
  <div>
    <h6 class="text-center font-24 q-mt-md">Notifications</h6>
    <q-form
      ref="notificationsDataForn"
      @submit.prevent="saveNotificationsData"
      class="q-gutter-lg q-px-md q-mb-md"
    >
      <h2 class="text-left font-16 text-weight-bold q-mb-none text-grey">
        IN THE APP
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
            @input="changeSomething($event)"
            size="lg"
            color="primary"
            class="customToggle"
            v-model="appAnfragenZurDaten"
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
            v-model="appAnfrage"
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
            v-model="appNeueProjekte"
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
            v-model="appFordermoglichkeitLauftAus"
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
            v-model="appNeueUmsetzungschecklisten"
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
            v-model="appWennMichJemandAlsKontaktHinzufugenMochte"
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
            v-model="emailAnfragenZurDaten"
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
            v-model="emailAnfrage"
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
            v-model="emailNeueProjekte"
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
            v-model="emailFordermoglichkeitLauftAus"
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
            v-model="emailNeueUmsetzungschecklisten"
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
            v-model="emailWennMichJemandAlsKontaktHinzufugenMochte"
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
            v-model="emailSichereEmails"
          />
        </div>
      </div>
      <q-separator inset class="bg-blue opacity-10 q-mt-xs" />
    </q-form>
  </div>
</template>

<script>
export default {
  name: "NotificationsTab",
  data() {
    return {
      appAnfragenZurDaten: true,
      appAnfrage: false,
      appNeueProjekte: true,
      appFordermoglichkeitLauftAus: true,
      appNeueUmsetzungschecklisten: true,
      appWennMichJemandAlsKontaktHinzufugenMochte: true,
      emailAnfragenZurDaten: true,
      emailAnfrage: true,
      emailNeueProjekte: false,
      emailFordermoglichkeitLauftAus: true,
      emailNeueUmsetzungschecklisten: true,
      emailWennMichJemandAlsKontaktHinzufugenMochte: true,
      emailSichereEmails: true
    };
  },
  methods: {
    changeSomething(value) {
      console.log(value);
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
