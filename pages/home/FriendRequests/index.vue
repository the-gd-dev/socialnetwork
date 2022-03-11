<template>
  <div class="bg-white border shadow-md py-2 h-auto">
    <recieved-requests v-if="!toggleView" @toggle="toggleView = !toggleView"/>
    <sent-requests v-else @toggle="toggleView = !toggleView"/>
  </div>
</template>

<script>
import RecievedRequests from './RecievedRequests.vue';
import SentRequests from './SentRequests.vue';

export default {
  components: { RecievedRequests, SentRequests },
  name: "FriendRequests",
  data() {
      return {
          toggleView : false
      }
  },
};
</script>

<style>

</style>
