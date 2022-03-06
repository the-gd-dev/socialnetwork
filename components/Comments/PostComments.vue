<template>
  <div class="flex flex-col post-comments-container">
    <!-- Comments Skeleton -->
    <!-- Actual Comments -->
    <div class="flex flex-col" v-if="loadingComments">
      <comment-skeleton v-for="comment in 2" :key="comment.id" />
    </div>
    <div v-else class="flex flex-col">
      <comment
      :actions="comment.user.uuid === user.id || postOwner.uuid === user.id"
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import { axiosGet } from "~/helpers/axiosHelpers";
import Comment from "./Comment.vue";
import CommentSkeleton from "./CommentSkeleton.vue";
export default {
  components: { Comment, CommentSkeleton },
  props: {
    reload: { default: false },
    postId: { default: null },
    postOwner: { default: null },
  },
  data() {
    return {
      loadingComments: false,
      comments: [],
    };
  },
  async created() {
    this.loadingComments = true;
    if (!this.postId) return false;
    const { data } = await axiosGet("comments/all", "post_id=" + this.postId);
    this.comments = data.comments.data;
    this.$emit("comments-loaded",  data.comments.total);
    this.loadingComments = false;
  },
  watch: {
    async reload(v) {
      if (v) {
        const { data } = await axiosGet(
          "comments/all",
          "post_id=" + this.postId
        );
        this.comments = data.comments.data;
        this.$emit("comments-loaded", data.comments.total);
      }
    },
  },
};
</script>

<style></style>
