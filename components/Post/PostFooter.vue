<template>
  <div class="post-footer px-3 flex flex-col justify-center w-full">
    <div class="flex justify-between items-center w-full mt-2">
      <div
        class="flex space-x-1 justify-start items-center"
        v-if="totalRxnsCount > 0"
      >
        <div class="flex">
          <label v-for="rxn in rxns" :key="rxn.id" :class="rxn.customClass">
            <div
              class="flex items-center h-10"
              v-if="post.ReactionCounter[rxn.label.toLowerCase()] > 0"
            >
              <icon :name="rxn.name" :size="'22px'" />
            </div>
          </label>
        </div>
        <strong class="text-bold text-md">{{ totalRxnsCount }}</strong>
      </div>
      <div class="flex" v-if="post.CommentsCount > 0">
        <strong class="text-bold text-md">{{
          post.CommentsCount > 1
            ? post.CommentsCount + " comments"
            : post.CommentsCount + " comment"
        }}</strong>
      </div>
    </div>
    <div class="flex justify-between items-center w-full mb-2">
      <div>
        <div class="rounded-full bg-white flex justify-center items-center">
          <Reactions
            @reaction="(v) => $emit('reaction-handler', v)"
            :selected="postReaction"
          />
        </div>
      </div>
      <div class="w-4/6">
        <form class="w-full max-w-lg">
          <div
            class="flex items-center rounded-full overflow-hidden bg-white border border-gray-200"
          >
            <input
              class="appearance-none bg-transparent w-full text-gray-800 mr-3 py-2 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Write a comment ..."
              aria-label="Full name"
            />
            <button
              class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 w-16 lg:w-24 h-8 mr-1 text-white rounded-full"
              type="button"
            >
              <span class="inline lg:hidden"><Icon name="check-circle" /></span>
              <span class="hidden lg:inline">comment</span>
              
            </button>
          </div>
        </form>
      </div>
      <div class="w-1/7">
        <button
          class="flex bg-white h-8 mr-1 bg-gray-800 space-x-2 text-white px-4 items-center rounded-full"
          type="button"
        >
          <icon type="fa-solid" name="share-nodes" />
          <div v-if="shareBtnTitle">Share</div>
        </button>
      </div>
    </div>
    <div
      class="flex flex-col w-full my-2 border-t"
      v-if="post.comments.length > 0"
    >
      <div
        class="comment flex justify-between items-center"
        :key="comment.id"
        v-for="comment in post.comments"
      >
        <div class="flex items-center space-x-2 py-2">
          <div class="flex">
            <profile-picture
              size="35"
              :userId="comment.user.uuid"
              :url="comment.user.user_meta.display_picture"
            />
          </div>
          <div class="comment-text flex flex-col leading-1">
            <div class="leading-tight">{{ comment.text }}</div>
            <div class="text-gray-500 text-sm leading-tight">
              {{ formatTimeToHuman(comment.updated_at || comment.created_at) }}
            </div>
          </div>
        </div>
        <div class="comment-actions" v-if="user.id === comment.user.uuid">
          <button
            class="bg-red-200 hover:bg-red-500 hover:text-white text-sm text-red-500 py-1 px-2 rounded-lg"
          >
            <Icon name="trash" />
          </button>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="bg-blue-200 text-blue-500 mt-2 rounded-full px-2 py-1 text-sm"
        >
          <Icon name="refresh" />
          Load Comments
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFooter",
  props: ["shareBtnTitle", "postReaction", "post"],
  data() {
    return {
      rxns: [],
    };
  },
  computed: {
    totalRxnsCount() {
      var total = 0;
      for (const key in this.post.ReactionCounter) {
        total += parseInt(this.post.ReactionCounter[key]);
      }
      return total;
    },
  },
  created() {
    this.rxns = this.$store.getters["utility/getReactions"].slice();
  },
};
</script>

<style scoped>
.comment:not(:last-child) {
  border-bottom: solid 1px #e0e0e0;
}
</style>
