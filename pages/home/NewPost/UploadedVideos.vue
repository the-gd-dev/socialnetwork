<template>
  <div class="photos flex space-x-2 py-3 px-2" v-if="videos.length > 0">
    <div
      v-for="file in videos"
      :key="file.id"
      class="single-photo h-full w-full p-1 flex items-start justify-end rounded-lg"
    >
      <video class="rounded-xl" :src="file.url" controls></video>
      <button
        @click="$emit('remove-video', file.id)"
        class="bg-white text-gray-800 text-3xl h-10 w-10 px-3 mr-2 mt-2 rounded-full flex justify-center items-center absolute"
      >
        <icon name="times" /> 
        <!-- <span class="hidden lg:inline ml-2"> remove</span> -->
        
      </button>
    </div>
    <!-- <div 
            class="single-photo h-20 w-20 px-2 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-lg" 
        >
            <div class="flex flex-col items-center justify-center font-semibold leading-tight">
                <span>View</span>
                <span>10 <icon name="plus" /></span>
                <span>more.</span>
            </div>
        </div> -->
  </div>
</template>

<script>
export default {
  name: "UploadedVideos",
  props: {
    videos: { default: [] },
  },
};
</script>

<style></style>
