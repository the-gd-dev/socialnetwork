<template>
  <div class="photos flex space-x-2 py-3 px-2" v-if="images.length > 0">
    <div
      v-for="file in images"
      :key="file.id"
      class="single-photo h-20 w-20 px-2 flex items-start justify-end rounded-lg"
      :style="`
        background: url(${file.url}) center no-repeat;
        background-size: cover;
      `"
    >
      <button @click="$emit('remove-image', file.id)" class="remove"><icon name="times" /></button>
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
  name: "UploadPhotos",
  props: {
    images: { default: [] },
  },
};
</script>

<style></style>
