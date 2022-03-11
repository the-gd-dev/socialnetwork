<template>
  <div class="bg-white border shadow-md py-2">
    <new-people />
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
  },
};
</script>
