<template>
    <div class="sticky top-16 z-20 flex flex-col bg-white py-4">
        <div class="flex flex-col bg-gradient-to-tr from-blue-600 via-rose-500 to-yellow-300 rounded-xl p-2 cursor-pointer">
        <h2 class="text-lg font-semibold mb-2 text-white"><icon name="plus-circle" customClass="text-white" /> Add New Post</h2>
        <div class="z-5 fake-text-area  bg-white rounded-lg">
            <div class="text-lg text-gray-500 font-semibold p-2 cursor-text h-16">
            What's going around you ...
            </div>
            <div class="flex z-10 space-x-2 justify-end items-baseline px-2 py-2">
            <button class="transition add-post-action px-2 rounded-lg bg-green-200 text-green-900 hover:bg-green-500 hover:text-white"><icon name="camera" customClass="" /> Photo</button>
            <button class="transition add-post-action px-2 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-500 hover:text-white"><icon name="video" customClass="" /> Video</button>
            <!-- <button><icon name="circle" customClass="" /> </button> -->
            <button class="transition add-post-action px-2 rounded-lg bg-yellow-200 text-yellow-900 hover:bg-yellow-500 hover:text-white"><icon name="face-smile" customClass="" /> Feelings</button>
            <button class="transition add-post-action px-2 rounded-lg bg-blue-200 text-blue-900 hover:bg-blue-500 hover:text-white"><icon name="person-running" customClass="" /> Activity</button>
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

<style>

</style>