<template>
  <profile-layout :profileId="userId" :displayPage="'videos'">
    <div class="text-xl font-semibold">My Videos</div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
export default {
  name : "Videos",
  layout: "auth",
  components: { ProfileLayout },
  asyncData({ params }) {
    return { userId: params.id };
  },
};
</script>
