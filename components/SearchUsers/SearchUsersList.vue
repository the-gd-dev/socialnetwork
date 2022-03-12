<template>
  <div v-if="loadingSearchItems">
    <div
      v-for="i in 6"
      :key="i"
      class="animate-pulse flex space-x-2 items-center py-2 pl-2"
    >
      <div class="rounded-full bg-gray-300 h-10 w-10"></div>
      <div class="flex-1 space-y-2 py-1">
        <div class="space-y-3">
          <div class="grid grid-cols-6 gap-1">
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
            <div class="h-2 bg-gray-300 rounded col-span-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ul class="list-style-none search-user-list" v-else>
    <li
      v-for="item in searchItems"
      :key="item.id"
      class="search-user-single hover:bg-gray-200"
      @click="$emit('result-click')"
    >
      <nuxt-link :to="`/${item.uuid}`">
        <div class="flex w-full justify-start items-center space-x-2">
          <profile-picture
            :linkToProfile="false"
            :url="item.user_meta.display_picture"
          />
          <div class="text-lg font-semibold">{{ item.name }}</div>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SearchUsersList",
  props: ["searchItems", "loadingSearchItems"],
};
</script>

<style scoped>
.search-user-list .search-user-single {
  padding: 4px 15px;
  cursor: pointer;
}
</style>
