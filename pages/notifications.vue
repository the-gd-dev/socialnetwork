<template>
  <div
    class="rounded-lg w-full flex flex-col justify-center xl:pl-4 mt-2"
  >
    <user-notifications />
  </div>
</template>

<script>
import UserNotifications from "~/components/Navbar/UserNotifications.vue";
export default {
  components: { UserNotifications },
  layout: "auth",
};
</script>

<style></style>
