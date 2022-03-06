<template>
  <profile-layout
    :profileId="userId"
    :displayPage="'videos'"
    @image-updated="getPhotos"
  >
    <div class="flex justify-end flex-col">
      <div
        class="w-full flex bg-white flex-col rounded-xl shadow-md border border-gray-200 justify-between"
      >
        <div class="tab-span show py-2 px-4">
          <div class="text-2xl font-semibold text-gray-800">Videos</div>
        </div>
      </div>
      <div
        class="w-full flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
      >
        <UserMediaGroups
          mediaGroupType="videos"
          :groups="photoSections"
          :loadingData="loading"
        />
      </div>
    </div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
import { axiosGet } from "~/helpers/axiosHelpers";
import UserMediaGroups from "~/components/UserMediaGroups/index.vue";
import { globalEvent } from "~/helpers/globalEvent";
export default {
  name: "Videos",
  layout: "auth",
  components: { ProfileLayout, UserMediaGroups },

  data() {
    return {
      userId: "",
      photos: [],
      loading: true,
      photoSections: [
        {
          id: 1,
          label: "Video Uploads",
          items: [],
        },
      ],
    };
  },
  async created() {
    globalEvent.$on("media-deleted", (payload) => {
      this.getVideos();
    });
    await this.getVideos();
  },
  methods: {
    async getVideos() {
      this.loading = true;
      this.userId = this.$route.params.id;
      let { data } = await axiosGet("videos", "userId=" + this.userId);
      this.photos = data.photos;
      this.photoSections[0].items = this.photos;
      this.loading = false;
    },
  },
};
</script>
