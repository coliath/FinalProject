App.Models.Section = Backbone.Model.extend({

  initialize: function (options) {

  },

  getResource: function () { // make robust by fetching model if needed
    return App.resources.get(this.get("resource_id"));
  },

  hasNextSection: function () { // make ternary?
    if (this.get("next_section_id")) {
      return true;
    } else {
      return false;
    }
  },

  getNextSection: function () {
    if (this.hasNextSection()) {
      var nextSection = this.getResource().sections.findWhere({ id: this.get("next_section_id") });
      return nextSection;
    } else {
      return false; // ??? something else here
    }
  }

});