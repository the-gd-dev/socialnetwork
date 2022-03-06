<template>
  <profile-layout
    :profileId="userId"
    :displayPage="'photos'"
    @image-updated="getPhotos"
  >
    <div class="flex justify-end flex-col">
      <div
        class="w-full flex bg-white flex-col rounded-xl shadow-md border border-gray-200 justify-between"
      >
        <div class="tab-span show py-2 px-4">
          <div class="text-2xl font-semibold text-gray-800">Photos</div>
        </div>
      </div>
      <div
        class="w-full flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
      >
        <UserMediaGroups
          mediaGroupType="photos"
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
  name: "Photos",
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
          label: "Profile Pictures",
          items: [],
        },
        {
          id: 2,
          label: "Uploads",
          items: [],
        },
      ],
    };
  },
  computed: {
    profilePictures() {
      return this.getProfilePictures();
    },
    uploads() {
      return this.getUserUploads();
    },
  },
  async created() {
    globalEvent.$on("media-deleted", (payload) => {
      this.getPhotos();
    });
    await this.getPhotos();
  },
  methods: {
    async getPhotos() {
      this.loading = true;
      this.userId = this.$route.params.id;
      let { data } = await axiosGet("photos", "userId=" + this.userId);
      this.photos = data.photos;
      this.photoSections[0].items = this.getProfilePictures();
      this.photoSections[1].items = this.getUserUploads();
      this.loading = false;
    },
    getProfilePictures() {
      return this.photos.filter((p) => !p.post_id);
    },
    getUserUploads() {
      return this.photos.filter((p) => !!p.post_id);
    },
  },
};
</script>
