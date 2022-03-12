import Vue from "vue";
import humanReadTime from "~/helpers/humanReadTime";
Vue.mixin({
  computed: {
    currentPath(){
      return this.$route.path;
    },
    user() {
      return this.$store.state.auth.user || {};
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/reset").then(() => {
        this.$router.push("/");
      });
    },
    formatTimeToHuman(date) {
      return humanReadTime(date);
    },
  },
});
