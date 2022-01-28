<template>
  <div class="flex flex-col lg:flex-row py-2 px-6">
    <div class="w-full lg:w-1/2">
      <div
        class="flex flex-col bg-gradient-to-tl from-gray-200 to-gray-200 lg:mb-2 last:mb-0"
      >
        <div class="flex justify-between px-4">
          <div class="">
            <post-user :userId="post.userId" />
          </div>
        </div>
        <!-- Post Content -->
        <div class="flex items-center justify-center overflow-hidden">
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
          <div class="add-comment-form flex items-center space-x-2">
            <input
              placeholder="Write a comment..."
              type="text"
              class="border pl-2 border-gray-400 w-full rounded-xl"
              :style="{ height: '40px' }"
            />
            <button
              class="bg-blue-400 hover:bg-blue-600 text-white rounded-xl p-2"
            >
              Comment
            </button>
          </div>
          <div class="flex justify-between items-center mb-1">
            <div class="text-md font-semibold text-gray-700">{{ commentsCount }} Comments</div>
          </div>
        </div>
        <div class="comments-section-body">
          <div class="post-comments-container-wrap-scroll">
            <post-comments
              :postId="post.id"
              @comments-loaded="(count) => (commentsCount = count)"
            />
          </div>
        </div>
      </div>
      <div class="accordian">
        <div
          class="accordian-header cursor-pointer bg-gradient-to-tl from-gray-200 to-gray-200 p-2 px-4"
        >
          <div class="flex justify-between items-center">
            <h1 class="text-lg font-semibold">Post Settings</h1>
            <div class="close-open-btn-container">
              <div class="text-lg">
                <icon name="cog" />
              </div>
            </div>
          </div>
        </div>
        <div class="accordian-body"></div>
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
export default {
  components: { SinglePost, PostFooter, PostUser, Spinner, PostComments },
  layout: "auth",
  data() {
    return {
      commentsCount: 0,
    };
  },
  async asyncData({ params, $axios }) {
    const { data } = await $axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    data.photo = {
      url: `https://picsum.photos/id/10${params.id}/600/600`,
      loading: true,
    };
    return { post: data };
  },
};
</script>
<style scoped>
/* .accordian:not(:last-child) {
  margin-bottom : 1em
} */
.post-comments-container-wrap-scroll {
  /* max-height: 620px;
  overflow-y: auto;
  padding-right: 1em; */
}
</style>
