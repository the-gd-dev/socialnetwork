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
      <Icon v-if="!user.photo" name="user-circle" size="34px" customClass="text-gray-600" />
      <profile-picture
        v-else
        :userId="postUser.id"
        :url="postUser.photo"
        :loading="postUser.profilePicLoading"
        @loading-complete="postUser.profilePicLoading = false"
      />
    </div>
    <div class="flex flex-col space-y-0">
      <div class="text-md font-semibold leading-4 text-gray-600">
        <nuxt-link :to="`/${postUser.id}`" class="">{{ postUser.name }}</nuxt-link>
      </div>
      <div class="text-sm text-gray-500">{{ formatTimeToHuman(postTime) }}</div>
    </div>
  </div>
</template>

<script>
import { axiosGet } from "~/helpers/axiosHelpers";
export default {
  name: "PostUser",
  props: ["userId", "postTime"],
  data() {
    return {
      loading: true,
      postUser: {},
    };
  },
  async created() {
    this.loading = true;
    try {
      let { data } = await axiosGet("users/" + this.userId);
      this.postUser = data.user;
    } catch (response) {
      console.log(response.data);
    }
    this.loading = false;
  },
};
</script>

<style></style>
