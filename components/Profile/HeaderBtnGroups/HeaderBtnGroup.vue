<template>
  <div class="flex w-full">
    <div class="flex w-full justify-end">
      <div class="space-x-2 w-full flex items-center justify-end py-2 lg:py-0">
        <header-btn
          v-if="ButtonIcon1 && ButtonTitle1"
          :customClass="ButtonIconClass1"
          @on-click="$emit('btn1-click')"
          :icon="ButtonIcon1"
          :title="ButtonTitle1"
        />
        <header-btn
          v-if="ButtonIcon2 && ButtonTitle2"
          :customClass="ButtonTitleClass2"
          @on-click="$emit('btn2-click')"
          :icon="ButtonIcon2"
          :title="ButtonTitle2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBtn from "./HeaderBtn.vue";
export default {
  name: "HeaderBtnGroup",
  components: { HeaderBtn },
  props: {
    ButtonIcon1: { default: "" },
    ButtonTitle1: { default: "" },
    ButtonIcon2: { default: "" },
    ButtonTitle2: { default: "" },
    ButtonIconClass1: { default: "" },
    ButtonTitleClass2: { default: "" },
  },
};
</script>

<style></style>
