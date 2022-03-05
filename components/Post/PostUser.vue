<template>
  <div class="animate-pulse flex space-x-2 items-center py-2" v-if="loading">
    <div class="rounded-full bg-blue-300 h-10 w-10"></div>
    <div class="flex-1 space-y-2 py-1">
      <div class="h-2 bg-blue-300 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-2 bg-blue-300 rounded col-span-4"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-content items-center space-x-2 py-1">
    <div class="flex">
      <Icon
        v-if="!thisUser.user_meta.display_picture"
        name="user-circle"
        size="34px"
        customClass="text-gray-600"
      />
      <profile-picture
        v-else
        :linkToProfile="!linkToProfileDisable"
        :userId="thisUser.uuid"
        :url="thisUser.user_meta.display_picture"
        :loading="thisUser.user_meta.profilePicLoading"
        @loading-complete="thisUser.user_meta.profilePicLoading = false"
      />
    </div>
    <div class="flex flex-col space-y-0">
      <div
        v-if="!linkToProfileDisable"
        class="text-md font-semibold leading-4 text-gray-600"
      >
        <nuxt-link :to="`/${thisUser.uuid}`" class="">{{
          thisUser.name
        }}</nuxt-link>
      </div>

      <div v-else class="text-md font-semibold leading-4 text-gray-600">
        {{ thisUser.name }}
      </div>

      <div class="text-sm text-gray-500">{{ formatTimeToHuman(postTime) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostUser",
  props: ["userId", "postTime", "postUser", "linkToProfileDisable"],
  data() {
    return {
      loading: true,
      thisUser: {
        user_meta: {
          profilePicLoading: true,
        },
      },
    };
  },
  async created() {
    this.loading = true;
    if (!this.userId) {
      this.thisUser = {
        ...this.postUser,
        user_meta: { ...this.postUser.user_meta, profilePicLoading: true },
      };
    } else {
      await this.getUser(this.userId);
    }
    this.loading = false;
  },
  methods: {
    async getUser(id) {
      try {
        let { data } = await axiosGet("users/" + id);
        let user = data.user;
        this.thisUser = {
          ...user,
          user_meta: { ...user.user_meta, profilePicLoading: false },
        };
      } catch (response) {
        
      }
    },
  },
};
</script>

<style></style>
