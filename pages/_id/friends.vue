<template>
  <profile-layout :profileId="userId" :displayPage="'friends'">
    <div class="text-xl font-semibold">My Friends</div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
export default {
  name: "Friends",
  layout: "auth",
  components: { ProfileLayout },
  asyncData({ params }) {
    return { userId: params.id };
  },
};
</script>
