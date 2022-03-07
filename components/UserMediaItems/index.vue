<template>
  <div class="w-full flex flex-wrap">
    <div
      v-if="userMediaItems.length === 0 && fetchingData"
      class="flex justify-center py-6 items-center w-full"
    >
      <spinner spinnerSize="spinner-xl" />
    </div>
    <div
      class="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-4 md:gap-4 lg:grid-cols-6 lg:gap-6 xl:grid-cols-7 xl:gap-7 px-4"
    >
      <user-media
        :mediaType="type"
        v-for="item in userMediaItems"
        :key="item.id"
        :class="customClasses"
        @delete="itemTrashed(item)"
        @on-click="$emit('photo-clicked', item)"
        :selectIcon="selectData.id === item.id"
        :url="item.url"
        :mediaOwner="item.user"
        :trashIcon="trash"
        :selectBtn="select"
      />
    </div>
    <div
      v-if="userMediaItems.length === 0"
      class="flex w-full flex-col justify-center items-center px-4 py-8"
    >
      <div class="text-3xl font-semibold text-gray-800">
        No Photos
        <div class="text-sm text-gray-600">You've no photos yet.</div>
        <div class="text-sm text-gray-600">
          Post some photos for your friends.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosPost } from "~/helpers/axiosHelpers";
import { globalEvent } from "~/helpers/globalEvent";
import UserMedia from "./UserMedia.vue";
export default {
  name: "UserMediaItems",
  components: { UserMedia },
  props: {
    type: { default: "photos" },
    customClasses: { default: "" },
    userMediaItems: { default: [] },
    fetchingData: { default: false },
    trash: { default: false },
    select: { default: false },
    selectData: { default: () => ({ id: "" }) },
  },
  methods: {
    async itemTrashed(item) {
      if (this.type == "photos" && confirm("Are you  sure ?")) {
        await axiosPost("photos/delete", { id: item.id });
        globalEvent.$emit("media-deleted", {
          type: "photos",
          item,
        });
      }
      if (this.type == "videos" && confirm("Are you  sure ?")) {
        await axiosPost("videos/delete", { id: item.id });
        globalEvent.$emit("media-deleted", {
          type: "videos",
          item,
        });
      }
    },
  },
};
</script>

<style></style>
