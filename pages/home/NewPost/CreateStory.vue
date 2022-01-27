<template>
    <div class="flex flex-col bg-white newPostContainer rounded-xl mb-4" :class="showStory ? 'show' : ''" >
        <div class="relative z-5 p-2">
                <div class="flex flex-col bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-300 rounded-xl p-2">
                <h2 class="text-lg mb-2 text-white cursor-pointer" @click="showForm = !showForm"><icon name="circle-o" customClass="text-white" /> New Story</h2>
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
                        <button class="text-white rounded-lg px-4 py-1 new-post-btn">New Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        showStory : {
            default : false
        }
    }
}
</script>

<style>

</style>