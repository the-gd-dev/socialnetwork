<template>
  <profile-layout :profileId="userId" :displayPage="'photos'">
    <div class="text-xl font-semibold">My Photos</div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
export default {
  name : "Photos",
  layout: "auth",
  components: { ProfileLayout },
  asyncData({ params }) {
    return { userId: params.id };
  },
};
</script>
