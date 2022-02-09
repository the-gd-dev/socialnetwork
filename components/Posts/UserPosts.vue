<template>
  <div class="flex w-full flex-col">
    <div v-if="!loading" class="post-skeleton">
      <user-post v-for="post in posts" :key="post.id" :post="post" :linkToProfile="link2ProfileDis" />
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
  props: {
    posts: { default: [] },
    loading: { default: false },
    link2ProfileDis: { default: false },
  },
};
</script>

<style></style>
