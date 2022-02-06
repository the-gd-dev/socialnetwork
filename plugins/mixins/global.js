import Vue from "vue";
import humanReadTime  from "~/helpers/humanReadTime";
Vue.mixin({
  computed: {
    user() {
      return this.$store.state.auth.user || {};
    },
  },
  methods : {
    formatTimeToHuman(date){
      return humanReadTime(date);
    }
  }
});
