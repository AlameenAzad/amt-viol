<template>
  <q-page class="q-mx-xl q-mt-lg">
    <roles />
  </q-page>
</template>

<script>
import roles from "components/user/management/Roles.vue";

export default {
  name: "AdminUserPage",
  components: {
    roles
  }
};
</script>
