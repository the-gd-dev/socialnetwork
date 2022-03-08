<template>
  <div class="flex flex-col lg:flex-row py-2 lg:px-6" v-if="post">
    <div class="w-full lg:w-1/2">
      <div
        class="flex flex-col overflow-hidden bg-white lg:mb-2 last:mb-0 lg:rounded-xl border"
      >
        <div class="flex justify-between px-4 border-b">
          <post-header
            @privacy-handler="(v) => setPrivacySettings(v, post)"
            :postUser="post.user"
            :createdAt="post.created_at"
            :postPrivacy="post.privacy_id"
            :updatedAt="post.updated_at"
            @delete-post="deleteThisPost(post)"
          />
        </div>
        <!-- Post Text -->
        <div
          class="bg-gray-100 post-content flex w-full px-4"
          v-if="post.text && post.photos.length === 0 && !post.video"
        >
          <div class="text-3xl text-gray-800 text-center m-auto">
            {{ post.text }}
          </div>
        </div>
        <!-- Post Content -->
        <div
          class="flex w-full h-full flex-col"
          v-if="post.photos.length > 0 && !post.video"
        >
          <div class="bg-white flex w-full py-2 px-2" v-if="post.text">
            <div class="text-md text-gray-600 text-center">
              {{ post.text }}
            </div>
          </div>
          <Carousel
            height="450"
            marginTop="-30"
            :postId="post.id"
            :items="post.photos"
          />
        </div>
        <div class="flex w-full h-full flex-col" v-if="post.video">
          <div class="bg-white flex w-full py-4 px-2" v-if="post.text">
            <div class="text-lg text-gray-600 text-center">
              {{ post.text }}
            </div>
          </div>
          <div class="post_content_video w-full h-full relative">
            <video
              :id="`post__video__${post.id}`"
              :src="post.video.url"
              class="w-full relative video-file"
            ></video>
            <div
              class="video-actions absolute z-20 overflow-hidden flex justify-center items-center"
              style="top: 40%; left: 45%"
            >
              <button
                id="video-play-btn"
                :class="{ active: !videoPlayState }"
                class="justify-center items-center btn-play bg-white h-20 w-20 rounded-full"
                @click="playVideo(post)"
              >
                <Icon name="play" size="25px" />
              </button>
              <button
                id="video-pause-btn"
                :class="{ active: videoPlayState }"
                class="justify-center items-center btn-pause bg-white h-20 w-20 rounded-full"
                @click="pauseVideo(post)"
              >
                <Icon name="pause" size="25px" />
              </button>
            </div>
          </div>
        </div>
        <!-- Post Footer -->
        <div class="post-footer px-4 py-2 flex justify-between w-full">
          <div class="flex space-x-3 items-center justify-start w-full">
            <div class="w-1/7 flex space-x-1 justify-start items-center">
              <div class="w-1/7">
                <div
                  class="px-3 rounded-full bg-white flex justify-center items-center"
                >
                  <Reactions
                    @reaction="(v) => setReaction(v, post)"
                    :selected="
                      post.reactions.length > 0
                        ? post.reactions[0].reaction
                        : null
                    "
                  />
                </div>
              </div>

              <!-- <div class="w-1/7">
              <button
                class="flex bg-white h-8 mr-1 bg-gray-800 space-x-2 text-white px-4 items-center rounded-full"
                type="button"
              >
                <icon type="fa-solid" name="face-smile" />
                <div>Sticker React</div>
              </button>
            </div> -->
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
          <div class="flex space-x-3 items-center justify-end w-full">
            <div
              class="w-1/7 flex space-x-1 justify-start items-center"
              v-if="totalRxnsCount > 0"
            >
              <div class="flex">
                <label
                  v-for="rxn in rxns"
                  :key="rxn.id"
                  :class="rxn.customClass"
                >
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
            <div class="w-1/7" v-if="post.CommentsCount > 0">
              <strong class="text-bold text-md">{{
                post.CommentsCount > 1
                  ? post.CommentsCount + " comments"
                  : post.CommentsCount + " comment"
              }}</strong>
            </div>
          </div>
        </div>
        <!-- <post-footer :post="post" shareBtnTitle="true" /> -->
        <PostDeleteAlert
          :marginTop="post.photos.length > 0 ? '-505px' : '-305px'"
          zIndex="90"
          :overlayHeight="post.photos.length > 0 ? 505 : 305"
          :showHide="deletePostAlert"
          @delete-post="deletePostFinally(deleteCallBack)"
          @close-delete="deletePostAlert = false"
        />
      </div>
    </div>
    <div class="w-full lg:w-1/2 lg:pl-6 px-4 lg:px-0">
      <div class="comments-section">
        <div class="comments-section-header pt-4 lg:pt-0 pb-2">
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
              :postOwner="post.user"
              :reload="reloadComments"
              :postId="post.id"
              @reload-comments="reloadComments = true"
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
  <div v-else></div>
