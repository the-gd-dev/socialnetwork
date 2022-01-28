<template>
  <div class="flex flex-col post-comments-container">
    <!-- Comments Skeleton -->
    <!-- Actual Comments -->
    <div class="flex flex-col" v-if="loadingComments">
      <comment-skeleton v-for="comment in 2" :key="comment.id" />
    </div>
    <div v-else class="flex flex-col">
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import CommentSkeleton from "./CommentSkeleton.vue";
export default {
  components: { Comment, CommentSkeleton },
  props: {
    postId: { default: null },
  },
  data() {
    return {
      loadingComments: false,
      comments: [],
    };
  },
  async created() {
    this.loadingComments = true;
    await this.loadCommentsHandler();
    this.loadingComments = false;
  },
  methods: {
    async loadCommentsHandler() {
      if (!this.postId) return false;
      const { data } = await this.$axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${this.postId}&_start=0&_limit=4`
      );
      this.comments = data;
      this.$emit("comments-loaded", this.comments.length);
      console.log(data);
    },
  },
};
</script>

<style></style>
