<template>
  <div class="outer-profile-container mt-3">
    <div class="flex flex-col lg:px-6">
      <div
        class="mb-12 lg:rounded-xl p-4 user-cover"
        :style="`background: url(${
          thisUser.user_meta ? thisUser.user_meta.cover : ''
        }) no-repeat center;`"
      >
        <div class="flex-w-full" v-if="thisUser.uuid === user.id">
          <button
            @click="uploadOrSelectNewDP('cover')"
            class="bg-gray-100 p-1 px-4 text-white shadow-lg rounded-full"
          >
            <icon name="edit" customClass="text-gray-800" />
            <span class="text-gray-800">Change Cover</span>
          </button>
        </div>
      </div>
      <div class="px-4 profile-navigation-box sticky top-16 lg:top-20 z-20">
        <div
          class="flex bg-white border border-gray-100 flex-col shadow-lg rounded-xl overflow-hidden"
        >
          <div class="lg:flex hidden py-4 px-4 flex-row">
            <div class="flex justify-start w-1/2">
              <div
                class="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:space-x-4"
              >
                <div class="user-picture">
                  <profile-picture
                    :linkToProfile="false"
                    :size="28"
                    :userId="thisUser.id"
                    :url="
                      thisUser.user_meta
                        ? thisUser.user_meta.display_picture
                        : ''
                    "
                    :loading="
                      thisUser.user_meta
                        ? thisUser.user_meta.profilePicLoading
                        : false
                    "
                    @loading-complete="
                      thisUser.user_meta
                        ? (thisUser.user_meta.profilePicLoading = false)
                        : true
                    "
                  />
                </div>
                <div class="user-details">
                  <div class="flex flex-col items-center lg:items-start">
                    <div class="text-xl font-semibold text-shadow py-2 lg:py-0">
                      {{ thisUser.name }}
                    </div>
                    <div
                      v-if="thisUser.user_meta"
                      class="text-lg text-shadow w-full lg:w-2/3"
                    >
                      {{ thisUser.user_meta.bio_text }}
                    </div>
                  </div>
                </div>
                <!-- <div class="w-full lg:w-2/7"></div> -->
              </div>
            </div>
            <div
              v-if="thisUser.uuid === user.id"
              class="space-x-2 w-1/2 flex items-center justify-end py-2 lg:py-0"
            >
              <button
                @click="uploadOrSelectNewDP('display_picture')"
                class="p-1 text-lg px-4 bg-gray-200 hover:bg-gray-300 px-4 text-gray-800 text-left inline rounded-full"
              >
                <icon name="edit" />
                <span>Profile Picture</span>
              </button>
              <button
                class="p-1 px-4 text-lg bg-blue-200 hover:bg-blue-300 px-4 text-blue-600 inline rounded-full"
              >
                <icon name="user-edit" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
          <!-- Mobile View -->
          <div class="lg:hidden flex py-2 px-4 flex-col lg:flex-row">
            <div class="flex flex-row justify-between items-center">
              <div
                class="user-information flex flex-row items-center space-x-2"
              >
                <div class="user-picture">
                  <profile-picture
                    :linkToProfile="false"
                    :size="16"
                    :userId="thisUser.id"
                    :url="
                      thisUser.user_meta
                        ? thisUser.user_meta.display_picture
                        : ''
                    "
                    :loading="
                      thisUser.user_meta
                        ? thisUser.user_meta.profilePicLoading
                        : false
                    "
                    @loading-complete="
                      thisUser.user_meta
                        ? (thisUser.user_meta.profilePicLoading = false)
                        : true
                    "
                  />
                </div>
                <div class="flex flex-col">
                  <div class="text-xl font-semibold">
                    {{ thisUser.name }}
                  </div>
                  <div class="text-md leading-0" v-if="thisUser.user_meta">
                    {{ thisUser.user_meta.bio_text }}
                  </div>
                </div>
              </div>
              <div
                class="flex justify-end space-x-2"
                v-if="thisUser.uuid === user.id"
              >
                <button
                  class="bg-blue-200 p-2 px-3 hover:bg-blue-300 text-blue-600 text-center inline rounded-full"
                >
                  <icon name="user-edit" />
                  <span class="hidden sm:inline">Edit Profile</span>
                </button>
                <button
                  @click="uploadOrSelectNewDP('display_picture')"
                  class="bg-gray-200 p-2 px-3 hover:bg-gray-300 text-gray-800 text-center inline rounded-full"
                >
                  <icon name="edit" />
                  <span class="hidden sm:inline">Profile Picture</span>
                </button>
              </div>
            </div>
          </div>
          <!-- Mobile View -->
          <horizontal-bar color="#538dd5" height="1" />
          <div
            class="tabs-container flex flex-col items-center lg:items-start px-4"
          >
            <div class="flex tab">
              <nuxt-link
                class="text-md lg:text-lg font-semibold py-2 px-3 border-b-2"
                v-for="tab in tabs"
                :key="tab._id"
                :to="`/${profileId}${tab._slug ? '/' + tab._slug : ''}`"
                :class="`${
                  tab._slug === displayPage
                    ? 'border-blue-400'
                    : 'border-transparent hover:bg-gray-100'
                }`"
              >
                {{ tab.title }}
                <span class="text-gray-400" v-if="tab.count">{{
                  tab.count
                }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Selected Tab Span -->
      <div v-if="displayPage !== ''" class="flex mt-2 flex-col relative">
        <div class="tab-span show p-4"><slot></slot></div>
      </div>
      <div v-else class="flex mt-2 flex-col relative px-2 lg:px-0">
        <slot></slot>
      </div>
      <!-- Selected Tab Span -->
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
export default {
  components: { UserMediaItems },
  props: {
    displayPage: { default: "" },
    profileId: { default: "" },
  },
  data() {
    return {
      changeImageUploadType: "",
      loading: false,
      photos: [],
      tabs: [
        {
          _id: 1,
          _slug: "",
          title: "About",
          customClass: "",
          count: 0,
          active: true,
        },

        {
          _id: 2,
          _slug: "friends",
          title: "Friends",
          customClass: "",
          count: 0,
          active: false,
        },
        {
          _id: 3,
          _slug: "photos",
          title: "Photos",
          customClass: "",
          count: 0,
          active: false,
        },
        {
          _id: 4,
          _slug: "videos",
          title: "Videos",
          customClass: "",
          count: 0,
          active: false,
        },
        {
          _id: 5,
          _slug: "followers",
          title: "Followers",
          customClass: "",
          count: 0,
          active: false,
        },
      ],
      thisUser: {},
      uploadDisplayPictureModal: false,
      selectedPhoto: {},
    };
  },
  async created() {
    if (this.profileId) {
      let { data } = await axiosGet("users/" + this.profileId);
      this.thisUser = {
        ...data.user,
        user_meta: { ...data.user.user_meta, profilePicLoading: true },
      };
      this.$emit("user-data-loaded", this.thisUser);
    }
  },
  methods: {
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
