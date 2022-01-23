<template>
  <div :class="`overflow-hidden h-${size} w-${size} rounded-full`">
    <div class="m-auto" v-if="loading">
      <spinner spinnerSize="spinner-lg" />
    </div>
    <img :src="url" @load="$emit('loading-complete')" />
  </div>
</template>

<script>
export default {
    props : {
        size : {default : 10},
        url : {default : ""},
        loading : {default : false}
    }
};
</script>

<style></style>
