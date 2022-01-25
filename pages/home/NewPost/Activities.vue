<template>
  <div class="activities flex justify-end py-3 px-2">
    <div class="flex space-x-2">
      <div class="font-semibold">I am</div>
      <div class="">
        <input
          type="text"
          list="activities"
          placeholder="Start typing ..."
          class="border border-gray-200 pl-2 rounded-lg"
        />
        <datalist id="activities">
          <option value="Watching a movie"></option>
          <option value="Snoring"></option>
          <option value="Cooking"></option>
          <option value="Dancing"></option>
          <option value="Cycling"></option>
        </datalist>
      </div>
      <div class="font-semibold">today .</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>