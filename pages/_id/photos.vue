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
        v-if="photos.length > 0 && !loading"
        class="w-full flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
      >
        <UserMediaGroups
          mediaGroupType="photos"
          :groups="photoSections"
          :loadingData="loading"
        />
      </div>
      <div
        class="w-full justify-center items-center flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
        v-else
      >
        <Icon name="file-image" size="50px" customClass="text-gray-500" />
        <div class="text-lg text-gray-500">No Photos Found</div>
        <div class="text-md text-gray-500">
          Upload some photos/profile pictures.
        </div>
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
      loading: false,
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
      console.log(payload);
      if ((payload.type = "photos")) {
        this.getPhotos();
      }
    });
    await this.getPhotos();
  },
  methods: {
    async fetchPhotos() {
      this.loading = true;
      this.userId = this.$route.params.id;
      let { data } = await axiosGet("photos", "userId=" + this.userId);
      this.photos = data.photos;
      this.photoSections[0].items = this.getProfilePictures();
      this.photoSections[1].items = this.getUserUploads();
      this.loading = false;
    },
    async getPhotos() {
      try {
        await this.fetchPhotos();
        this.posts = data.posts.data;
      } catch (error) {
        this.$notify({
          type: "err",
          duration: 3000,
          title: "User Photos Fetching Failed.",
          text: "Apologies from our side. We're trying again!",
        });
        await this.fetchPhotos();
      }
    },
    getProfilePictures() {
      return this.photos.filter((p) => !p.post_id);
    },
    getUserUploads() {
      return this.photos.filter((p) => !!p.post_id);
    },
  },
  beforeDestroy() {
    globalEvent.$off("media-deleted");
  },
};
</script>
