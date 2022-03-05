<template>
  <div class="flex flex-col sticky top-20 z-999">
    <div class="flex">
      <div class="inline-flex space-x-3 bg-white p-1 rounded-full">
        <button
          @click="() => toggleCreateOptions('post')"
          class="bg-gradient-to-tr from-rose-500 to-yellow-300 rounded-full p-2 px-3 text-white"
        >
          <icon name="pencil" customClass="text-white" /> Create Post
        </button>
        <!-- <button @click="toggleCreateOptions('story')" class="bg-gradient-to-tr from-blue-500 to-sky-300 rounded-full p-2 text-white"><icon name="circle-o" customClass="text-white" /> New Story</button> -->
      </div>
    </div>
    <div
      class="flex flex-col bg-white newPostContainer rounded-xl"
      :class="showPostForm ? 'show' : ''"
    >
      <div class="relative z-5 p-1">
        <div
          class="flex flex-col bg-gradient-to-tl from-rose-500 to-yellow-300 rounded-xl p-2"
        >
          <!-- <h2 class="text-lg mb-2 text-white cursor-pointer"><icon name="plus-circle" customClass="text-white" /> New Post</h2> -->
          <div class="z-5 bg-white rounded-xl overflow-hidden">
            <div class="">
              <textarea
                class="text-gray-800 p-2 cursor-text h-20 w-full caption-textarea"
                placeholder="What's going around you ..."
                v-model="post.text"
              ></textarea>
              <input
                class="hidden"
                @change="(e) => uploadPhotos(e.target.files)"
                type="file"
                name="files"
                multiple
                accept="image/*"
                id="sn-photo"
                maxlength="5"
              />
            </div>
            <div
              class="flex z-10 space-x-2 justify-end items-baseline px-2 py-2 border-top"
            >
              <label
                for="sn-photo"
                class="transition add-post-action cursor-pointer px-2 rounded-lg bg-green-200 text-green-900 hover:bg-green-500 hover:text-white"
                ><icon name="camera" customClass="" /> Add Photos</label
              >
              <!-- <button class="transition add-post-action  px-2 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-500 hover:text-white"><icon name="video" customClass="" /> Video</button>
                <button class="transition add-post-action  px-2 rounded-lg bg-yellow-200 text-yellow-900 hover:bg-yellow-500 hover:text-white"><icon name="face-smile" customClass="" /> Feelings</button>
                <button class="transition add-post-action  px-2 rounded-lg bg-blue-200 text-blue-900 hover:bg-blue-500 hover:text-white"><icon name="person-running" customClass="" /> Activity</button> -->
            </div>
            <!-- <horizontal-bar /> -->
            <!-- Feelings Section -->
            <!-- Activities Section -->
            <!-- Photos Section -->
            <uploaded-photos
              @remove-image="removeImage"
              :images="uploaded_photos"
            />
          </div>
          <div class="bg-transparant pt-2">
            <div class="flex space-x-2 justify-end">
              <button
                @click="submitPost"
                class="text-white rounded-lg px-4 py-1 new-post-btn"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosPost } from "~/helpers/axiosHelpers";
import { globalEvent } from "~/helpers/globalEvent";
import UploadedPhotos from "./UploadPhotos.vue";
export default {
  components: { UploadedPhotos },
  name: "CreatePost",
  data() {
    return {
      posting: false,
      showPostForm: false,
      showStoryCreate: false,
      uploaded_photos: [],
      post: {
        text: "",
        photos: [],
        videos: [],
      },
    };
  },
  methods: {
    removeImage(id) {
      if (confirm("are you sure ?")) {
        this.uploaded_photos = this.uploaded_photos.filter(
          (photo) => photo.id != id
        );
      }
    },
    async uploadPhotos(files) {
      this.uploaded_photos = [];
      if (files.length > 5) {
        return alert("only 5 images allowed per post.");
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.uploaded_photos.push({
            id: i + 1,
            url: URL.createObjectURL(file),
          });
          this.post.photos.push(file);
        }
      }
    },
    async submitPost() {
      let createStatus =
        this.post.text ||
        this.post.photos.length > 0 ||
        this.post.videos.length;
      if (!createStatus) {
        return alert("Can't create an empty post.");
      } else {
        this.posting = true;
        try {
          let requestPayload = new FormData();
          requestPayload.append("text", this.post.text);
          for (var i = 0; i < this.post.photos.length; i++) {
            let file = this.post.photos[i];
            requestPayload.append("photos[" + i + "]", file);
          }
          requestPayload.append("videos[]", this.post.videos);
          let response = await axiosPost("posts/create", requestPayload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.showPostForm = !this.showPostForm;
          globalEvent.$emit("overlay", { toggle: this.showPostForm });
          this.resetPost();
          this.$emit("post-created");
        } catch (response) {}
        this.posting = false;
      }
    },
    resetPost() {
      this.uploaded_photos = [];
      this.post = {
        text: "",
        photos: [],
        videos: [],
      };
    },
    toggleCreateOptions(type) {
      this.resetPost();
      if (type === "post") {
        this.showStoryCreate = false;
        this.showPostForm = !this.showPostForm;
        globalEvent.$emit("overlay", { toggle: this.showPostForm });
      }
      if (type === "story") {
        this.showPostForm = false;
        this.showStoryCreate = !this.showStoryCreate;
      }
    },
  },
};
</script>

<style scoped>
.post-content {
  min-height: 500px;
}
.caption-textarea {
  resize: none;
  outline: none !important;
  border: none !important;
}
.newPostContainer.show {
  /* max-height: 100%; */
  /* max-width: 100%; */
  opacity: 1;
  display: flex;
}
.newPostContainer {
  display: none;
  flex-wrap: nowrap;
  /* max-height: 0px; */
  /* max-width: 0px; */
  /* opacity: 0; */
  overflow: hidden;
  z-index: 999;
  transition: all ease-in-out 0.3s;
}
.new-post-btn:hover {
  background: rgb(255 255 255 / 50%);
}
.new-post-btn {
  background: rgb(255 255 255 / 31%);
}
.z-999 {
  z-index: 999;
}
</style>
