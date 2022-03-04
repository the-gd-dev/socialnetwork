<template>
  <div class="flex flex-col lg:flex-row py-2 px-6">
    <div class="w-full lg:w-1/2">
      <div
        class="flex flex-col bg-gradient-to-tl from-gray-200 to-gray-200 lg:mb-2 last:mb-0 rounded-xl"
      >
        <div class="flex justify-between px-4">
          <div class="" v-if="post.user">
            <post-user :postUser="post.user" :postTime="post.created_at" />
          </div>
        </div>
        <!-- Post Text -->
        <div
          class="bg-gray-100 post-content flex w-full px-4"
          v-if="post.text && !post.photo"
        >
          <div class="text-3xl text-gray-800 text-center m-auto">
            {{ post.text }}
          </div>
        </div>
        <!-- Post Content -->
        <div
          class="flex items-center justify-center overflow-hidden"
          v-if="post.photo"
        >
          <div class="m-auto" v-if="post.photo.loading">
            <spinner spinnerSize="spinner-2xl" />
          </div>
          <div>
            <img
              :src="post.photo.url"
              @load="post.photo.loading = false"
              alt=""
              srcset=""
              :class="`image ${post.photo.loading ? '' : 'loaded'}`"
            />
          </div>
        </div>
        <!-- Post Footer -->
        <div class="post-footer px-4 py-2 flex justify-center w-full">
          <div class="flex space-x-3 items-center justify-center w-full">
            <div class="w-1/7">
              <div
                class="px-3 rounded-full bg-white flex justify-center items-center"
              >
                <Reactions />
              </div>
            </div>

            <div class="w-1/7">
              <button
                class="flex bg-white h-8 mr-1 bg-gray-800 space-x-2 text-white px-4 items-center rounded-full"
                type="button"
              >
                <icon type="fa-solid" name="face-smile" />
                <div>Sticker React</div>
              </button>
            </div>
            <div class="w-1/7">
              <button
                class="flex bg-white h-8 mr-1 bg-gray-800 space-x-2 text-white px-4 items-center rounded-full"
                type="button"
              >
                <icon type="fa-solid" name="share-nodes" />
                <div>Share</div>
              </button>
            </div>
          </div>
        </div>
        <!-- <post-footer :post="post" shareBtnTitle="true" /> -->
      </div>
    </div>
    <div class="w-full lg:w-1/2 lg:pl-6">
      <div class="comments-section">
        <div class="comments-section-header py-2">
          <form
            @submit.prevent="postComment"
            class="add-comment-form flex items-center space-x-2"
          >
            <input
              required
              placeholder="Write a comment..."
              type="text"
              v-model="comment"
              class="border pl-2 border-gray-400 w-full rounded-xl"
              :style="{ height: '40px' }"
            />
            <button
              class="bg-blue-400 hover:bg-blue-600 text-white rounded-xl p-2"
            >
              Comment
            </button>
          </form>
        </div>
        <div class="comments-section-body">
          <div class="flex justify-end items-center" v-if="commentsCount > 0">
            <div class="text-md font-semibold text-gray-700">
              {{
                commentsCount > 1
                  ? commentsCount + " Comments"
                  : commentsCount + " Comment"
              }}
            </div>
          </div>
          <div class="post-comments-container-wrap-scroll" v-if="post.id">
            <post-comments
              :reload="reloadComments"
              :postId="post.id"
              @comments-loaded="loadCommentsHandler"
            />
            <div class="flex justify-center">
              <button
                @click="reloadComments = true"
                class="bg-blue-200 text-blue-600 px-6 py-2 text-sm rounded-full flex space-x-2"
              >
                <div v-if="commentsCount > 0">Load more comments ...</div>
                <div v-else>refresh comments</div>
                <div>
                  <icon name="refresh" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import PostComments from "~/components/Comments/PostComments.vue";
import SinglePost from "~/components/Post/index.vue";
import PostFooter from "~/components/Post/PostFooter.vue";
import PostUser from "~/components/Post/PostUser.vue";
import Spinner from "~/components/Spinner.vue";
import { axiosGet, axiosPost } from "~/helpers/axiosHelpers";
export default {
  components: { SinglePost, PostFooter, PostUser, Spinner, PostComments },
  layout: "auth",
  data() {
    return {
      reloadComments: false,
      comment: "",
      commentsCount: 0,
      post: {
        photo: {},
      },
    };
  },
  async created() {
    let postId = this.$route.params.id;
    let { data } = await axiosGet("posts/" + postId);
    this.post = data.post;
  },
  methods: {
    loadCommentsHandler(count) {
      this.commentsCount = count;
      this.reloadComments = false;
    },
    async postComment() {
      const { result } = await axiosPost("comments/add", {
        comment: this.comment,
        post_id: this.post.id,
      });
      this.comment = "";
      this.reloadComments = true;
    },
  },
};
</script>
<style scoped>
.post-content {
  min-height: 250px;
}
.post-content-img {
  min-height: 400px;
}

.post-content .image.loaded {
  filter: blur(0px);
}
.post-content .image {
  /* filter: blur(10px); */
  transition: all ease-in-out 0.3s;
}
</style>
