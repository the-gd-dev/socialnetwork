<template>
  <div class="flex flex-col post-comment bg-gray-100 py-2 px-4 my-2 rounded-xl">
    <!-- Profile Info -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2 leading-3">
        <div class="flex">
          <Icon
            v-if="!comment.user.user_meta.display_picture"
            name="user-circle"
            size="34px"
            customClass="text-gray-600"
          />
          <profile-picture
            v-else
            size="10"
            :userId="comment.user.uuid"
            :url="comment.user.user_meta.display_picture"
            :loading="comment.user.user_meta.profilePicLoading"
            @loading-complete="comment.user.user_meta.profilePicLoading = false"
          />
        </div>
        <div class="text-md font-semibold text-gray-800">
          {{ comment.user.name }}
        </div>
      </div>
      <div class="text-sm font-semibold text-gray-400">
        {{ formatTimeToHuman(comment.created_at) }}
      </div>
    </div>
    <!-- Comment -->
    <div class="flex flex-col text-gray-800 p-2 my-4 bg-white rounded-xl">
      <p>
        {{ comment.text }}
      </p>
    </div>
    <!-- Reply and React -->
    <div class="flex space-x-3 justify-center">
      <button class="text-sm font-semibold">
        <div class="flex justify-center items-center">
          <Reactions size="20px" />
        </div>
      </button>
      <button class="text-sm font-semibold">Reply</button>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "../ProfilePicture.vue";
export default {
  components: { ProfilePicture },
  props: ["comment"],
};
</script>

<style></style>
