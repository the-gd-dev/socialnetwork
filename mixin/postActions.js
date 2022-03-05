import { axiosPost } from "~/helpers/axiosHelpers";

export default {
  data() {
    return {
      deletePostAlert: false,
      deletePostId: "",
    };
  },
  methods: {
    async deletePostFinally(callback) {
      let result = await axiosPost("posts/delete", {
        post_id: this.deletePostId,
      });
      this.deletePostId = "";
      this.deletePostAlert = false;
      if (callback) {
        callback();
      } else {
        this.$emit("post-deleted", this.deletePostId);
      }
    },
    deleteThisPost(post) {
      this.deletePostAlert = true;
      this.deletePostId = post.id;
    },
    async setReaction(rxn, post) {
      let { data } = await axiosPost("posts/reaction", {
        post_id: post.id,
        reaction_id: rxn.id.toString(),
      });
      post.reaction = { ...rxn, selected: true };
    },
    async setPrivacySettings(privacy, post) {
      let { data } = await axiosPost("posts/privacy", {
        post_id: post.id,
        privacy_id: privacy.id.toString(),
      });
      post.privacy_id = privacy.id;
    },
  },
};
