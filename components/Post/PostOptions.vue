<template>
  <drop-popup>
    <template #drop-option>
      <Icon
        name="ellipsis"
        type="fa"
        size="18px"
        customClass="cursor-pointer"
      />
    </template>
    <template #drop-content>
      <div
        class="post-options flex flex-col bg-white text-gray-800 mr-4 w-28 py-2 rounded-lg"
      >
        <a
          href="#"
          v-for="option in userPostOptions"
          :key="option._id"
          class="hover:bg-gray-200 px-2"
        >
          <span class="mr-2"
            ><Icon
              :name="option.icon.name"
              :type="option.icon.type"
              size="16px"
          /></span>

          {{ option.title }}
        </a>
      </div>
    </template>
  </drop-popup>
</template>

<script>
export default {
  name: "PostOptions",
  data() {
    return {
      userPostOptions: [
        {
          _id: 1,
          title: "Edit",
          icon: {
            type: "fa",
            name: "pencil",
          },
        },
        {
          _id: 2,
          title: "Privacy",
          icon: {
            type: "fa",
            name: "lock",
          },
        },
        {
          _id: 3,
          title: "Delete",
          icon: {
            type: "fa",
            name: "trash",
          },
        },
      ],
    };
  },
};
</script>

<style></style>
