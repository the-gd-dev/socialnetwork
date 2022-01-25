<template>
  <div class="photos flex justify-end pt-3 px-2">
    <div class="flex space-x-2">
      <div class="font-semibold">I am feeling</div>
      <div class="">
        <input
          type="text"
          list="feelings"
          placeholder="Start typing ..."
          class="border border-gray-200 pl-2 rounded-lg"
        />
        <datalist id="feelings">
          <option value="Lucky"></option>
          <option value="Charming"></option>
          <option value="Cool"></option>
          <option value="Happy"></option>
          <option value="Broken"></option>
        </datalist>
      </div>
      <div class="font-semibold">today .</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feelings",
};
</script>

<style>
</style>