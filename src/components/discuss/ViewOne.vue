<template>
  <div class="q-mb-lg q-mx-xl" v-if="forum">
    <h1 class="font-24 text-weight-regular q-my-none q-mt-none">
      {{ forum.title || "" }}
    </h1>
    <q-card class="shadow-1 radius-20 q-mb-md q-pa-none">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img
                src="http://localhost:1337/uploads/thumbnail_1711706405466_65535_53547899160_2c5b9eb432_c_640_480_nofilter_d3eeee75c9.jpg"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ forum.author.fullName }}</q-item-label>
            <q-item-label caption>{{
              dateFormatter(forum.createdAt)
            }}</q-item-label>
          </q-item-section>
          <q-item-section class="q-pl-xl" top side>
            <q-item-label>
              <q-chip
                outline
                color="purple-8"
                text-color="white"
                v-for="category in forum.categories"
                :key="category"
              >
                {{ category }}
              </q-chip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-ml-xl q-pt-none">
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ forum.subject }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <span v-html="forum.description"></span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-ml-xl">
        <div class="text-caption q-ml-md">
          Email: {{ forum.author.email }} | Phone: {{ forum.author.phone }} |
          Location:
          {{ forum.author.location }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { dateFormatter } from "src/boot/dateFormatter";
export default {
  name: "ViewOne",
  data() {
    return {
      user: {
        name: "John Doe",
        avatar: "https://cdn.quasar",
        email: "test@test.test",
        phone: "32424234",
        location: "abc",
      },
      post: {
        createdAt: "22.22.2002",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies turpis. Nulla facilisi. Nullam nec nunc nec nunc.",
      },
      forum: null,
    };
  },
  methods: {
    dateFormatter,
    async getDiscussion(id) {
      this.forum = await this.$store.dispatch("forum/getDiscussion", id);
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getDiscussion(id);
  },
};
</script>
