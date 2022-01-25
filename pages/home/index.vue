<template>
  <div class="right-side">
    <div class="flex items-start">
      <div class="relative top-3 flex flex-col w-full md:w-1/2 xl:w-2/5 mx-6">
        <!-- user-posts -->
        <create-post @click="createPostModal = true" />
        <!-- user-posts -->
        <user-posts />
      </div>
      <div class="sticky top-20 hidden md:inline-block w-1/2 xl:w-2/5">
        <!-- Memories & Events -->
        <!-- <memories /> -->
        <!-- New Friends -->
        <find-people />
      </div>
      <div class="sticky top-20 w-1/5 ml-2 hidden xl:inline-block">
        <people />
      </div>
    </div>
  </div>
</template>

<script>
import People from "./OnlinePeople/People.vue";
import UserPosts from "./Posts/UserPosts.vue";
import CreatePost from "./NewPost/CreatePost.vue";
import Memories from "./MemoriesAndEvents/Memories.vue";
import Events from "./MemoriesAndEvents/Events.vue";
import Icon from "~/components/Icon.vue";
import FindPeople from "./FindPeople/NewPeople.vue";
import Modal from "~/components/Modal/Modal.vue";
import HorizontalBar from '~/components/HorizontalBar.vue';
export default {
  components: {
    People,
    UserPosts,
    Icon,
    CreatePost,
    Memories,
    Events,
    FindPeople,
    Modal,
    HorizontalBar,
  },
  layout: "auth",
  name: "Home",
  data() {
    return {
      createPostModal: false,
    };
  },
};
</script>
<style scoped>

</style>
