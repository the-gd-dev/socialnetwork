<template>
  <profile-layout :profileId="userId" :displayPage="'friends'">
    <div class="flex flex-col">
      <div
        class="w-full flex justify-between bg-white rounded-xl shadow-md border border-gray-200"
      >
        <div class="inline show py-2 px-4">
          <div class="text-lg font-semibold text-gray-900">Friends</div>
        </div>
        <div class="inline show py-2 px-4">
          <privacy
            v-if="userId === user.id"
            :toggle="showPopup"
            @toggle-privacy="(v) => (showPopup = !showPopup)"
          />
        </div>
      </div>
      <div
        class="w-full space-x-2 flex bg-white rounded-xl shadow-lg border border-gray-200 justify-start px-4 py-4 mt-4"
      >
        <div
          v-if="loading"
          class="flex justify-center py-6 items-center w-full"
        >
          <spinner spinnerSize="spinner-xl" />
        </div>
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="friend-wrapper w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
        >
          <div
            class="friend flex flex-col justify-center items-center border-2 rounded-lg border-gray-200 py-3"
          >
            <div
              class="flex overflow-hidden h-20 w-20 rounded-full items-center border-2 border-gray-400"
            >
              <img
                :src="'https://randomuser.me/api/portraits/men/1.jpg'"
                class="w-full h-full"
              />
            </div>
            <div class="text-lg font-semibold text-gray-800">
              {{ friend.name }}
            </div>
            <div class="text-md text-center text-gray-500">
              {{ friend.user_meta.bio_text || "I'm your friend" }}
            </div>
            <div class="flex flex-col space-y-2 px-4 w-full py-4">
              <nuxt-link
                :to="`/${friend.uuid}/friends`"
                class="flex justify-center space-x-2 bg-cyan-200 w-full text-cyan-500 p-1 rounded-lg"
              >
                <Icon name="users" />
                <span>Friends</span>
              </nuxt-link>
              <nuxt-link
                :to="`/${friend.uuid}/photos`"
                class="flex justify-center space-x-2 bg-cyan-200 text-cyan-500 w-full p-1 rounded-lg"
              >
                <Icon name="image" />

                <span>Photos</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          v-if="friends.length === 0"
          class="flex w-full flex-col justify-center items-center px-4 py-8"
        >
          <div class="text-3xl font-semibold text-gray-800">
            No Friends
            <div class="text-sm text-gray-600">You've no friends yet.</div>
            <div class="text-sm text-gray-600">
              Find people and send them a request if they accept.
            </div>
            <div class="">
              <span class="text-2xl font-semibold text-gray-800">Bingo </span>
              <span class="text-lg text-gray-600"> you're friends.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </profile-layout>
</template>

<script>
import Privacy from "~/components/Privacy.vue";
import ProfileLayout from "~/components/Profile/index.vue";
import { axiosGet } from "~/helpers/axiosHelpers";
export default {
  name: "Friends",
  layout: "auth",
  components: { ProfileLayout, Privacy },
  data() {
    return {
      userId: "",
      friends: [],
      showPopup: "",
      loading: true,
    };
  },
  async created() {
    this.loading = true;
    this.userId = this.$route.params.id;
    let { data } = await axiosGet("friends", "userId=" + this.userId);
    this.friends = [];
    data.friends.map((frnd) => {
      if (frnd.user.uuid !== this.user.id) {
        this.friends.push(frnd.user);
      }
      if (frnd.friend.uuid !== this.user.id) {
        this.friends.push(frnd.friend);
      }
    });
    this.loading = false;
  },
};
</script>
<style scoped></style>
