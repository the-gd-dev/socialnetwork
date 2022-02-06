<template>
  <div class="container-full bg-black">
    <div class="flex flex-col justify-center items-center">
      <div class="navbar-container container p-8 w-full">
        <div class="flex justify-between">
          <div
            class="text-2xl font-semibold inline-flex space-x-2 justify-center items-center"
          >
            <icon
              name="share-nodes"
              :size="18"
              customClass="text-gray-100 text-2xl lg:text-4xl"
            />
            <span class="text-2xl lg:text-4xl text-gray-100"
              >SocialNetwork</span
            >
          </div>
          <div>
            <div class="flex space-x-4">
              <a href="#" class="hidden lg:block text-white text-lg"> Help</a>
              <a href="#" class="hidden lg:block text-white text-lg"> Support</a>
              <a href="#" class="hidden lg:block text-white text-lg"> Careers</a>
              <a href="#" class="text-white text-lg">
                <select class="bg-transparent text-lg" v-model="selectedLanguage">
                  <option
                   class="text-black"
                   :class="selectedLanguage === lang.language ? 'bg-gray-200' : ''"
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
    <footer class="flex items-center justify-center bg-white p-8">
      This will be footer.
    </footer>
  </div>
</template>
<script>
import api from '~/api';
export default {
  data() {
    return {
      languages: [],
      selectedLanguage :'English'
    };
  },
  async created() {
    const { data } = await api.utils.languages("India");
    this.languages = data.languages;
  },
};
</script>
