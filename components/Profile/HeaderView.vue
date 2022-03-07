<template>
  <div v-if="thisUser.id" class="flex py-4 px-4 flex-row">
    <div class="flex justify-start w-full">
      <div class="flex items-center justify-start space-x-4">
        <div class="user-picture">
          <profile-picture
            :linkToProfile="false"
            customClass="h-16 w-16 sm:h-20 sm:w-20"
            :userId="thisUser.id"
            :url="thisUser.user_meta ? thisUser.user_meta.display_picture : ''"
            :loading="
              thisUser.user_meta ? thisUser.user_meta.profilePicLoading : false
            "
            @loading-complete="
              thisUser.user_meta
                ? (thisUser.user_meta.profilePicLoading = false)
                : true
            "
          />
        </div>
        <div class="user-details">
          <div class="flex flex-col items-center lg:items-start">
            <div class="text-xl font-semibold text-shadow py-2 lg:py-0">
              {{ thisUser.name }}
            </div>
            <div
              v-if="thisUser.user_meta"
              class="text-lg text-shadow w-full lg:w-2/3"
            >
              {{ thisUser.user_meta.bio_text }}
            </div>
          </div>
        </div>
        <!-- <div class="w-full lg:w-2/7"></div> -->
      </div>
    </div>
    <div class="flex justify-start w-full">
      <header-btn-groups 
        @profile-picture="$emit('upload-profile-picture')"
        @edit-picture="() => {}"
        @unfriend="$emit('unfriend-me', { userId: thisUser.id })"
        @cancel="$emit('remove-friend-request', thisUser.id)"
        @add="$emit('add-friend')"
        @follow="$emit('follow-request', thisUser.id)"
        :isMyProfile="thisUser.uuid === user.id"
        :isRequestSent="thisUser.uuid !== user.id && isRequestSent && !isFriend"
        :isFriend="thisUser.uuid !== user.id && isFriend"
      />
    </div>
  </div>
  <div v-else class="lg:flex hidden py-2 px-4 flex-row">
    <div class="flex flex-col rounded-xl w-full">
      <!-- Header -->
      <div class="header flex justify-between items-center px-2">
        <!-- profile-picture -->
        <div class="animate-pulse flex space-x-2 items-center py-2 pl-2">
          <div class="rounded-full bg-gray-300 h-24 w-24"></div>
          <div class="flex-1 space-y-2 py-1">
            <div class="space-y-2">
              <div class="grid grid-cols-6 gap-4">
                <div class="h-2 bg-gray-300 rounded-full col-span-10"></div>
                <div class="h-2 bg-gray-300 rounded-full col-span-8"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="post-footer-skel">
          <div class="animate-pulse flex space-x-2 items-center py-2 px-2">
            <div class="rounded-full bg-gray-300 h-8 w-28"></div>
            <div class="rounded-full bg-gray-300 h-8 w-28"></div>
          </div>
        </div>
      </div>
      <!-- Post Footer -->
    </div>
  </div>
</template>

<script>
import HeaderBtnGroups from "./HeaderBtnGroups/index.vue";
export default {
  components: { HeaderBtnGroups },
  name: "HeaderView",
  props: ["thisUser", "isFriend", "isRequestSent"],
};
</script>

<style></style>
