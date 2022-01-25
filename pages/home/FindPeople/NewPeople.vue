<template>
  <div
    class="
      new-friends-area
      mt-2
      bg-gradient-to-tl
      from-gray-200
      to-gray-100
      rounded-xl
      py-2
    "
  >
    <div class="flex flex-col px-4">
      <div class="text-2xl font-semibold text-gray-800">Do I know you ?</div>
      <div class="text-sm text-gray-600">May be you know them.</div>
    </div>
    <horizontal-bar class="my-2" />
    <div class="flex flex-col new-people-container">
      <!-- Single Row -->
      <person
        class="pl-4"
        v-for="user in users"
        :key="user.id"
        :user="user"
        :showStatus="false"
        :showInfo="true"
        :connectOptions="true"
        @add-friend="addFriend"
        @remove-friend="removeFriend"
      />
    </div>
    <modal
      headerTitle="Remove Friend"
      animation="zoom"
      :showModal="removeFriendAlert"
      @close-modal="removeFriendAlert = false"
      width="300"
    >
      Hello world
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal/Modal.vue';
export default {
  components: { Modal },
  data() {
    return {

      removeFriendAlert : false,
      loading: false,
      users: [],
    };
  },
  async created() {
    this.loading = true;
    const { data } = await this.$axios.get(
      `https://randomuser.me/api/?results=15`
    );
    const people = [];

    data.results.map((user) => {
      people.push({
        id: user.id.value,
        name: user.name.first + " " + user.name.last,
        username: user.username,
        email: user.email,
        photo: user.picture.medium,
        profilePicLoading: true,
        location: user.location,
      });
    });
    this.users = people;
    this.loading = false;
  },
  methods: {
    addFriend(){

    },
    removeFriend(){
      this.removeFriendAlert = true;
    }
  },
};
</script>

<style>
.new-people-container {
  max-height: 400px;
  overflow-y: auto;
}
.new-people-container::-webkit-scrollbar {
  width: 5px;
}
.new-people-container::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.new-people-container::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
</style>