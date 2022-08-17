<template>
  <q-card class="z-top fixed-bottom full-width q-mx-auto q-pa-lg shadow-2">
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
                  By clicking "Accept All Cookies", you are agree to the storing
                  of cookies on your device to enhance site navigation, analyze
                  site usage, and assist in our marketting efforts. See our
                  Privacy Policy for more information
                </div>
              </div>
            </q-card-section>
          </div>
          <div class="col-12 col-md-4">
            <q-card-section class="">
              <div class="col-12">
                <q-btn
                  @click="onAccept('all')"
                  padding="10px 0"
                  unelevated
                  color="primary"
                  class="shadow-0 full-width"
                >
                  Accept
                </q-btn>
              </div>
              <div class="col-12 q-mt-sm">
                <q-btn
                  @click="onAccept('essential')"
                  padding="10px 0"
                  outline
                  color="primary"
                  class="shadow-0 full-width"
                >
                  Accept Essentials
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
                        maiores architecto suscipit iste eveniet doloribus ullam
                        aliquid.
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
</template>

<script>
export default {
  name: "cookieConsent",
  data() {
    return {
      essential: true,
      easeOfUse: false,
      expanded: false
    };
  }
};
</script>

<style></style>
