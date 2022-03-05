<template>
  <q-page class="q-mx-xl q-mt-lg">
    <div v-for="cluster in data" :key="cluster.date">
      <p class="font-16">{{ cluster.date }}</p>
      <q-card
        v-for="noti in cluster.notifications"
        :key="noti.title"
        class="shadow-1 radius-20 q-mb-md q-pa-sm"
        flat
      >
        <q-card-section class="row">
          <q-icon :name="noti.icon" size="md" color="blue-5" class="q-mr-sm" />
          <div class="col">
            <p
              class="font-16 text-weight-600 q-mb-none"
              :class="noti.extra.length == '' ? 'q-mt-sm' : ''"
            >
              {{ noti.title }}
            </p>
            <p class="font-14 q-mb-none">{{ noti.extra }}</p>
          </div>
          <div class="text-right">
            <q-btn
              color="blue"
              unelevated
              outline
              class="radius-6 text-weight-600"
              no-caps
            >
              <p class="q-mb-none q-mx-xl q-my-sm">View</p>
            </q-btn>
            <q-btn
              color="blue"
              unelevated
              class="radius-6 q-ml-md text-weight-600"
              no-caps
            >
              <p class="q-mb-none q-mx-xl q-my-sm">Accept</p>
            </q-btn>
            <q-btn
              color="red"
              unelevated
              class="radius-6 q-ml-md text-weight-600"
              no-caps
            >
              <p class="q-mb-none q-mx-xl q-my-sm">Decline</p>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "notifications",
  data() {
    return {
      data: [
        {
          date: "Today",
          notifications: [
            {
              title: "New user requests access to the platform",
              extra: "jakob.bothman@mail.com",
              icon: "person"
            },
            {
              title: "Wilson Korsgaard asks permission to see a document",
              extra: "Document title",
              icon: "description"
            },
            {
              title: "Wilson Korsgaard would like to add me as a contact",
              extra: "",
              icon: "person_add"
            }
          ]
        },
        {
          date: "22.03.05",
          notifications: [
            {
              title: "New user requests access to the platform",
              extra: "jakob.bothman@mail.com",
              icon: "person"
            },
            {
              title: "Wilson Korsgaard asks permission to see a document",
              extra: "Document title",
              icon: "description"
            },
            {
              title: "Wilson Korsgaard would like to add me as a contact",
              extra: "",
              icon: "person_add"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
