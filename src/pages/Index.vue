<template>
  <q-page class="">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <q-card class="my-card">
            <q-card-section>
              <div class="row">
                <div class="col-12 text-center">
                  <q-img
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
          <q-card class="my-card">
            <q-card-section>
              Card Two
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card">
            <q-card-section>
              Card Three
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "index",

  data() {
    return {};
  }
};
</script>

<style scoped>
/* TODO change card class name */
.my-card {
  width: 100%;
  max-width: 370px;
}
</style>
