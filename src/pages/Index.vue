<template>
  <q-page class="bg-white">
    <section :class="$q.screen.gt.sm ? '' : 'q-px-sm'" class="bg-primary">
      <div class="row justify-center text-center q-pb-xl">
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 q-mb-md">
              <h1 class="font-50 text-white text-weight-600 q-mb-none">
                Förderscouting-Plattform
              </h1>
              <p class="text-white">
                Das Projekt „Interkommunale Förderscouting-Plattform
                Nordfriesland“ ist ein Modellvorhaben im Rahmen der
                Förderinitiative „Heimat 2.0“ des Bundesministeriums für Wohnen,
                Stadtentwicklung und Bauwesen (BMWSB) in Zusammenarbeit mit dem
                Bundesinstitut für Bau-, Stadt- und Raumforschung (BBSR).
              </p>
            </div>
            <div class="col-12 col-md-6 q-mx-auto">
              <q-input
                class="no-shadow q-mb-lg input-radius-4"
                color="primary"
                bg-color="white"
                placeholder="Find document"
                filled
                v-model="documentSearch"
                @keyup.enter="searchForDocument"
              >
                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    @click="searchForDocument"
                    color="primary"
                    name="search"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div :class="$q.screen.gt.sm ? '' : 'q-px-sm'" class="bg-blue-1 q-py-xl">
      <section>
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-lg">
              <div class="col-12 col-md-4">
                <q-card
                  class="full-height full-width bg-white radius-20 shadow-1"
                >
                  <q-card-section>
                    <div class="row">
                      <div class="col-12 text-center">
                        <q-img
                          spinner-color="primary"
                          src="icons/idea.svg"
                          style="height: 60px; max-width: 60px"
                        />
                      </div>
                      <div class="col-12 text-center">
                        <h3 class="font-16 text-weight-bold q-mb-none">
                          Projektideen
                        </h3>
                        <p class="q-mb-none textColor">
                          Nutzer*innen haben die Möglichkeit eigene Projektideen
                          anzulegen und im Netzwerk zu teilen.
                        </p>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-4">
                <q-card class="full-height full-width radius-20 shadow-1">
                  <q-card-section>
                    <div class="row">
                      <div class="col-12 text-center">
                        <q-img
                          spinner-color="primary"
                          src="icons/money.svg"
                          style="height: 60px; max-width: 60px"
                        />
                      </div>
                      <div class="col-12 text-center">
                        <h3 class="font-16 text-weight-bold q-mb-none">
                          Fördermittel-Kurzinfos
                        </h3>
                        <p class="q-mb-none textColor">
                          Kurze und übersichtliche Beschreibung aktueller
                          Fördermöglichkeiten.
                        </p>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-4">
                <q-card class="full-height full-width radius-20 shadow-1">
                  <q-card-section>
                    <div class="row">
                      <div class="col-12 text-center">
                        <q-img
                          spinner-color="primary"
                          src="icons/checklist.svg"
                          style="height: 60px; max-width: 60px"
                        />
                      </div>
                      <div class="col-12 text-center">
                        <h3 class="font-16 text-weight-bold q-mb-none">
                          Umsetzungschecklisten
                        </h3>
                        <p class="q-mb-none textColor">
                          Förderprojekte von der Projektidee bis zum
                          Zuwendungsbescheid ansehen und nachnutzen.
                        </p>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-mt-lg justify-center">
          <div class="col-12 col-md-8 q-mt-lg">
            <p class="font-16 text-left">
              Ziel der Plattform ist die langfristige Stärkung der
              Handlungsfähigkeit der Kommunen im Rahmen des allgemeinen
              Entwicklungsprozesses „von der Idee zum Projekt“. Vor dem
              Hintergrund der Entwicklung lebenswerter Kommunen und der
              Sicherung von Daseinsvorsorgeinfrastrukturen wird es für
              strukturschwache Regionen immer essenzieller, vorhandene
              Entwicklungsressourcen (Projektwissen, Personal und Fördermittel)
              in einem Wissensnetzwerk zu bündeln und zu teilen.
            </p>
            <p class="font-16 text-left">
              Die Plattform bildet ein digitales Assistenzsystem für die
              Entwicklung, Förderung und Umsetzung von kommunalen Projekten. Im
              Ergebnis entsteht eine Wissensplattform, die
            </p>
            <ul class="homepageList">
              <li class="font-16 text-left q-mb-md">
                das jeweilige Projektideen-Management der Kommunen vereinfacht
              </li>
              <li class="font-16 text-left q-mb-md">
                unterschiedliche Projektideen und geeigneten Fördermöglichkeiten
                direkter verbindet und
              </li>
              <li class="font-16 text-left q-mb-md">
                Erfahrungen zu Projektumsetzungen in Form von Checklisten als
                „Kurzer Dienstweg 2.0“ bereithält.
              </li>
            </ul>
            <p class="font-16 text-left">
              Zur weiteren Verstetigung werden die nordfriesischen Kommunen
              Nutzungsbedingungen definieren, die den Zugang nach der Testphase
              für weitere Kommunen ermöglicht.
            </p>
            <p class="font-16 text-left">
              Der Zugang zur Plattform ist daher aktuell begrenzt. Um einen
              User-Account zu beantragen klicken Sie zu einem späteren Zeitpunkt
              bitte auf das entsprechende Feld im Login-Fenster.
            </p>
          </div>
        </div>
      </section>
    </div>
    <section :class="$q.screen.gt.sm ? '' : 'q-px-sm'" class="q-py-xl">
      <div class="row justify-center">
        <div class="col-12 col-md-8">
          <div class="row q-col-gutter-xl">
            <div class="col-12 col-md-4">
              <q-card class="full-height full-width shadow-0">
                <q-card-section class="full-height flex center">
                  <q-img
                    spinner-color="primary"
                    src="logo-1.svg"
                    height="150px"
                    contain
                  />
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card class="full-height full-width  shadow-0">
                <q-card-section class="full-height flex flex-center">
                  <q-img
                    spinner-color="primary"
                    src="logo-2.svg"
                    height="150px"
                    contain
                  />
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card class="full-height full-width  shadow-0">
                <q-card-section class="full-height flex flex-center">
                  <q-img
                    spinner-color="primary"
                    src="logo-3.svg"
                    height="150px"
                    contain
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>
    <q-card class="fixed-bottom full-width q-mx-auto q-pa-lg shadow-2">
      <div class="row justify-center">
        <div class="col-12 col-md-10">
          <div class="row items-center">
            <div class="col-12 col-md-8">
              <q-card-section class="q-pb-none">
                <div class="row justify-between">
                  <div class="col-6">
                    <p class="no-margin font-24">This website uses Cookies</p>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="">
                <div class="row">
                  <div class="col-12">
                    By clicking "Accept All Cookies", you are agree to the
                    storing of cookies on your device to enhance site
                    navigation, analyze site usage, and assist in our marketting
                    efforts. See our Privacy Policy for more information
                  </div>
                </div>
              </q-card-section>
            </div>
            <div class="col-12 col-md-4">
              <q-card-section class="">
                <div class="col-12">
                  <q-btn
                    padding="10px 0"
                    unelevated
                    color="primary"
                    class="shadow-0 full-width"
                  >
                    Accept All Cookies
                  </q-btn>
                </div>
                <div class="col-12 q-mt-sm">
                  <q-btn
                    padding="10px 0"
                    outline
                    color="primary"
                    class="shadow-0 full-width"
                  >
                    Accept Essential
                  </q-btn>
                </div>
              </q-card-section>
            </div>
            <div class="col-12">
              <q-card-section>
                <div class="row q-col-gutter-x-md justify-between items-center">
                  <div class="col-auto">
                    <div class="row">
                      <div class="col-auto">
                        <q-toggle
                          size="xl"
                          color="primary"
                          v-model="essential"
                          disable
                          label="Essential"
                          left-label
                        />
                      </div>
                      <div class="col-auto">
                        <q-toggle
                          size="xl"
                          color="primary"
                          v-model="easeOfUse"
                          label="User preferences"
                          left-label
                        />
                      </div>
                      <div class="col-auto">
                        <q-toggle
                          color="primary"
                          size="xl"
                          v-model="necessaryEmails"
                          label="Neceessary E-Mails"
                          left-label
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="row">
                      <div class="col-auto">
                        <q-btn
                          class="radius-6"
                          unelevated
                          color="primary"
                          @click="expanded = !expanded"
                          label="Details"
                          :icon-right="expanded ? 'expand_less' : 'expand_more'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <q-expansion-item
                      header-class="hidden"
                      expand-icon="0"
                      v-model="expanded"
                    >
                      <q-card>
                        <q-card-section>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quidem, eius reprehenderit eos corrupti commodi
                          magni quaerat ex numquam, dolorum officiis modi facere
                          maiores architecto suscipit iste eveniet doloribus
                          ullam aliquid.
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      documentSearch: "",
      essential: true,
      easeOfUse: false,
      necessaryEmails: false,
      expanded: false
    };
  },
  methods: {
    searchForDocument() {
      this.$router.push({
        name: "documents",
        query: { q: this.documentSearch }
      });
    }
  }
};
</script>

<style lang="scss">
.textColor {
  color: $black-1;
}
.homepageList {
  list-style-type: none;
  li::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $primary;
    margin-right: 8px;
  }
}
</style>
