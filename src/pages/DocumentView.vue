<template>
  <!-- TODO Turn everything into components -->
  <q-page class="bg-blue-1">
    <div class="container">
      <div class="row q-mt-xl">
        <div class="col-12">
          <q-btn @click="$router.go(-1)" color="back" align="left" flat no-caps>
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
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Funding Guidlines
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">Cum sociis natoque aenean massa.</p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Planned period
                  </h4>
                  <div class="q-ml-md font-16 row">
                    <div class="col-6 text-left">
                      <p class="q-mb-sm">Start</p>
                    </div>
                    <div class="col-6 text-right">
                      <p class="q-mb-sm">03.09.2021</p>
                    </div>
                    <div class="col-6 text-left">
                      <p class="q-mb-sm">End</p>
                    </div>
                    <div class="col-6 text-right">
                      <p class="q-mb-sm">31.12.2022</p>
                    </div>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Links
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-none">Dolor sit amet, consectetuer</p>
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >http://link.to.page</a
                    >
                    <p class="q-mb-none">Consectetuer dolor sit amet</p>
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >http://link.to.page</a
                    >
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Uploads
                  </h4>
                  <div class="q-ml-md font-16">
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >File name.docx</a
                    >
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >File name.pdf</a
                    >
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >File name.pdf</a
                    >
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Relevant documents
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-none">Förderinfo</p>
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >Förderinfo name</a
                    >
                    <p class="q-mb-none">Umsetzungscheckliste</p>
                    <a
                      class="q-mb-sm text-blue block text-weight-600"
                      href="http://link.to.page"
                      >Umsetzungscheckliste name</a
                    >
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <q-carousel
                    swipeable
                    animated
                    v-model="slide"
                    infinite
                    class="radius-10"
                  >
                    <q-carousel-slide
                      v-for="(item, index) in carousel"
                      :key="index"
                      :name="index + 1"
                      :img-src="item.img"
                    />
                  </q-carousel>
                  <div class="row justify-center">
                    <div class="col-9">
                      <q-tabs
                        v-model="slide"
                        indicator-color="transparent"
                        outside-arrows
                        inline-label
                        mobile-arrows
                        align="center"
                        active-class="opacity-50"
                        class="no-padding q-mt-md carouselThumbnails"
                      >
                        <q-tab
                          :name="index + 1"
                          @click="slide = index + 1"
                          v-for="(item, index) in carousel"
                          :key="index"
                          class="no-padding q-mx-sm radius-10"
                          content-class="no-padding overflow-hidden"
                        >
                          <div
                            class="no-padding radius-10 overflow-hidden"
                            style="width:100px; height:100px"
                          >
                            <q-card-section class="no-padding">
                              <q-img
                                :src="item.img"
                                height="100px"
                                width="100px"
                              />
                            </q-card-section>
                          </div>
                        </q-tab>
                      </q-tabs>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 q-mb-md">
              <q-card class="shadow-1 radius-20">
                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Project Goals
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">
                      Aenean commodo ligula eget dolor. Cum sociis natoque
                      aenean massa.
                    </p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Project value &amp; benefits
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">
                      Dolor sit amet, consectetuer adipiscing elit.
                    </p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    Cooperation partner
                  </h4>
                  <div class="q-ml-md font-16">
                    <p class="q-mb-sm">
                      Allison Carder
                    </p>
                  </div>
                </q-card-section>

                <q-separator inset class="bg-blue opacity-10" />

                <q-card-section>
                  <h4 class="font-16 text-blue-5 q-mb-none q-mt-none">
                    project content
                  </h4>
                  <div class="q-ml-md font-16">
                    <!-- TODO may need to convert this to html renderer -->
                    <p class="q-mb-sm">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                      natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa
                      quis enim. Donec pede justo, fringilla vel, aliquet nec,
                      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
                      a, venenatis vitae, justo. Nullam dictum felis eu pede
                      mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
                      elementum semper nisi. Aenean vulputate eleifend tellus.
                      Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                      ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                      feugiat a, tellus. Phasellus viverra nulla ut metus varius
                      laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
                      nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam
                      eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
                      condimentum rhoncus, sem quam semper libero, sit amet
                      adipiscing sem neque sed ipsum. Nam quam nunc, blandit
                      vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec
                      odio et ante tincidunt tempus. Donec vitae sapien ut
                      libero venenatis faucibus. Nullam quis ante. Etiam sit
                      amet orci eget eros faucibus tincidunt. Duis leo. Sed
                      fringilla mauris sit amet nibh. Donec sodales sagittis
                      magna. Sed consequat, leo eget bibendum sodales, augue
                      velit cursus nunc, quis gravida magna mi a libero. Fusce
                      vulputate eleifend sapien. Vestibulum purus quam,
                      scelerisque ut, mollis sed, nonummy id, metus. Nullam
                      accumsan lorem in dui. Cras ultricies mi eu turpis
                      hendrerit fringilla. Phasellus leo dolor, tempus non,
                      auctor et, hendrerit quis, nisi. Curabitur ligula sapien,
                      tincidunt non, euismod vitae, posuere imperdiet, leo.
                      Maecenas malesuada. Vestibulum ante ipsum primis in
                      faucibus orci luctus et ultrices posuere cubilia Curae; In
                      ac dui quis mi consectetuer lacinia. Nam pretium turpis et
                      arcu. Duis arcu tortor, suscipit eget, imperdiet nec,
                      imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.
                      Integer ante arcu, accumsan a, consectetuer eget, posuere
                      ut, mauris. Praesent adipiscing. Phasellus ullamcorper
                      ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat
                      pretium libero. Cras id dui. Aenean ut eros et nisl
                      sagittis vestibulum. Nullam nulla eros, ultricies sit
                      amet, nonummy id, imperdiet feugiat, pede. Sed lectus.
                      Donec mollis hendrerit risus. Phasellus nec sem in justo
                      pellentesque facilisis. Etiam imperdiet imperdiet orci.
                      Nunc nec neque. Phasellus leo dolor, tempus non, auctor
                      et, hendrerit quis, nisi. Curabitur ligula sapien,
                      tincidunt non, euismod vitae, posuere imperdiet, leo.
                      Phasellus leo dolor, tempus non, auctor et, hendrerit
                      quis, nisi. Curabitur ligula sapien, tincidunt non,
                      euismod vitae, posuere imperdiet, leo. Maecenas malesuada.
                      Maecenas malesuada. Praesent congue erat at massa. Sed
                      cursus turpis vitae tortor. Donec posuere vulputate arcu.
                      Phasellus accumsan cursus velit. Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices posuere cubilia
                      Curae; Sed aliquam, nisi quis porttitor congue, elit erat
                      euismod orci, ac placerat dolor lectus quis orci.
                      Phasellus consectetuer vestibulum elit. Aenean tellus
                      metus, bibendum sed, posuere ac, mattis non, nunc.
                      Vestibulum fringilla pede sit amet augue. In turpis.
                      Pellentesque posuere. Phasellus leo dolor, tempus non,
                      auctor et, hendrerit quis, nisi. Curabitur ligula sapien,
                      tincidunt non, euismod vitae, posuere imperdiet, leo.
                      Maecenas malesuada.
                    </p>
                  </div>
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
    return {
      slide: 1,
      carousel: [
        {
          img: "https://cdn.quasar.dev/img/mountains.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/mountains.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/mountains.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/parallax1.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/quasar.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/parallax1.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/parallax2.jpg"
        },
        {
          img: "https://cdn.quasar.dev/img/quasar.jpg"
        }
      ]
    };
  },
  methods: {
    handlePan({ evt, ...info }) {
      // this.info = info;
      // console.log(info);

      this.$refs.thumbnails.setScrollPosition("horizontal", info.position.left);

      console.log(
        "sadasdsad",
        this.$refs.thumbnails.getScrollPosition("horizontal")
      );

      // native Javascript event
      // console.log(evt)

      if (info.isFirst) {
        this.panning = true;
      } else if (info.isFinal) {
        this.panning = false;
      }
    }
  },
  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style lang="scss">
.carouselThumbnails .q-tabs__arrow--end {
  right: -70px;
  color: $blue;
}
.carouselThumbnails .q-tabs__arrow--start {
  left: -70px;
  color: $blue;
}
</style>
