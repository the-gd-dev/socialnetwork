<template>
  <profile-layout :profileId="userId" :displayPage="'photos'">
    <div class="flex justify-end flex-col">
      <div
        class="w-full flex bg-white flex-col rounded-xl shadow-md border border-gray-200 justify-between"
      >
        <div class="tab-span show py-2 px-4">
          <div class="text-lg font-semibold text-gray-900">Photos</div>
        </div>
      </div>
      <div
        class="w-full flex bg-white flex-wrap md:flex-row rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4"
      >
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="friend-wrapper w-full md:w-1/2 lg:w-1/3 xl:w-1/6 pb-4 pl-4"
        >
          <div
            class="friend flex justify-center items-center border-1 rounded-lg border-gray-200 overflow-hidden"
          >
            <div
              class="flex overflow-hidden w-96 h-96 md:w-96 md:h-96 lg:w-64 lg:h-64 rounded-lg"
              :style="`background:url(${photo.url}) no-repeat center;background-size:cover;`"
            >
              <div v-if="photo.user.uuid === user.id" class="flex justify-end space-y-2 px-4 w-full py-4">
                <button
                  class="bg-gray-100 hover:bg-gray-200 shadow-md w-8 h-8 text-gray-600 hover:text-gray-800 p-1 rounded-lg"
                >
                  <Icon name="trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
import { axiosGet } from '~/helpers/axiosHelpers';
export default {
  name: "Photos",
  layout: "auth",
  components: { ProfileLayout },
  data() {
    return {
      userId: "",
      photos: [],
    };
  },
  async created() {
    this.userId = this.$route.params.id;
    let { data } = await axiosGet("photos", "userId=" + this.userId);
    this.photos = data.photos;
  },
};
</script>
