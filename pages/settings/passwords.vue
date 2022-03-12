<template>
  <settings-layout pageName="Password">
    <div class="flex flex-col md:flex-rows">
      <div class="w-full md:w-1/2 xl:w-1/2">
        <div class="text-xl font-semibold px-5 py-3 border-b">
          Change Your Password
        </div>
        <div class="px-5 py-2">
          <div class="flex flex-col">
            <label for="password" class="font-semibold text-lg text-gray-800"
              >Current Password</label
            >
            <input type="text" class="border py-2 px-4" name="" id="" />
          </div>
          <div class="flex flex-col my-4">
            <label for="password" class="font-semibold text-lg text-gray-800"
              >New Password</label
            >
            <input type="text" class="border py-2 px-4" name="" id="" />
          </div>
          <div class="flex flex-col mb-4">
            <label for="password" class="font-semibold text-lg text-gray-800"
              >Confirm Password</label
            >
            <input type="text" class="border py-2 px-4" name="" id="" />
          </div>
          <div class="flex flex-col">
            <button class="bg-blue-600 text-white py-2 px-4">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </settings-layout>
</template>
<script>
import SettingsLayout from "~/components/SettingsLayout/index.vue";
export default {
  name: "PasswordSettings",
  layout: "auth",
  components: {
    SettingsLayout,
  },
};
</script>

<style></style>
