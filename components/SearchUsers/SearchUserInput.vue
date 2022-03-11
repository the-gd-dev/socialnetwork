<template>
  <div class="flex lg:flex-col w-full lg:w-96 relative">
    <div class="relative hidden lg:flex items-center  h-10 overflow-hidden border">
      <input
        @input="getUsersOnSearch"
        v-model.trim="searchQuery"
        type="text"
        name="browser"
        id="users"
        style="border:none !important; outline:none;"
        class="h-full w-full px-2 text-md"
      />
      <button class="bg-gray-100 text-gray-600 absolute right-0 py-2 px-3 border-l">
        <Icon name="search" size="20px" />
      </button>
    </div>
   
  </div>
</template>

<script>
import { axiosGet } from "~/helpers/axiosHelpers";
import { globalEvent } from "~/helpers/globalEvent";
export default {
  name: "SearchUsers",
  data() {
    return {
      searchQuery: "",
      loading: false,
    };
  },
  created() {
    globalEvent.$on("container-clicked", () => {
      this.searchQuery = "";
    });
  },
  methods: {
    async getUsersOnSearch() {
      if (!this.searchQuery) return this.$emit("search-complete", []);
      this.loading = true;
      this.$emit("searching");
      try {
        const { data } = await axiosGet("users/search/" + this.searchQuery);
        this.$emit("search-complete", data.users);
      } catch (error) {
        this.$emit("search-complete", []);
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.search-user-list .search-user-single {
  padding: 4px 15px;
  cursor: pointer;
}
.search-users-list-wrap.show {
  display: block;
}
.search-users-list-wrap {
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
}
.search-users-list-wrap::-webkit-scrollbar {
  width: 5px;
}
.search-users-list-wrap::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.search-users-list-wrap::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
.search-user-list {
}
.top-18 {
}
.z-910 {
  z-index: 1000;
}
</style>
