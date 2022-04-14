<template>
  <div>
    <div class="row q-col-gutter-y-lg q-mb-lg">
      <div v-for="(user, index) in users" :key="index" class="col-12">
        <div class="row items-center q-col-gutter-x-md">
          <div class="col-11">
            <div class="row q-col-gutter-x-md ">
              <div class="col-12">
                <q-select
                  outlined
                  dense
                  :value="user"
                  :options="userOptions"
                  options-selected-class="text-primary"
                  class="no-shadow input-radius-6"
                  @input="onSelect($event, index)"
                >
                  <template v-slot:selected>
                    <template v-if="!!user && user.username !== ''">
                      {{ user.username }}
                    </template>
                    <template v-else>
                      <span class="text-grey">
                        Select user
                      </span>
                    </template>
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.username }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </div>
          <div class="col-1">
            <q-btn
              @click="removeUser(index)"
              icon="delete"
              flat
              round
              color="red"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <q-btn
        @click="addUser()"
        outline
        class="radius-6"
        icon="add"
        size="md"
        color="primary"
        label="Add Editor"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "userSelect",
  data() {
    return {
      users: [],
      emittingUsers: []
    };
  },
  methods: {
    onSelect(value, selectedIndex) {
      // Assing to users array
      this.users[selectedIndex].username = value.username;
      this.users.forEach((user, index) => {
        if (index === selectedIndex) {
          this.emittingUsers.push({
            id: value.id
          });
        }
      });
      this.$emit("update:user", this.emittingUsers);
    },
    addUser() {
      this.users.push({
        username: ""
      });
    },
    removeUser(index) {
      this.users.splice(index, 1);
      this.emittingUsers.splice(index, 1);
    }
  },
  computed: {
    userOptions() {
      return this.$store.state.userCenter.users;
    }
  }
};
</script>

<style></style>