</template>

<script>
import api from "~/api";
import PostComments from "~/components/Comments/PostComments.vue";
import SinglePost from "~/components/Post/index.vue";
import PostFooter from "~/components/Post/PostFooter.vue";
import PostUser from "~/components/Post/PostUser.vue";
import Spinner from "~/components/Spinner.vue";
import { axiosGet, axiosPost } from "~/helpers/axiosHelpers";
import { globalEvent } from "~/helpers/globalEvent";
import postActions from "~/mixin/postActions";
export default {
  mixins: [postActions],
  components: { SinglePost, PostFooter, PostUser, Spinner, PostComments },
  layout: "auth",
  data() {
    return {
      videoPlayState: false,
      reloadComments: false,
      comment: "",
      commentsCount: 0,
      post: null,
      rxns: [],
    };
  },
  async created() {
    globalEvent.$on("post-deleted", (id) => {
      this.$router.push("/home");
    });
    const response = await api.utils.reactions();
    let rxns = response.data.reactions.slice();
    this.$store.commit("utility/set_reactions", rxns);
    this.rxns = this.$store.getters["utility/getReactions"].slice();
    try {
      await this.getPostData();
    } catch (error) {
      this.$notify({
        type: "err",
        duration: 3000,
        title: "Data Fetching Failed.",
        text: "Apologies from our side. We're trying again!",
      });
      await this.getPostData();
    }
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
  methods: {
    getVideoElements(postData) {
      return {
        playBtn: document.getElementById("video-play-btn"),
        pauseBtn: document.getElementById("video-pause-btn"),
        video: document.getElementById(`post__video__${postData.id}`),
      };
    },
    pauseVideo(postData) {
      let videoElements = this.getVideoElements(postData);
      videoElements.pauseBtn.classList.add("active");
      videoElements.playBtn.classList.remove("active");
      videoElements.video.pause();
      this.videoPlayState = false;
    },
    playVideo(postData) {
      let videoElements = this.getVideoElements(postData);
      videoElements.pauseBtn.classList.remove("active");
      videoElements.playBtn.classList.add("active");
      videoElements.video.play();
      this.videoPlayState = true;
    },
    async getPostData() {
      let postId = this.$route.params.id;
      let { data } = await axiosGet("posts/" + postId);
      this.post = data.post;
    },
    deleteCallBack() {
      this.$router.push("/home");
    },
    loadCommentsHandler(count) {
      this.commentsCount = count;
      this.post.CommentsCount = count;
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
  beforeDestroy() {
    globalEvent.$off("post-deleted");
  },
};
</script>
<style scoped>
.btn-pause:hover,
.btn-play:hover {
  background: white;
}
.btn-pause,
.btn-play {
  background: rgba(255, 255, 255, 0.4);
}

.video-actions button {
  display: none;
}
.video-actions button.active {
  display: flex;
}
.post_content_video {
  cursor: pointer;
}
.post_content_video .video-actions {
  display: none;
}
.post_content_video:hover .video-actions {
  display: inline-flex;
}
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
