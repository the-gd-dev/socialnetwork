<template>
  <profile-layout
    :profileId="userId"
    :displayPage="'videos'"
    @image-updated="getVideos"
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
        v-if="videos.length > 0 && !loading"
        class="w-full flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
      >
        <UserMediaGroups
          mediaGroupType="videos"
          :groups="photoSections"
          :loadingData="loading"
        />
      </div>
      <div
        class="w-full justify-center items-center flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
        v-else
      >
        <Icon name="file-image" size="50px" customClass="text-gray-500" />
        <div class="text-lg text-gray-500">No Videos Found</div>
        <div class="text-md text-gray-500">Upload some videos via posts.</div>
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
      videos: [],
      loading: false,
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
      console.log(payload);
      if ((payload.type = "videos")) {
        this.getVideos();
      }
    });
    await this.getVideos();
  },
  methods: {
    async fetchVideos() {
      this.loading = true;
      this.userId = this.$route.params.id;
      let { data } = await axiosGet("videos", "userId=" + this.userId);
      this.videos = data.videos;
      this.photoSections[0].items = this.videos;
      this.loading = false;
    },
    async getVideos() {
      try {
        await this.fetchVideos();
        this.posts = data.posts.data;
      } catch (error) {
        this.$notify({
          type: "err",
          duration: 3000,
          title: "User Videos Fetching Failed.",
          text: "Apologies from our side. We're trying again!",
        });
        await this.fetchVideos();
      }
    },
  },
  beforeDestroy() {
    globalEvent.$off("media-deleted");
  },
};
</script>
