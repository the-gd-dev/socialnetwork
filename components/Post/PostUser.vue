<template>
  <div class="animate-pulse flex space-x-2 items-center py-2" v-if="loading">
    <div class="rounded-full bg-blue-300 h-10 w-10"></div>
    <div class="flex-1 space-y-2 py-1">
      <div class="h-2 bg-blue-300 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-2 bg-blue-300 rounded col-span-4"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-content items-center space-x-2 py-1">
    <div class="flex">
      <Icon
        v-if="!thisUser.user_meta.display_picture"
        name="user-circle"
        size="34px"
        customClass="text-gray-600"
      />
      <profile-picture
        v-else
        :userId="thisUser.id"
        :url="thisUser.user_meta.display_picture"
        :loading="thisUser.user_meta.profilePicLoading"
        @loading-complete="thisUser.user_meta.profilePicLoading = false"
      />
    </div>
    <div class="flex flex-col space-y-0">
      <div class="text-md font-semibold leading-4 text-gray-600">
        <nuxt-link :to="`/${thisUser.id}`" class="">{{
          thisUser.name
        }}</nuxt-link>
      </div>
      <div class="text-sm text-gray-500">{{ formatTimeToHuman(postTime) }}</div>
    </div>
  </div>
</template>

<script>
import { axiosGet } from "~/helpers/axiosHelpers";
export default {
  name: "PostUser",
  props: ["userId", "postTime", "postUser"],
  data() {
    return {
      loading: true,
      thisUser: {},
    };
  },
  async created() {
    this.loading = true;
    if (!this.userId) {
      let USER = {
        ...this.postUser,
        user_meta: { ...this.postUser.user_meta, profilePicLoading: false },
      };
      this.thisUser = USER;
    } else {
      await this.getUser(this.userId);
    }
    this.loading = false;
  },
  methods: {
    async getUser(id) {
      try {
        // let { data } = await axiosGet("users/" + id);
        // this.thisUser = { ...data.user, profilePicLoading: false };
      } catch (response) {
        console.log(response.data);
      }
    },
  },
};
</script>

<style></style>
