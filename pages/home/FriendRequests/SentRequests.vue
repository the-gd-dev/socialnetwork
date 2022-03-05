<template>
  <div class="friend-request">
    <div class="flex flex-col lg:flex-row justify-between items-center px-4">
      <div class="text-2xl font-semibold text-gray-800">
        Sent Requests
        <div class="text-sm text-gray-600">Wait until they confirm.</div>
      </div>
      <div class="flex justify-between">
        <button
          @click="$emit('toggle')"
          class="bg-cyan-200 text-cyan-600 px-4 py-1 text-sm rounded-full flex space-x-2"
        >
          <div>Friend Requests</div>
          <div>
            <icon name="user-plus" />
          </div>
        </button>
      </div>
    </div>

    <horizontal-bar class="my-2" />
    <scroll-area v-if="loading">
      <div class="loading">
        <person-skeleton v-for="user in 12" :key="user" :findPeople="true" />
      </div>
    </scroll-area>
    <scroll-area :maxHeight="730" v-else>
      <!-- Single Row -->
      <person
        class="pl-4"
        v-for="request in friendRequests"
        :key="request.id"
        :personData="{
          ...request.user,
          requestType: 'sent',
          requestId: request.id,
        }"
        :trimLength="nameTrim"
        :showStatus="false"
        :showInfo="true"
        @remove-friend="removeFriendRequest"
      />
    </scroll-area>
    <div
      class="flex flex-col justify-center items-center"
      v-if="friendRequests.length === 0"
    >
      <div class="text-lg text-gray-500">No Friend Request Found.</div>
      <div class="text-sm text-gray-600">
        Find new people and send them a friend request.
      </div>
      <!-- <button
        @click="$emit('toggle')"
        class="bg-emerald-200 text-emerald-600 px-6 py-2 text-sm rounded-full flex space-x-2 my-4"
      >
        <div>New People</div>
        <div>
          <icon name="user-plus" />
        </div>
      </button> -->
    </div>
    <modal
      headerTitle="Remove Friend"
      animation="zoom"
      :showModal="removeFriendAlert"
      @close-modal="closeAlert"
      width="300"
    >
      <div class="flex py-2">
        <div class="">I don't know this person.</div>
      </div>
      <template #modal-footer>
        <div class="bg-transparant py-2">
          <div class="flex space-x-2 justify-end">
            <button
              @click="confirmRemove"
              class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1"
            >
              Yes
            </button>
            <button
              class="bg-white text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-1"
              @click="closeAlert"
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
import ScrollArea from "~/components/ScrollArea.vue";
import { axiosGet, axiosPost } from "~/helpers/axiosHelpers";
export default {
  name: "SentRequests",
  components: { Modal, Person, PersonSkeleton, ScrollArea },
  data() {
    return {
      nameTrim: 15,
      removeFriendAlert: false,
      loading: false,
      friendRequests: [],
      removePerson: {},
      windowInnerWidth: 1366,
    };
  },
  async created() {
    await this.getFriendRequests();
  },
  mounted() {
    this.windowInnerWidth = window.innerWidth;
  },
  methods: {
    async getFriendRequests() {
      this.showRequests = !this.showRequests;
      try {
        let { data } = await axiosGet("friends/requests", "type=sent");
        this.friendRequests = data.requests;
        this.friendRequests.map((r) => (r.user.request_sent = true));
      } catch (response) {
      }
    },
    removeFriendRequest(requestId) {
      this.removeFriendAlert = true;
      this.removePerson = requestId;
    },
    async confirmRemove() {
      await axiosPost("friends/remove", {
        id: this.removePerson,
      });
      await this.getFriendRequests();
      this.closeAlert();
    },
    closeAlert() {
      this.removePerson = {};
      this.removeFriendAlert = false;
    },
  },
  watch: {
    windowInnerWidth(width) {
      if (width > 1280 && width <= 1535) this.nameTrim = 10;
    },
  },
};
</script>

<style></style>
