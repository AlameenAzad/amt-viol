<template>
  <q-page class="q-mx-xl q-mt-lg">
    <q-tabs
      v-model="tab"
      align="justify"
      indicator-color="transparent"
      class="q-mb-lg text-black"
      active-bg-color="yellow"
      no-caps
    >
      <q-tab
        color="red"
        class="q-pa-lg font-20 q-mr-lg radius-10 customBorder"
        name="projectIdeas"
      >
        <p class="font-20 no-margin">Project Ideas</p>
      </q-tab>
      <q-tab
        color="red"
        class="q-pa-lg font-20 q-mr-lg radius-10 customBorder"
        name="fundings"
      >
        <p class="font-20 no-margin">Fundings</p>
      </q-tab>
      <q-tab
        color="red"
        class="q-pa-lg font-20 q-mr-lg radius-10 customBorder"
        name="implementationChecklist"
      >
        <p class="font-20 no-margin">Implementation Checklist</p>
      </q-tab>
    </q-tabs>

    <div class="radius-20 overflow-hidden">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="projectIdeas">
          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="fundings">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="implementationChecklist">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "myData",
  data() {
    return {
      tab: "projectIdeas"
    };
  }
};
</script>

<style lang="scss">
.customBorder {
  border: 2px solid $yellow;
}
</style>
