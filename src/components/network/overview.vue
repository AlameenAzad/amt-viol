<template>
  <q-table
    grid
    title="My Network"
    :data="data"
    :columns="columns"
    row-key="name"
    hide-header
    class="tableHead q-mb-lg"
    hide-bottom
    :pagination="{ rowsPerPage: 6 }"
  >
    <template v-slot:top>
      <div class="col-12 q-mt-sm">
        <p class="font-24 q-mb-none">
          My Network
          <span
            class="font-16 float-right q-mb-md q-pt-sm text-blue text-underline text-weight-600"
          >
            Show my Network
          </span>
        </p>
      </div>
    </template>
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-2">
        <q-card class="shadow-2 bg-blue-1 radius-10 q-py-md">
          <q-card-section class="text-center">
            <q-avatar class="radius-10 q-mb-md" size="100px">
              <img
                :src="
                  props.row.img.length > 0
                    ? props.row.img
                    : '/icons/networkPlaceholder.svg'
                "
              />
            </q-avatar>
            <br />
            <p class="font-16 text-weight-bold q-mb-none">
              {{ props.row.name }}
            </p>
            <p class="font-12 q-mb-none">{{ props.row.title }}</p>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "name",
          align: "center",
          label: "name",
          field: "name"
        },
        { name: "img", label: "image", field: "img" },
        { name: "title", label: "title", field: "title" }
      ],
      data: [
        {
          name: "Lindsey Herwitz",
          img: "",
          title: "Project Coordinator"
        },
        {
          name: "Förderscout",
          img:
            "https://imgs.search.brave.com/MTI0GmdD7i4R2FX8bPx0nqjwC6vH1mdGOjFL9116T5Y/rs:fit:1200:798:1/g:ce/aHR0cHM6Ly9zbS5h/c2ttZW4uY29tL3Qv/YXNrbWVuX2luL2Fy/dGljbGUvZi9mYWNl/Ym9vay1wL2ZhY2Vi/b29rLXByb2ZpbGUt/cGljdHVyZS1hZmZl/Y3RzLWNoYW5jZXMt/b2YtZ2V0dGluX2Zy/M24uMTIwMC5qcGc",
          title: "Admin"
        },
        {
          name: "Talan Herwitz",
          img:
            "https://imgs.search.brave.com/fZcJcVpvpq6LE03UmiiNY8KrMgDAXsgTesyBNAwBOUE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93cml0/ZXN0eWxlc29ubGlu/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDgvRm9s/bG93LVRoZXNlLVN0/ZXBzLWZvci1hLUZs/YXdsZXNzLVByb2Zl/c3Npb25hbC1Qcm9m/aWxlLVBpY3R1cmUu/anBn",
          title: "Admin"
        },
        {
          name: "Stadt ABC",
          img:
            "https://imgs.search.brave.com/fDp0hsTsmFdZl8vlDpOeUXONfJKCvDcbcMhJYEqDEWk/rs:fit:399:600:1/g:ce/aHR0cDovLzEuYnAu/YmxvZ3Nwb3QuY29t/Ly0tMWVCb1VqcnR1/SS9UZ0MxTmdUNEg2/SS9BQUFBQUFBQUIw/WS8xNjBlZkNQUkRk/cy9zMTYwMC9DdXN0/b21pemUrWW91citG/YWNlYm9vaytQcm9m/aWxlK3dpdGgrQmVh/dXRpZnVsK0dpcmxz/KyUyNTI4NCUyNTI5/LmpwZw",
          title: "Project Coordinator"
        },
        {
          name: "Lindsey Herwitzas",
          img: "",
          title: "Project Coordinators"
        },
        {
          name: "Förderscoutdas",
          img:
            "https://imgs.search.brave.com/MTI0GmdD7i4R2FX8bPx0nqjwC6vH1mdGOjFL9116T5Y/rs:fit:1200:798:1/g:ce/aHR0cHM6Ly9zbS5h/c2ttZW4uY29tL3Qv/YXNrbWVuX2luL2Fy/dGljbGUvZi9mYWNl/Ym9vay1wL2ZhY2Vi/b29rLXByb2ZpbGUt/cGljdHVyZS1hZmZl/Y3RzLWNoYW5jZXMt/b2YtZ2V0dGluX2Zy/M24uMTIwMC5qcGc",
          title: "Adminf"
        },
        {
          name: "Talan Herwitzasdads",
          img:
            "https://imgs.search.brave.com/fZcJcVpvpq6LE03UmiiNY8KrMgDAXsgTesyBNAwBOUE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93cml0/ZXN0eWxlc29ubGlu/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDgvRm9s/bG93LVRoZXNlLVN0/ZXBzLWZvci1hLUZs/YXdsZXNzLVByb2Zl/c3Npb25hbC1Qcm9m/aWxlLVBpY3R1cmUu/anBn",
          title: "Admind"
        },
        {
          name: "Stadt ABCasdasd",
          img:
            "https://imgs.search.brave.com/fDp0hsTsmFdZl8vlDpOeUXONfJKCvDcbcMhJYEqDEWk/rs:fit:399:600:1/g:ce/aHR0cDovLzEuYnAu/YmxvZ3Nwb3QuY29t/Ly0tMWVCb1VqcnR1/SS9UZ0MxTmdUNEg2/SS9BQUFBQUFBQUIw/WS8xNjBlZkNQUkRk/cy9zMTYwMC9DdXN0/b21pemUrWW91citG/YWNlYm9vaytQcm9m/aWxlK3dpdGgrQmVh/dXRpZnVsK0dpcmxz/KyUyNTI4NCUyNTI5/LmpwZw",
          title: "Project Coordinatord"
        }
      ]
    };
  }
};
</script>

<style>
.tableHead .q-table__top {
  background: white;
}
</style>
