<template>
  <div class="post-footer px-4 py-2 flex justify-center w-full">
    <div class="flex space-x-3 items-center w-full">
      <div class="w-1/7"> 
        <div class="px-3 rounded-full bg-white flex justify-center items-center">
          <Reactions />
        </div>
      </div>
      <div class="w-4/6">
        <form class="w-full max-w-lg">
          <div class="flex items-center rounded-full overflow-hidden bg-white">
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-2 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Write a comment ..."
              aria-label="Full name"
            />
            <button
              class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 w-24 h-8 mr-1 text-white rounded-full"
              type="button"
            >
              comment
            </button>
          </div>
        </form>
      </div>
      <div class="w-1/7">
        <button
          class="flex bg-white h-8 mr-1 bg-gray-800 space-x-2 text-white px-4 items-center rounded-full"
          type="button"
        >
          <icon type="fa-solid" name="share-nodes" />
          <div v-if="shareBtnTitle"> Share </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'PostFooter',
    props : ['shareBtnTitle']
};
</script>

<style></style>
