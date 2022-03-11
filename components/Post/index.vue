<template>
  <!-- bg-gradient-to-tl from-gray-300 to-gray-200 -->
  <div
    v-if="post"
    class="overflow-hidden post flex flex-col w-full bg-white shadow-md border border-gray-200 mb-2 last:mb-0"
  >
    <post-header
      @privacy-handler="(v) => setPrivacySettings(v, post)"
      :linkDisabled="linkToProfile"
      :postUser="post.user"
      :createdAt="post.created_at"
      :postPrivacy="post.privacy_id"
      :updatedAt="post.updated_at"
      @delete-post="deleteThisPost(post)"
    />
    <post-content :post="post" />
    <post-footer
      :postReaction="
        post.reactions.length > 0 ? post.reactions[0].reaction : null
      "
      :post="post"
      @reaction-handler="(v) => setReaction(v, post)"
    />
    <PostDeleteAlert
      marginTop="-360px"
      zIndex="90"
      :showHide="deletePostAlert"
      @delete-post="deletePostFinally"
      @close-delete="deletePostAlert = false"
    />
  </div>
</template>

<script>
import Modal from "../Modal/Modal.vue";
import postActions from "~/mixin/postActions";
export default {
  components: { Modal },
  name: "Post",
  props: ["post", "linkToProfile"],
  mixins: [postActions],
};
</script>

<style scoped></style>
