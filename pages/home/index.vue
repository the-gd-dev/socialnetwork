<template>
  <div class="right-side">
    <div class="flex items-start">
      <div
        class="relative top-3 flex flex-col w-full md:w-3/5 lg:w-1/2 xl:w-1/3 mx-2 lg:mx-6"
      >
        <!-- user-posts -->
        <create-post
          @click="createPostModal = true"
          @post-created="postIsCreated"
        />
        <!-- user-posts -->
        <user-posts
          class="mt-2"
          @on-post-delete="(v) => aPostIsDeleted(v)"
          :posts="posts"
          :loading="postsLoading"
          v-if="posts.length > 0"
        />
        <div v-if="!postsLoading && posts.length === 0">Create an beautiful post up there.</div>
      </div>
      <div
        class="sticky top-16 hidden md:inline-block md:w-2/5 lg:w-1/2 xl:w-1/3"
      >
        <!-- <memories /> -->
        <find-people />
      </div>
      <div class="sticky top-16 w-1/3 ml-4 hidden xl:inline-block">
        <friend-requests />
      </div>
    </div>
  </div>
</template>

<script>
import People from "./OnlinePeople/People.vue";
import UserPosts from "~/components/Posts/UserPosts.vue";
import CreatePost from "./NewPost/CreatePost.vue";
import Memories from "./MemoriesAndEvents/Memories.vue";
import Events from "./MemoriesAndEvents/Events.vue";
import Icon from "~/components/Icon.vue";
import FindPeople from "./FindPeople/main.vue";
import Modal from "~/components/Modal/Modal.vue";
import HorizontalBar from "~/components/HorizontalBar.vue";
import { axiosGet } from "~/helpers/axiosHelpers";
import FriendRequests from "./FriendRequests/index.vue";
import { globalEvent } from "~/helpers/globalEvent";
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
    FriendRequests,
  },
  layout: "auth",
  name: "Home",

  data() {
    return {
      createPostModal: false,
      postsLoading: false,
      posts: [],
    };
  },
  async created() {
    globalEvent.$on("post-deleted", (id) => {
      this.posts = this.posts.filter((p) => p.id != id);
    });
    this.postsLoading = true;
    await this.$store.dispatch("utility/fetchReactions");
    await this.$store.dispatch("utility/fetchPrivacy");
    try {
      await this.getPosts();
    } catch (error) {
      this.$notify({
        type: "err",
        duration: 3000,
        title: "Data Fetching Failed.",
        text: "Apologies from our side. We're trying again!",
      });
      await this.getPosts();
    }
    this.postsLoading = false;
  },
  methods: {
    async postIsCreated() {
      this.createPostModal = false;
      this.postsLoading = true;
      await this.getPosts();
      this.postsLoading = false;
    },

    async getPosts() {
      try {
        let { data } = await axiosGet("posts");
        this.posts = data.posts.data;
      } catch (response) {}
    },
  },
  beforeDestroy() {
    globalEvent.$off("post-deleted");
  },
};
</script>
