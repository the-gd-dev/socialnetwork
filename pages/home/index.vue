<template>
  <div class="right-side">
    <div class="flex items-start">
      <div class="relative top-3 flex flex-col w-full md:w-1/2 xl:w-2/5 mx-6">
        <div
          class="sticky top-16 z-20 flex flex-col bg-white py-4"
        >
          <div class="flex flex-col bg-gradient-to-tr from-green-600 to-green-200 rounded-xl p-2 cursor-pointer">
            <h2 class="text-lg font-semibold mb-2 text-white"><icon name="plus-circle" customClass="text-white" /> Add New Post</h2>
            <div class="z-5 fake-text-area  bg-white rounded-lg">
              <div class="text-lg text-gray-500 font-semibold p-2 cursor-text h-16">
                What's going around you ...
              </div>
              <div class="flex z-10 space-x-2 justify-end items-baseline px-2 py-2">
                <button class="add-post-action bg-gray-200 px-2 rounded-lg"><icon name="camera" customClass="" /> Photo</button>
                <button class="add-post-action bg-gray-200 px-2 rounded-lg"><icon name="video" customClass="" /> Video</button>
                <!-- <button><icon name="circle" customClass="" /> </button> -->
                <button class="add-post-action bg-gray-200 px-2 rounded-lg"><icon name="face-smile" customClass="" /> Feelings</button>
                <button class="add-post-action bg-gray-200 px-2 rounded-lg"><icon name="person-running" customClass="" /> Activity</button>
              </div>
            </div>  
          </div>
        </div>
        <!-- user-posts -->
        <user-posts />
      </div>
      <div class="sticky top-20 hidden md:inline-block w-1/2 xl:w-2/5">
        <!-- Memories & Events -->
        <div
          class="notifications-area bg-gradient-to-tl from-gray-300 to-gray-100 rounded-xl p-2"
        >
          <div>
            <div class="text-2xl font-semibold text-gray-800">
              Life moves so fast !
            </div>
            <div class="text-sm text-gray-600">
              Here are some of your memories.
            </div>
          </div>
          <div class="flex flex-col py-4">
            <div class="flex items-center flex-col text-gray-500">
              <icon type="fa-solid" name="clock-rotate-left" size="50px" />
              <div class="text-lg">No memories Found</div>
            </div>
          </div>
        </div>
        <!-- New Friends -->
        <div class="new-friends-area mt-2">
          <div>
            <div class="text-2xl font-semibold text-gray-800">
              Do I know you ?
            </div>
            <div class="text-sm text-gray-600">May be you know them.</div>
          </div>
          <div class="flex flex-col py-4"></div>
        </div>
      </div>
      <div class="sticky top-20 w-1/5 ml-2 hidden xl:inline-block">
        <people />
      </div>
    </div>
  </div>
</template>

<script>
import People from "@/components/People/index.vue";
import UserPosts from "@/components/UserPosts.vue";
import Icon from "~/components/Icon.vue";
export default {
  components: { People, UserPosts, Icon },
  layout: "auth",
  name: "Home",
};
</script>
<style scoped>
.post-content {
  min-height: 500px;
}
</style>
