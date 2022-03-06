import { axiosPost } from "~/helpers/axiosHelpers";
import { globalEvent } from "~/helpers/globalEvent";

export default {
  data() {
    return {
      deletePostAlert: false,
      deletePostId: "",
    };
  },
  methods: {
    async deletePostFinally() {
      let result = await axiosPost("posts/delete", {
        post_id: this.deletePostId,
      });
      globalEvent.$emit("post-deleted", this.deletePostId);
      this.deletePostId = "";
      this.deletePostAlert = false;
    },
    deleteThisPost(post) {
      this.deletePostAlert = true;
      this.deletePostId = post.id;
    },
    async setReaction(rxn, post) {
      console.log(rxn);
      let oldReaction =
        post.reactions.length > 0 ? post.reactions[0].reaction : null;
      if (!oldReaction || oldReaction.id !== rxn.id) {
        let { data } = await axiosPost("posts/reaction", {
          post_id: post.id,
          reaction_id: rxn.id.toString(),
        });
        let newReaction = data.postReaction.reaction;
        post.reactions = [
          {
            ...data.postReaction,
            reaction: { ...newReaction, selected: true },
          },
        ];
      }
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
