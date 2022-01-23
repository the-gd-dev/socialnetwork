<template>
  <div class="right-side">
    <div class="flex items-start">
      <div class="relative top-3 flex items-center w-full md:w-2/5 mx-6">
        <user-posts />
      </div>
      <div
        class="sticky top-20 hidden md:inline-block w-2/5 bg-gradient-to-tl from-gray-300 to-gray-100 rounded-xl p-2"
      >
        <div class="notifications-area">
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
      </div>
      <div class="sticky top-20 w-1/5 ml-2 hidden md:inline-block">
        <people />
      </div>
    </div>
  </div>
</template>

<script>
import People from "@/components/People/index.vue";
import UserPosts from "@/components/UserPosts.vue";
export default {
  components: { People, UserPosts },
  layout: "auth",
  name: "Home",
};
</script>
<style scoped>
.post-content {
  min-height: 500px;
}
</style>
