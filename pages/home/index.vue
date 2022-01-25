<template>
  <div class="right-side">
    <div class="flex items-start">
      <div class="relative top-3 flex flex-col w-full md:w-1/2 xl:w-2/5 mx-6">
        <!-- user-posts -->
        <create-post @click="createPostModal = true" />
        <!-- user-posts -->
        <user-posts />
      </div>
      <div class="sticky top-20 hidden md:inline-block w-1/2 xl:w-2/5">
        <!-- Memories & Events -->
        <!-- <memories /> -->
        <!-- New Friends -->
        <find-people />
      </div>
      <div class="sticky top-20 w-1/5 ml-2 hidden xl:inline-block">
        <people />
      </div>
    </div>
    <modal 
      :showModal="createPostModal" 
      @close-modal="createPostModal = false" 
      headerTitle="Create a new post"
    >
        <div class="flex flex-col bg-gradient-to-tr from-blue-600 via-rose-500 to-yellow-300 rounded-xl p-1 mt-2 cursor-pointer">
          <div class="z-5 fake-text-area  bg-white rounded-xl overflow-hidden">
              <div class="">
                <textarea class="text-gray-800 text-lg p-2 cursor-text h-20 w-full caption-textarea" placeholder="What's going around you ..."></textarea>
              </div>
              <div class="flex z-10 space-x-2 justify-end items-baseline px-2 py-2">
                  <button class="transition add-post-action  px-3 rounded-lg bg-green-200 text-green-900 hover:bg-green-500 hover:text-white"><icon name="camera" customClass="" /> Photo</button>
                  <button class="transition add-post-action  px-3 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-500 hover:text-white"><icon name="video" customClass="" /> Video</button>
                  <!-- <button><icon name="circle" customClass="" /> </button> -->
                  <button class="transition add-post-action  px-3 rounded-lg bg-yellow-200 text-yellow-900 hover:bg-yellow-500 hover:text-white"><icon name="face-smile" customClass="" /> Feelings</button>
                  <button class="transition add-post-action  px-3 rounded-lg bg-blue-200 text-blue-900 hover:bg-blue-500 hover:text-white"><icon name="person-running" customClass="" /> Activity</button>
              </div>
              <!-- Photos Section -->
              <div class="photos py-1 flex space-x-2 py-3 px-2">
                  <div 
                    v-for="w in 4"
                    :key="w"
                    class="single-photo h-20 w-20 px-2 flex items-start justify-end rounded-lg" 
                    style="background:url(https://picsum.photos/id/101/600/600) center no-repeat; background-size:cover;"
                  >
                      <button class="remove"><icon name="times" /> </button>
                  </div>
                  <div 
                    class="single-photo h-20 w-20 px-2 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-lg" 
                  >
                      <div class="flex flex-col items-center justify-center font-semibold leading-tight">
                        <span>View</span>
                        <span>10 <icon name="plus" /></span>
                        <span>more.</span>
                      </div>
                  </div>
              </div>
          </div>  
        </div>
        <template #modal-footer>
          <div class="bg-transparant py-2">
              <div class="flex space-x-2 justify-end">
                  <button class="bg-white text-gray-800  hover:bg-gray-100 rounded-lg px-4 py-1">Discard</button>
                  <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1">Share</button>
              </div>
          </div>
        </template>
    </modal>
  </div>
</template>

<script>
import People from "./OnlinePeople/People.vue";
import UserPosts from "./Posts/UserPosts.vue";
import CreatePost from "./NewPost/CreatePost.vue";
import Memories from "./MemoriesAndEvents/Memories.vue";
import Events from "./MemoriesAndEvents/Events.vue";
import Icon from "~/components/Icon.vue";
import FindPeople from "./FindPeople/NewPeople.vue";
import Modal from "~/components/Modal/Modal.vue";
export default {
  components: {
    People,
    UserPosts,
    Icon,
    CreatePost,
    Memories,
    Events,
    FindPeople,
    Modal,
  },
  layout: "auth",
  name: "Home",
  data() {
    return {
      createPostModal: false,
    };
  },
};
</script>
<style scoped>
.post-content {
  min-height: 500px;
}
.caption-textarea{
  resize: none;
  outline:none !important;
  border:none !important;
}
</style>
