<template>
  <profile-layout :profileId="userId" :displayPage="'followers'">
    <div class="text-xl font-semibold">My Followers</div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
export default {
  name: "Followers",
  layout: "auth",
  components: { ProfileLayout },
  asyncData({ params }) {
    return { userId: params.id };
  },
};
</script>
