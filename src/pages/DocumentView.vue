<template>
  <q-page class="bg-blue-1">
    <div class="container">
      <div class="row q-mt-xl">
        <div class="col-12">
          <q-btn color="back" align="left" flat no-caps>
            <q-icon name="chevron_left" color="primary" class="on-left" />
            Back
          </q-btn>
        </div>
        <div class="col-12">
          <h1 class="font-24 text-weight-600 q-my-none">
            Project Name {{ $route.params.id }}
          </h1>
        </div>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-4">
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Contact Person
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Wilson Korsgaard</p>
                    <p class="q-mb-sm">Nordstrand</p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Contact details
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Süden 21C</p>
                    <p class="q-mb-sm">25845 Nordstrand</p>
                    <p class="q-mb-sm">+4948421049</p>
                    <p class="q-mb-sm">wilson.korsgaard@mail.com</p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Location of the project
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Hörnstraße 2</p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Invite Editor
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Lindsey George</p>
                    <p class="q-mb-sm">Cheyenne Arcand</p>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Categories
                  </h4>
                  <div class="q-ml-md font-16">
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Cras dapibus etiam sit amet
                    </q-chip>
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Kategorien 2
                    </q-chip>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Tags
                  </h4>
                  <div class="q-ml-md font-16">
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Etiam sit amet
                    </q-chip>
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Tag 2
                    </q-chip>
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Tag 3
                    </q-chip>
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Sit amet tiam
                    </q-chip>
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Tag 5
                    </q-chip>
                    <q-chip
                      square
                      size="16px"
                      color="yellow-10"
                      text-color="blue"
                    >
                      Tag 6
                    </q-chip>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Investive/ non-investive
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Investiv</p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    project status
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Idee</p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Estimated costs
                  </h4>
                  <div class="q-ml-md font-16 row">
                    <div class="col-8">
                      <p class="q-mb-sm">
                        Dolor sit amet, consectetuer dapibus
                      </p>
                    </div>
                    <div class="col-4 text-right">
                      <p class="q-mb-sm">31 238.00€</p>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-12">
              <q-card
                class=" flex flex-center shadow-1 radius-20"
                style="height: 560px"
              >
                <q-card-section class="">
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Image and video slideshow
                  </h4>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "documentView",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style></style>
