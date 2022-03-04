<template>
  <!-- bg-gradient-to-tl from-gray-300 to-gray-200 -->
  <div
    class="overflow-hidden post flex flex-col w-full bg-white shadow-md border border-gray-200 mb-2 last:mb-0 rounded-md"
  >
    <post-header
      :linkDisabled="linkToProfile"
      :postUser="post.user"
      :createdAt="post.created_at"
      :updatedAt="post.updated_at"
      @delete-post="deleteThisPost(post)"
    />
    <post-content :post="post" />
    <post-footer :post="post" />
    <modal
      style="margin-top: -360px; z-index: 90"
      headerTitle="Delete Post"
      animation="zoom"
      :showModal="deletePostAlert"
      @close-modal="deletePostAlert = false"
      width="300"
      position="relative"
      overlayHeight="365"
    >
      <div class="flex flex-col py-2">
        <div class="text-md text-gray-800">
          This action is irreversible.<br />It will delete the post parmanently.
        </div>
        <div class="font-semibold text-lg"></div>
      </div>
      <template #modal-footer>
        <div class="bg-transparant py-2">
          <div class="flex space-x-2 justify-end">
            <button
              @click="deletePostFinally"
              class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1"
            >
              Yes, I know
            </button>
            <button
              class="bg-white text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-1"
              @click="deletePostAlert = false"
            >
              No
            </button>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { axiosPost } from '~/helpers/axiosHelpers';
import Modal from "../Modal/Modal.vue";
export default {
  components: { Modal },
  name: "Post",
  props: ["post", "linkToProfile"],
  data() {
    return {
      deletePostAlert: false,
      deletePostId: "",
    };
  },
  methods :{
    async deletePostFinally(){
      let result  = await axiosPost('delete-post', {post_id : this.deletePostId});
      this.$emit('post-deleted', this.deletePostId);
      this.deletePostId = "";
      this.deletePostAlert =  false;
      this.$emit('post-deleted');
    },
    deleteThisPost(post){
      this.deletePostAlert =  true;
      this.deletePostId = post.id;
    }
  }
};
</script>

<style scoped></style>
