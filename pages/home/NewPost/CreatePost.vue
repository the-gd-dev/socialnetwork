<template>
    <div class="sticky top-16 z-20 flex flex-col bg-white py-4" >
            <div class="placeholder-new-post relative z-5">
                <div class="flex flex-col bg-gradient-to-tr from-blue-600 via-rose-500 to-yellow-300 rounded-xl p-2">
                <h2 class="text-lg font-semibold mb-2 text-white"><icon name="plus-circle" customClass="text-white" /> New Post</h2>
                <div class="z-5 bg-white rounded-xl overflow-hidden">
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
                    <!-- <horizontal-bar /> -->
                    <!-- Feelings Section -->
                    <!-- Activities Section -->
                    <!-- Photos Section -->
                </div>
                <div class="bg-transparant py-2">
                    <div class="flex space-x-2 justify-end">
                        <button class="bg-white text-gray-800  hover:bg-gray-100 rounded-lg px-4 py-1" @click="createPostModal = false">Discard</button>
                        <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1">Share</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CreatePost'
}
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
.newPostContainer{
    position: relative;
    top: -15%;
    z-index: 50;
}
</style>