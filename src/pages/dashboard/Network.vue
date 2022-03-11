<template>
  <q-page class="q-mx-xl q-mt-lg ">
    <div class="row bg-white q-pa-md radius-top-20">
      <div class="col-3">
        <q-input
          borderless
          outlined
          class="no-shadow input-radius-6"
          debounce="300"
          v-model="search"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-col-gutter-lg q-mt-md">
      <div class="col-3" v-for="i in 6" :key="i">
        <q-card class="shadow-1 radius-16 bg-blue-1">
          <q-card-section class="q-pt-xs ">
            <div class="row items-start no-wrap">
              <div class="col-1"></div>
              <div class="col-10 text-center q-mt-md">
                <q-img
                  class="radius-10"
                  spinner-color="primary"
                  src="https://placeimg.com/500/300/nature"
                  style="height: 100px; max-width: 100px"
                />
              </div>

              <div class="col-1 q-mt-xs">
                <q-btn
                  color="primary"
                  round
                  flat
                  size="md"
                  dense
                  icon="more_vert"
                >
                  <q-menu
                    transition-show="jump-down"
                    auto-close
                    transition-hide="jump-up"
                  >
                    <q-list style="min-width: 140px">
                      <q-item clickable v-close-popup>
                        <q-item-section
                          ><span class="text-right font-14">
                            Ansehen
                            <q-icon
                              size="sm"
                              class="text-blue"
                              name="visibility"/></span
                        ></q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section
                          ><span class="text-right font-14">
                            Entfolgen
                            <!-- TODO need to add the icon from Figma. Not sure how to do this -->
                            <q-icon
                              size="sm"
                              class="text-blue"
                              name="img:/icons/Unfollow.svg"/></span
                        ></q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <div class="col-12 text-center">
                <p class="no-margin font-16 text-weight-bold">
                  Lindsey Herwitz
                </p>
                <!-- TODO adding color directly isnt working. Fix this -->
                <p class="secondaryText no-margin font-12 text-weight-regular">
                  Project Coordinator
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "network",
  components: {},
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style lang="scss">
.secondaryText {
  color: $black-1;
}
</style>
