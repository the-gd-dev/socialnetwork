<template>
  <settings-layout pageName="Request">
    <div class="flex flex-col md:flex-rows">
      <div class="w-full">
        <div class="text-xl font-semibold px-2 py-3 border-b">Request</div>
      </div>
    </div>
  </settings-layout>
</template>
<script>
import SettingsLayout from "~/components/SettingsLayout/index.vue";
export default {
  name: "Request",
  layout: "auth",
  components: {
    SettingsLayout,
  },
};
</script>

<style></style>
