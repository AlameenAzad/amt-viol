<template>
  <div>
    <div>
      <div class="separator-with-title q-mb-lg font-16 q-my-xl">
        <span>Discussions</span>
      </div>
    </div>
    <div class="q-mt-md">
      <q-card
        class="shadow-1 radius-20 q-mb-md q-pa-none cursor-pointer"
        v-for="discussion in discussions"
        :key="discussion.createdAt + discussion.title"
        @click="
          () =>
            $router.push({
              path: `/discuss/view/${discussion.id}`,
            })
        "
      >
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="appUrl + discussion.author.avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{
                discussion.title.length > 108
                  ? discussion.title.slice(0, 108) + "..."
                  : discussion.title
              }}</q-item-label>
              <q-item-label caption>{{
                discussion.subject.length > 108
                  ? discussion.subject.slice(0, 108) + "..."
                  : discussion.subject
              }}</q-item-label>
            </q-item-section>
            <q-item-section class="q-pl-xl">
              <q-item-label>
                <q-chip
                  outline
                  color="purple-8"
                  text-color="white"
                  v-for="category in discussion.categories"
                  :key="category"
                >
                  {{ category }}
                </q-chip>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption top>{{
                discussion.author.fullName
              }}</q-item-label>
              <q-item-label caption>{{
                dateFormatter(discussion.createdAt)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script js>
import { dateFormatter } from "src/boot/dateFormatter";
export default {
  name: "discussions",
  data() {
    return {};
  },
  computed: {
    discussions() {
      return this.$store.getters["forum/getDiscussions"];
    },
    appUrl() {
      return process.env.VUE_APP_MAIN_URL;
    },
  },
  methods: {
    dateFormatter,
  },
  mounted() {
    this.$store.dispatch("forum/getDiscussions");
  },
};
</script>

<style lang="scss">
.separator-with {
  &-title {
    position: relative;
    height: 2px;
    background: #dadee6;
    span {
      position: absolute;
      background: #eff2f7;
      top: -10px;
      left: 45%;
      padding: 0 10px;
    }
  }

  &-button {
    position: relative;
    height: 2px;

    button {
      position: absolute;
      top: -15px;
      left: 30px;
      padding: 0 10px;
    }
  }
}
</style>
