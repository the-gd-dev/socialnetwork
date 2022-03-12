<template>
  <div class="container-full bg-black">
    <div class="flex flex-col justify-center items-center">
      <div class="navbar-container container p-8 w-full">
        <div class="flex justify-between">
          <div
            class="text-2xl font-semibold inline-flex space-x-2 justify-center items-center"
          >
            <img src="http://socialnetwork.io/logo.png" alt="freakbook" />
            <span class="text-2xl lg:text-2xl text-gray-100"
              >Freakbook</span
            >
          </div>
          <div>
            <div class="flex space-x-4">
              <a href="#" class="hidden lg:block text-white text-lg"> Help</a>
              <a href="#" class="hidden lg:block text-white text-lg">
                Support</a
              >
              <a href="#" class="hidden lg:block text-white text-lg">
                Careers</a
              >
              <a href="#" class="text-white text-lg">
                <select
                  class="bg-transparent text-lg"
                  v-model="selectedLanguage"
                >
                  <option
                    class="text-black"
                    :class="
                      selectedLanguage === lang.language ? 'bg-gray-200' : ''
                    "
                    v-for="lang in languages"
                    :key="lang.id"
                    :value="lang.language"
                  >
                    {{ lang.language }}
                  </option>
                </select>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mid Content -->
    <Nuxt />
    <!-- Mid Content -->
    <footer class="flex flex-col items-center justify-center bg-white p-6">
      <div class="text-sm font-semibold text-gray-500">
        SocialNetwork &copy;2022
      </div>
      <div class="text-sm font-bold text-gray-700 my-1">The Good Developer</div>
      <div class="flex space-x-2 text-sm font-bold text-green-400">
        <NuxtIcon /> <LaravelLumen />
      </div>
    </footer>
  </div>
</template>
<script>
import api from "~/api";
export default {
  data() {
    return {
      languages: [],
      selectedLanguage: "English",
    };
  },
  async created() {
    const { data } = await api.utils.languages("India");
    this.languages = data.languages;
  },
};
</script>
