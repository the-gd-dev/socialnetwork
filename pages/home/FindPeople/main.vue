<template>
  <div class="bg-gray-100 shadow-md border border-gray-200 rounded-xl py-2">
    <div>
      <friend-requests v-if="showRequests" @toggle="showRequests = false" />
      <new-people v-else @toggle="showRequests = true" />
    </div>
  </div>
</template>

<script>
import FriendRequests from "./FriendRequests.vue";
import NewPeople from "./NewPeople.vue";
export default {
  name: "FindPeople",
  components: { NewPeople, FriendRequests },
  data() {
    return {
      showRequests: false,
    };
  }
};
</script>
