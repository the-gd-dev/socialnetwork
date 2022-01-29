<template>
  <profile-layout :profileId="userId">
    <div class="flex">
      <div class="w-1/3">
        <div class="flex bg-white mt-2 flex-col shadow-lg">
          <div class="tab-span show p-4">
            <div class="text-xl font-semibold">About Me</div>
          </div>
        </div>
      </div>
      <div class="w-2/4">
      </div>
    </div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
import UserPosts from "../home/Posts/UserPosts.vue";
export default {
  name: "About",
  layout: "auth",
  components: { ProfileLayout, UserPosts },
  asyncData({ params }) {
    return { userId: params.id };
  },
};
</script>
