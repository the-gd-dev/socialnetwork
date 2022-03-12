<template>
  <div class="flex w-full">
    <div class="flex w-full justify-end" v-if="isMyProfile">
      <div class="space-x-2 w-full flex items-center justify-end py-2 lg:py-0">
        <header-btn-group
          ButtonIcon1="edit"
          ButtonTitle1="Profile Picture"
          ButtonIconClass1="bg-gray-100 hover:bg-gray-300 text-gray-800"
          @btn1-click="$emit('profile-picture')"
          ButtonIcon2="user-edit"
          ButtonTitle2="Edit Profile"
          ButtonTitleClass2="bg-blue-200 hover:bg-blue-300 text-blue-600"
          @btn2-click="$emit('edit-profile')"
        />
      </div>
    </div>
    <div v-else class="flex w-full justify-end">
      <div
        v-if="isFriend"
        class="space-x-2 w-1/2 flex items-center justify-end py-2 lg:py-0"
      >
        <header-btn-group
          ButtonIcon1="user-group"
          ButtonTitle1="Friends"
          ButtonIconClass1="bg-green-600 text-white"
          ButtonIcon2="user-minus"
          ButtonTitle2="Unfriend"
          ButtonTitleClass2="bg-gray-100 hover:bg-gray-300 text-gray-800"
          @btn2-click="$emit('unfriend')"
        />
        <header-btn
          customClass="bg-gray-200 text-gray-800"
          @on-click="$emit('unfollow')"
          icon="user-minus"
          title="Unfollow"
        />
      </div>
      <div
        v-if="isRequestSent"
        class="space-x-2 w-1/2 flex items-center justify-end py-2 lg:py-0"
      >
        <header-btn-group
          ButtonIcon1="arrow-right"
          ButtonTitle1="Request Sent"
          ButtonIconClass1="bg-blue-300 text-blue-800"
          ButtonIcon2="times"
          ButtonTitle2="Cancel"
          ButtonTitleClass2="bg-gray-300 text-gray-800"
          @btn2-click="$emit('cancel')"
        />
      </div>
      <div
        v-if="!isRequestSent && !isFriend"
        class="space-x-2 w-1/2 flex items-center justify-end py-2 lg:py-0"
      >
        <header-btn-group
          ButtonIcon1="user-plus"
          ButtonTitle1="Add Friend"
          ButtonIconClass1="bg-blue-300 text-blue-800"
          @btn1-click="$emit('add')"
          ButtonIcon2="arrow-right"
          ButtonTitle2="Follow Me"
          ButtonTitleClass2="bg-gray-300 text-gray-800"
          @btn2-click="$emit('follow')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBtn from './HeaderBtn.vue';
import HeaderBtnGroup from "./HeaderBtnGroup.vue";
export default {
  components: { HeaderBtnGroup, HeaderBtn },
  name: "HeaderBtnGroups",
  props: ["isMyProfile", "isRequestSent", "isFriend"],
};
</script>

<style></style>
