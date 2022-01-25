<template>
    <div class="sticky top-16 z-20 flex flex-col bg-white py-4" >
            <div class="placeholder-new-post relative z-5">
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
                    <horizontal-bar />
                    <!-- Feelings Section -->
                    <div class="photos flex justify-end pt-3 px-2">
                        <div class="flex space-x-2">
                            <div class="font-semibold">I am feeling </div>
                            <div class="">
                            <input type="text" list="feelings" placeholder="Start typing ..." class="border border-gray-200 pl-2 rounded-lg" />
                            <datalist id="feelings">
                                <option value="Lucky"></option>
                                <option value="Charming"></option>
                                <option value="Cool"></option>
                                <option value="Happy"></option>
                                <option value="Broken"></option>
                            </datalist>
                            </div>
                            <div class="font-semibold"> today .</div>
                        </div>
                    </div>
                    <!-- Activities Section -->
                    
                    <div class="activities flex justify-end py-3 px-2">
                        <div class="flex space-x-2">
                            <div class="font-semibold">I am  </div>
                            <div class="">
                            <input type="text" list="activities" placeholder="Start typing ..." class="border border-gray-200 pl-2 rounded-lg" />
                            <datalist id="activities">
                                <option value="Watching a movie"></option>
                                <option value="Snoring"></option>
                                <option value="Cooking"></option>
                                <option value="Dancing"></option>
                                <option value="Cycling"></option>
                            </datalist>
                            </div>
                            <div class="font-semibold"> today .</div>
                        </div>
                    </div>
                    
                    <!-- Photos Section -->
                    <div class="photos flex space-x-2 py-3 px-2">
                        <div 
                            v-for="w in 5"
                            :key="w"
                            class="single-photo h-20 w-20 px-2 flex items-start justify-end rounded-lg" 
                            style="background:url(https://picsum.photos/id/101/600/600) center no-repeat; background-size:cover;"
                        >
                            <button class="remove"><icon name="times" /> </button>
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
                </div>  
                </div> 
            </div>
            <div class="z-10 newPostContainer flex flex-col bg-gradient-to-tr from-blue-600 via-rose-500 to-yellow-300 rounded-xl p-1 mt-2 cursor-pointer">
                
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