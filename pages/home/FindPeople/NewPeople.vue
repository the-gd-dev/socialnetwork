<template>
  <div class="people">
    <div class="flex flex-col lg:flex-row justify-between items-center px-4">
      <div class="text-2xl font-semibold text-gray-800">
        Do I know you ?
        <div class="text-sm text-gray-600">May be you know them.</div>
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
        v-for="person in people"
        :key="person.id"
        :personData="person"
        :trimLength="10"
        :showStatus="false"
        :showInfo="true"
        :connectOptions="true"
        @add-friend="addFriend"
        @remove-friend="removeFriend"
        :showUndo="showUndoButton"
      />
    </div>
    <div
      class="flex flex-col justify-center items-center"
      v-if="!loading && people.length === 0"
    >
      <div class="text-lg text-gray-500">No People Around.</div>
      <div class="text-sm text-gray-600">
        Hit superpowered refresh button and wait for new people to load.
      </div>
      <button
        @click="randomPeople"
        class="bg-blue-200 text-blue-600 px-6 py-2 text-sm rounded-full flex space-x-2 my-4"
      >
        <div>Refresh</div>
        <div>
          <icon name="refresh" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import Modal from "~/components/Modal/Modal.vue";
import Person from "~/components/Person/Person.vue";
import PersonSkeleton from "~/components/Person/PersonSkeleton.vue";
import { axiosGet, axiosPost } from "~/helpers/axiosHelpers";
export default {
  name: "NewPeople",
  components: { Modal, Person, PersonSkeleton },
  data() {
    return {
      nameTrim: 15,
      showRequests: false,
      loading: false,
      people: [],
      windowInnerWidth: 1366,
      showUndoButton: false,
    };
  },
  async created() {
    await this.randomPeople();
  },
  mounted() {
    this.windowInnerWidth = window.innerWidth;
  },
  methods: {
    async randomPeople() {
      this.loading = true;
      let { data } = await axiosGet("people");
      this.people = data.people.filter((u) => {
        if (u.uuid !== this.user.id) {
          u.request_sent = false;
        }
        return u;
      });
      this.loading = false;
      return true;
    },
    async addFriend(payload) {
      let { data } = await axiosPost("friends/add", { id: payload.person.uuid });
      payload.person.request_sent = true;
      payload.person.requestId = data.id;
      this.showUndoButton = true;
      setTimeout(() => {
        if (payload.person.request_sent) {
          this.showUndoButton = false;
          this.removeFriend(payload);
        }
      }, 3000);
    },
    async removeFriend(payload) {
      if (this.showUndoButton) {
        await axiosPost("friends/remove", {
          id: payload.person.requestId,
        });
        payload.person.request_sent = false;
        return false;
      } else {
        this.people = this.people.filter((p) => p.id !== payload.person.id);
      }
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
  max-height: 750px;
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
