<template>
  <div>
    <div
      class="bg-white radius-20"
    >
      <div class="row"  v-if="!!project">
        <!-- Project idea title -->
        <div class="col-12 col-md-4">
          <strong class="text-red">
            {{ project.title }}
          </strong>
        </div>
        <!-- Project idea info -->
        <div class="col-12 col-md-4">
          <q-expansion-item
          switch-toggle-side
          expand-separator
          :label="$t('newProjectIdeaForm.projectStartingCondition')"
          header-class="text-red"
          dense
        >
          <q-card>
            <q-card-section>
              {{project.details.startingCondition}}
            </q-card-section>
          </q-card>
        </q-expansion-item>
         <q-expansion-item
            switch-toggle-side
            expand-separator
            :label="$t('projectContent.projectContent')"
            header-class="text-red"
            dense
          >
            <q-card>
              <q-card-section>
                 {{ project.details.content }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
           <q-expansion-item
            switch-toggle-side
            expand-separator
            :label="$t('projectContent.projectGoals')"
            header-class="text-red"
            dense
          >
            <q-card>
              <q-card-section>
                 {{ project.details.goals }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
           <q-expansion-item
              switch-toggle-side
              expand-separator
              :label="$t('projectContent.projectValue&Benefits')"
              header-class="text-red"
              dense
            >
              <q-card>
                <q-card-section>
                  {{ project.details.valuesAndBenefits }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
             <!-- <q-expansion-item
              switch-toggle-side
              expand-separator
              :label="$t('projectContent.CooperationPartner')"
              header-class="text-red"
              dense
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                  commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                  eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
        </div>
        <div class="col-12 col-md-4">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          :label="$t('Investive') + '/' + $t('Non-Investive')"
          header-class="text-red"
          dense
        >
          <q-card>
            <q-card-section>
              {{ project.details.investive ? $t("Investive") : $t("Non-Investive") }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
            switch-toggle-side
            expand-separator
            :label="$t('projectContent.projectStatus')"
            header-class="text-red"
            dense
          >
            <q-card>
              <q-card-section>
               {{ $t(project.details.status)}}
              </q-card-section>
            </q-card>
          </q-expansion-item>
           <q-expansion-item
              switch-toggle-side
              expand-separator
              :label="$t('projectContent.estimatedCost')"
              header-class="text-red"
              dense
            >
              <q-card>
                <q-card-section>
                 <div
                      v-if="
                        project.estimatedCosts &&
                        project.estimatedCosts.length > 0
                      "
                    >
                      <div
                        class="q-ml-md font-16 row justify-between"
                        v-for="(cost, index) in project.estimatedCosts"
                        :key="index"
                      >
                        <div class="col-auto">
                          <p class="q-mb-sm">
                            {{ cost.name }}
                          </p>
                        </div>
                        <div class="col-auto text-right ">
                          <p class="q-mb-sm text-overflow">{{ cost.price }} €</p>
                        </div>
                      </div>
                    </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
           <q-expansion-item
              switch-toggle-side
              expand-separator
              :label="$t('projectContent.plannedPeriod')"
              header-class="text-red"
              dense
            >
              <q-card>
                <q-card-section>
                  <div class="q-ml-md font-16 row">
                      <div class="col-6 text-left">
                        <p class="q-mb-sm">{{ $t("start") }}</p>
                      </div>
                      <div class="col-6 text-right">
                        <p class="q-mb-sm">
                          {{
                            dateFormatter(project.plannedStart) ||
                            "No start date found"
                          }}
                        </p>
                      </div>
                      <div class="col-6 text-left">
                        <p class="q-mb-sm">{{ $t("end") }}</p>
                      </div>
                      <div class="col-6 text-right">
                        <p class="q-mb-sm">
                          {{
                            dateFormatter(project.plannedEnd) ||
                            "No end date found"
                          }}
                        </p>
                      </div>
                    </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
                switch-toggle-side
                expand-separator
                :label="$t('projectContent.links')"
                header-class="text-red"
                dense
              >
                <q-card>
                  <q-card-section>
                    <div v-if="project.links && project.links.length > 0">
                          <div
                            class="row"
                            v-for="(link, index) in project.links"
                            :key="index"
                          >
                            <p class="q-mb-none">{{ link.title }}</p>
                            <a
                              class="col-12 q-mb-sm text-blue block text-weight-600 text-overflow"
                              target="_blank"
                              rel="noopener noreferrer"
                              :href="
                                link.link.split('://')[0].substring(0, 5) ===
                                  'https'
                                  ? link.link
                                  : link.link.split('://')[0].substring(0, 4) ===
                                    'http'
                                    ? link.link
                                    : `http://${link.link}`
                              "
                            >
                              {{ link.link }}
                            </a>
                          </div>
                        </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatter } from "src/boot/dateFormatter";
  export default {
    name: "InlineProjectView",
    props: {
      projectID: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        model: this.projectID,
        selectedProject: null
      };
    },
  methods: {
      dateFormatter,
      async getProject() {
        await this.$store.dispatch("project/getSpecificProject", {
          id: Number(this.model)
        });
      },
    },
    computed: {
      project() {
      return this.$store.state.project.project;
    }
    },
    mounted() {
      this.getProject();
    }
  }
</script>

<style lang="scss" scoped>

</style>
