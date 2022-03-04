<template>
  <q-page class="bg-white">
    <div class="bg-primary">
      <div class="container">
        <div class="row justify-center q-pb-xl">
          <div class="col-4">
            <div class="col-12">
              <h1 class="font-50 text-white text-weight-600 q-mb-none">
                Funding Manager
              </h1>
              <p class="text-white">
                Fusce vulputate eleifend sapien. Vestibulum purus quam,
                scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan
                lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla.
              </p>
              <div class="col-12">
                <p class="text-white">Find Document</p>
                <q-input
                  class="no-shadow q-mb-lg searchInput"
                  color="primary"
                  bg-color="white"
                  placeholder="Search"
                  filled
                  v-model="documentSearch"
                  @keyup.enter="searchForDocument"
                >
                  <template v-slot:append>
                    <q-icon
                      class="cursor-pointer"
                      @click="searchForDocument"
                      color="black"
                      name="search"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row q-col-gutter-lg q-mt-lg">
        <div class="col-4">
          <q-card class="my-card radius-10 shadow-0">
            <q-card-section>
              <div class="row">
                <div class="col-12 text-center">
                  <q-img
                    spinner-color="primary"
                    src="https://placeimg.com/500/300/nature"
                    style="height: 60px; max-width: 60px"
                  />
                </div>
                <div class="col-12 text-center">
                  <h3 class="font-16 text-weight-bold q-mb-none">
                    Project Ideas
                  </h3>
                  <p class="q-mb-none">
                    Short Description fusce vulputate eleifend sapien.
                  </p>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card radius-10 shadow-0">
            <q-card-section>
              <div class="row">
                <div class="col-12 text-center">
                  <q-img
                    spinner-color="primary"
                    src="https://placeimg.com/500/300/nature"
                    style="height: 60px; max-width: 60px"
                  />
                </div>
                <div class="col-12 text-center">
                  <h3 class="font-16 text-weight-bold q-mb-none">
                    Funding(s)
                  </h3>
                  <p class="q-mb-none">
                    Short Description fusce vulputate eleifend sapien.
                  </p>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card radius-10 shadow-0">
            <q-card-section>
              <div class="row">
                <div class="col-12 text-center">
                  <q-img
                    spinner-color="primary"
                    src="https://placeimg.com/500/300/nature"
                    style="height: 60px; max-width: 60px"
                  />
                </div>
                <div class="col-12 text-center">
                  <h3 class="font-16 text-weight-bold q-mb-none">
                    Implementation Checklist
                  </h3>
                  <p class="q-mb-none">
                    Short Description fusce vulputate eleifend sapien.
                  </p>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row q-mt-lg justify-center">
        <div class="col-12 text-center">
          <h3 class="font-36 text-weight-600">About Platform</h3>
        </div>
        <div class="col-9">
          <p class="font-18 font-weight-regular text-left">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt.
          </p>
          <p class="font-18 font-weight-regular text-left">
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
            Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
            Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
            ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
            tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit
            amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel,
            luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
            tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2>Video</h2>
        </div>
        <div class="col-6 text-right">
          <h2>Video</h2>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      documentSearch: ""
    };
  },
  methods: {
    // TODO Check if input is empty
    // TODO call API from store>actions then go to next page?
    searchForDocument() {
      this.$router.push({
        name: "documents",
        query: { q: this.documentSearch }
      });
    }
  }
};
</script>

<style scoped>
/* TODO change card class name */
.my-card {
  width: 100%;
  border: 1px solid black;
}
</style>
