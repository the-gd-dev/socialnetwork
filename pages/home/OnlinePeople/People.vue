<template>
  <div
    class="people-wrapper bg-gradient-to-tl from-gray-200 to-gray-100 rounded-xl"
  >
    <div class="header flex justify-between px-4 py-2">
      <h5 class="font-semibold">People</h5>
      <div class="count font-semibold">{{ users.length || 0 }}</div>
    </div>
    <horizontal-bar />
    <div class="flex flex-col space-y-2 people-container">
      <div class="loading" v-if="loading">
        <person-skeleton v-for="user in 10" :key="user" />
      </div>
      <div v-else>
        <person v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import Person from "~/components/Person/Person.vue";
import PersonSkeleton from "~/components/Person/PersonSkeleton.vue";
export default {
  components: { Person, PersonSkeleton },
  data() {
    return {
      loading: false,
      users: [],
    };
  },
  async created() {
  },
};
</script>

<style scoped>
.text-md {
  font-size: 1rem;
}
.horizontal-bar {
  height: 2px;
  background: linear-gradient(90deg, transparent, rgb(65, 65, 65), transparent);
}
/* .people-container .person:hover {
    background: #cfcfcf;
} */
.people-container {
  height: 715px;
  overflow-y: auto;
  overflow-x: hidden;
}
.people-container::-webkit-scrollbar {
  width: 5px;
}
.people-container::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.people-container::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
</style>
