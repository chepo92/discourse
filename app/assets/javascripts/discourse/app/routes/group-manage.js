import I18n from "I18n";
import DiscourseRoute from "discourse/routes/discourse";

export default DiscourseRoute.extend({
  showFooter: true,

  titleToken() {
    return I18n.t("groups.manage.title");
  },

  model() {
    return this.modelFor("group");
  },

  afterModel(group) {
    if (
      !this.currentUser ||
      (!(this.currentUser.admin && group.get("automatic")) &&
        !this.currentUser.canManageGroup(group))
    ) {
      this.transitionTo("group.members", group);
    }
  },

  setupController(controller, model) {
    this.controllerFor("group-manage").setProperties({ model });
    this.controllerFor("group").set("showing", "manage");
  }
});
