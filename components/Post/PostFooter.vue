<template>
  <div class="post-footer px-4 py-2">
    <div class="flex space-x-2 items-center">
      <div class="1/3"><post-reactions /></div>
      <div class="1/3">
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
      <div class="1/3">
        <button
          class="flex-shrink-0 bg-white w-10 h-8 mr-1 bg-gray-800 text-white rounded-full"
          type="button"
        >
          <icon type="fa-solid" name="share-nodes" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'PostFooter'
};
</script>

<style></style>
