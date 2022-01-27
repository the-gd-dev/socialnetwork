<template>
  <div
    class="new-friends-area bg-gradient-to-tl from-gray-200 to-gray-100 rounded-xl py-2"
  >
    <div class="flex flex-col px-4">
      <div class="text-2xl font-semibold text-gray-800">Do I know you ?</div>
      <div class="flex justify-between">
        <div class="text-sm text-gray-600">May be you know them.</div>
        <button
          @click="refreshPeople"
          class="bg-gray-300 text-gray-600 px-4 text-sm rounded-full flex space-x-1"
        >
          <div>Refresh</div>
          <div :class="refresh ? 'animate-spin' : ''">
            <icon name="refresh" />
          </div>
        </button>
      </div>
    </div>
    <horizontal-bar class="my-2" />
    <div class="flex flex-col new-people-container" v-if="loading">
      <div class="loading">
        <person-skeleton v-for="user in 12" :key="user" :findPeople="true" />
      </div>
    </div>
    <div v-else class="flex flex-col new-people-container">
      <!-- Single Row -->
      <person
        class="pl-4"
        v-for="user in users"
        :key="user.id"
        :user="user"
        :trimLength="nameTrim"
        :showStatus="false"
        :showInfo="true"
        :connectOptions="true"
        @add-friend="addFriend"
        @remove-friend="removeFriend"
      />
    </div>
    <modal
      headerTitle="Remove Friend"
      animation="zoom"
      :showModal="removeFriendAlert"
      @close-modal="removeFriendAlert = false"
      width="300"
    >
      <div class="flex py-2">
        <div class="">I don't know this person.</div>
      </div>
      <template #modal-footer>
        <div class="bg-transparant py-2">
          <div class="flex space-x-2 justify-end">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1"
            >
              Yes
            </button>
            <button
              class="bg-white text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-1"
              @click="removeFriendAlert = false"
            >
              No
            </button>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "~/components/Modal/Modal.vue";
import Person from "~/components/Person/Person.vue";
import PersonSkeleton from "~/components/Person/PersonSkeleton.vue";
export default {
  components: { Modal, Person, PersonSkeleton },
  data() {
    return {
      nameTrim: 15,
      removeFriendAlert: false,
      loading: false,
      refresh: false,
      users: [],
      windowInnerWidth: 1366,
    };
  },
  mounted() {
    this.windowInnerWidth = window.innerWidth;
  },
  async created() {
    await this.randomPeople();
  },
  methods: {
    async refreshPeople() {
      if (this.refresh === false) {
        this.refresh = true;
        await this.randomPeople();
        this.refresh = false;
      }
    },
    async randomPeople() {
      this.loading = true;
      const { data } = await this.$axios.get(
        `https://randomuser.me/api/?results=15`
      );
      const people = [];

      data.results.map((user) => {
        people.push({
          id:  user.login.uuid,
          name: user.name.first + " " + user.name.last,
          username: user.username,
          email: user.email,
          photo: user.picture.medium,
          profilePicLoading: true,
          location: user.location,
        });
      });
      this.users = people;
      this.loading = false;
      return true;
    },
    addFriend() {},
    removeFriend() {
      this.removeFriendAlert = true;
    },
  },
  watch: {
    windowInnerWidth(width) {
      if (width > 1280 && width <= 1535) this.nameTrim = 10;
    },
  },
};
</script>

<style scoped>
.new-people-container {
  max-height: 700px;
  overflow-y: auto;
}
.new-people-container::-webkit-scrollbar {
  width: 5px;
}
.new-people-container::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.new-people-container::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
</style>
