<template>
  <profile-layout :profileId="userId" :displayPage="'friends'">
    <div class="flex justify-end flex-col">
      <div
        class="w-full flex bg-white flex-col rounded-xl shadow-md border border-gray-200 justify-between"
      >
        <div class="tab-span show py-2 px-4">
          <div class="text-lg font-semibold text-gray-900">Friends</div>
        </div>
      </div>
      <div class="w-full flex bg-white flex-col md:flex-row md:flex-wrap rounded-xl shadow-lg border border-gray-200 justify-start pr-4 py-4 mt-4">
        <div v-for="i in 50" :key="i" class="friend-wrapper w-full md:w-1/2 lg:w-1/3 xl:w-1/6 pb-4 pl-4">
          <div
            class="friend flex flex-col justify-center items-center border-2 rounded-lg border-gray-200 py-3"
          >
            <div
              class="flex overflow-hidden h-20 w-20 rounded-full items-center border-2 border-gray-400"
            >
              <img
                :src="'https://randomuser.me/api/portraits/men/1.jpg'"
                class="w-full h-full"
              />
            </div>
            <div class="text-lg font-semibold">John Doe</div>
            <div class="text-md text-center">Lorem ipsum dolor</div>
            <div class="flex flex-col space-y-2 px-4 w-full py-4">
              <button class="bg-cyan-200 w-full text-cyan-500 p-1 rounded-lg">
                <Icon name="users" />
                Friends
              </button>
              <button class="bg-cyan-200 text-cyan-500 w-full p-1 rounded-lg">
                <Icon name="image" />
                Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </profile-layout>
</template>

<script>
import ProfileLayout from "~/components/Profile/index.vue";
export default {
  name: "Friends",
  layout: "auth",
  components: { ProfileLayout },
  asyncData({ params }) {
    return { userId: params.id };
  },
};
</script>
<style scoped></style>
