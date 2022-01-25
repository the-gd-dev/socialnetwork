<template>
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
</template>

<script>
export default {

}
</script>

<style>

</style>