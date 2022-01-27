<template>
  <div class="flex w-full flex-col">
    <div v-if="!loading" class="post-skeleton">
      <user-post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else class="posts-container flex flex-col items-center">
      <post-skeleton v-for="post in 5" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import UserPost from "@/components/Post/index.vue";
import PostSkeleton from "@/components/Post/PostSkeleton.vue";
export default {
  name: "UserPosts",
  components: { UserPost, PostSkeleton },
  data() {
    return {
      loading: false,
      posts: [],
    };
  },
  async created() {
    this.loading = true;
    const response_posts = await this.$axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=4`
    );
    response_posts.data.map((post, key) => {
      post.photo = {
        url: `https://picsum.photos/id/10${post.id}/600/600`,
        loading: true,
      };
    });
    this.posts = response_posts.data;
    this.loading = false;
  }
};
</script>

<style></style>
