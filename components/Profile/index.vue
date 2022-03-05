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
            class="bg-gray-100 p-1 px-4 text-white shadow-lg rounded-full"
          >
            <icon name="edit" customClass="text-gray-800" />
            <span class="text-gray-800">Change Cover</span>
          </button>
        </div>
      </div>
      <div class="px-4 profile-navigation-box sticky top-16 lg:top-20 z-20">
        <div
          class="flex bg-white border border-gray-100 flex-col shadow-lg rounded-xl"
        >
          <div class="lg:flex hidden py-4 px-4 flex-col lg:flex-row">
            <div class="flex justify-center lg:justify-start w-full lg:w-2/3">
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
              class="w-full space-x-2 lg:w-1/3 flex items-center justify-center lg:justify-end py-2 lg:py-0"
            >
              <button
                class="p-1 text-lg px-4 bg-gray-200 hover:bg-gray-300 px-4 text-gray-800 text-left inline rounded-full"
              >
                <icon name="edit" />
                <span>Profile Picture</span>
              </button>
              <button
                class="p-1 px-4 text-lg bg-blue-200 hover:bg-blue-300 px-4 text-blue-600 inline rounded-full"
              >
                <icon name="user-edit"  />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
          <!-- Mobile View -->
          <div class="lg:hidden flex py-2 px-4 flex-col lg:flex-row">
            <div class="flex flex-row justify-between items-center">
              <div class="user-information flex flex-row items-center space-x-2">
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
              <div class="flex justify-end space-x-2" v-if="thisUser.uuid === user.id">
                <button
                  class="bg-blue-200 p-2 px-3 hover:bg-blue-300 text-blue-600 text-center inline rounded-full"
                >
                  <icon name="user-edit" />
                  <span class="hidden md:inline">Edit Profile</span>
                </button>
                <button
                  class="bg-gray-200 p-2 px-3 hover:bg-gray-300 text-gray-800 text-center inline rounded-full"
                >
                  <icon name="edit" />
                  <span>Profile Picture</span>
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
                class="text-lg font-semibold py-2 px-3 border-b-2"
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
    </div>
  </div>
</template>

<script>
import { axiosGet } from "~/helpers/axiosHelpers";
export default {
  props: {
    displayPage: { default: "" },
    profileId: { default: "" },
  },
  data() {
    return {
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
</style>
