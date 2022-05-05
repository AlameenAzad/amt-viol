<template>
  <q-page class="q-mx-xl q-mt-lg">
    <municipality />
  </q-page>
</template>

<script>
import municipality from "components/Municipality/municipality.vue";

export default {
  name: "MunicipalityPage",
  components: {
    municipality
  }
};
</script>
