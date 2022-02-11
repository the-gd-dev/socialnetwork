<template>
  <div class="bg-gray-100 shadow-md border border-gray-200 rounded-xl py-2">
    <div>
      <new-people />
    </div>
  </div>
</template>

<script>
import NewPeople from "./NewPeople.vue";
export default {
  name: "FindPeople",
  components: { NewPeople },
  data() {
    return {
      showRequests: false,
    };
  }
};
</script>
