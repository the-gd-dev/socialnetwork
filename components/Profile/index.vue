<template>
  <div class="outer-profile-container mt-3">
    <div class="flex flex-col lg:px-6">
      <!-- User Cover Image -->
      <user-cover-photo
        :thisUser="thisUser"
        @upload-new-cover="uploadOrSelectNewDP('cover')"
      />
      <div class="px-4 profile-navigation-box sticky top-16 lg:top-20 z-20">
        <div
          class="flex bg-white border border-gray-100 flex-col shadow-lg rounded-xl overflow-hidden"
        >
          <!-- User Header -->
          <header-view
            @add-friend="addFriend"
            @remove-friend-request="removeFriend"
            :isRequestSent="is_request_sent"
            :isFriend="is_friend"
            :thisUser="thisUser"
            @upload-profile-picture="uploadOrSelectNewDP('display_picture')"
          />
          
          <horizontal-bar color="#538dd5" height="1" />
          <!-- User Info Pages Tabs -->
          <profile-page-tabs :profile="profileId" :selected="displayPage" />
        </div>
      </div>
      <profile-page-contents :selectedPage="displayPage">
        <slot></slot>
      </profile-page-contents>
    </div>
    <modal
      rounded="0"
      :showFooterHeader="false"
      headerTitle="Delete Post"
      animation="slide"
      height="75%"
      width="80%"
      background=""
      overlayHeight="800"
      :showModal="uploadDisplayPictureModal"
    >
      <div class="flex flex-col py-2 justify-center items-center">
        <div
          class="flex w-full justify-between items-center px-4 border-b pb-3"
        >
          <div class="text-xl font-semibold">Update New Image/Picture</div>
          <div
            class="text-2xl font-semibold cursor-pointer"
            @click="uploadDisplayPictureModal = false"
          >
            <icon name="times" />
          </div>
        </div>
        <div
          class="user-photos-scroll flex w-full flex-wrap justify-center items-center px-0 lg:px-4 py-4 h-64 lg:h-full overflow-y-scroll lg:overflow-y-auto"
        >
          <user-media-items
            mediaType="photos"
            @photo-clicked="(photo) => (selectedPhoto = photo)"
            :select="true"
            :fetchingData="loading"
            :userMediaItems="photos"
            :selectData="selectedPhoto"
            customClasses="flex overflow-hidden w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg cursor-pointer border"
          />
          <!-- flex overflow-hidden w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-lg -->
        </div>
        <div
          v-if="photos.length > 0 || loading"
          class="flex w-full items-center py-4"
        >
          <div class="w-1/2"><HorizontalBar height="1" /></div>
          <div class="text-center">
            <span class="text-gray-800 font-semibold text-2xl">OR</span>
          </div>
          <div class="w-1/2"><HorizontalBar height="1" /></div>
        </div>
        <div class="flex" v-if="selectedPhoto.id">
          <button
            @click="choosePicture"
            for="new-profile-picture  w-full justify-center items-center"
            class="cursor-pointer hover:bg-green-600 bg-green-400 text-white py-2 px-4 text-md lg:text-xl rounded-xl"
          >
            Choose This Picture
          </button>
        </div>
        <div class="flex w-full justify-center items-center h-28">
          <input
            type="file"
            @change="(e) => uploadNewPicture(e.target.files[0])"
            id="new-profile-picture"
            class="hidden"
          />
          <label
            for="new-profile-picture"
            class="cursor-pointer hover:bg-blue-600 bg-blue-400 text-white py-2 px-4 text-md lg:text-xl rounded-xl"
          >
            Choose From Your Device
          </label>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { axiosGet, axiosPost } from "~/helpers/axiosHelpers";
import UserMediaItems from "../UserMediaItems/index.vue";
import HeaderView from "./HeaderView.vue";
import ProfilePageContents from "./ProfilePageContents.vue";
import ProfilePageTabs from "./ProfilePageTabs.vue";
import UserCoverPhoto from "./UserCoverPhoto.vue";
export default {
  components: {
    UserMediaItems,
    HeaderView,
    ProfilePageTabs,
    ProfilePageContents,
    UserCoverPhoto,
  },
  props: {
    displayPage: { default: "" },
    profileId: { default: "" },
  },
  data() {
    return {
      changeImageUploadType: "",
      loading: false,
      is_friend: false,
      is_request_sent: false,
      photos: [],
      thisUser: {},
      uploadDisplayPictureModal: false,
      selectedPhoto: {},
    };
  },
  async created() {
    if (this.profileId) {
      try {
        await this.fetchUserData();
      } catch (error) {
        this.$notify({
          type: "err",
          duration: 3000,
          title: "User Data Fetching Failed.",
          text: "Apologies from our side. We're trying again!",
        });
        await this.fetchUserData();
      }
    }
  },
  methods: {
    async fetchUserData() {
      let { data } = await axiosGet("users/" + this.profileId);
      this.is_friend = data.is_friend;
      this.is_request_sent = data.is_request_sent;
      this.thisUser = {
        ...data.user,
        user_meta: { ...data.user.user_meta, profilePicLoading: true },
      };
      this.$emit("user-data-loaded", this.thisUser);
    },
    async addFriend() {
      let { data } = await axiosPost("friends/add", { id: this.thisUser.uuid });
      this.is_request_sent = true;
    },
    async removeFriend(id) {
      if (confirm("Are you sure ?")) {
        await axiosPost("friends/remove", { id: id });
        this.is_request_sent = false;
      }
    },
    async updateNewPicture(requestPayload, config) {
      let { data } = await axiosPost("users/update", requestPayload, config);
      this.thisUser.user_meta[this.changeImageUploadType] =
        data[this.changeImageUploadType];
      this.uploadDisplayPictureModal = false;
      this.selectedPhoto = {};
      this.changeImageUploadType = "";
      this.$emit("image-updated");
    },
    async choosePicture() {
      let payload = {};
      payload[this.changeImageUploadType] = this.selectedPhoto.url;
      await this.updateNewPicture(payload);
    },
    async uploadNewPicture(file) {
      let formPayload = new FormData();
      formPayload.append("image", file);
      formPayload.append("type", this.changeImageUploadType);
      await this.updateNewPicture(formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async uploadOrSelectNewDP(type) {
      this.changeImageUploadType = type;
      this.uploadDisplayPictureModal = true;
      this.loading = true;
      let { data } = await axiosGet("photos", "userId=" + this.thisUser.uuid);
      this.photos = data.photos;
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.user-cover {
  background-size: cover !important;
  height: 300px;
  width: 100%;
}
.tabs-container .tab,
.tabs-container {
  transition: all ease-in-out 0.3s;
}
.text-shadow {
  text-shadow: 0 2px 10px rgb(255, 255, 255);
}

.text-shadow-md {
  text-shadow: 0 4px 8px rgb(255, 255, 255), 0 2px 4px rgb(255, 255, 255);
}

.text-shadow-lg {
  text-shadow: 0 15px 30px rgb(255, 255, 255), 0 5px 15px rgb(255, 255, 255);
}

.text-shadow-none {
  text-shadow: none;
}
.profile-navigation-box {
  margin-top: -195px;
}
.user-photos-scroll::-webkit-scrollbar {
  width: 5px;
}
.user-photos-scroll::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.user-photos-scroll::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
</style>
