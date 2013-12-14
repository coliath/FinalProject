App.Models.Section = Backbone.Model.extend({

  initialize: function (options) {

  },

  resource: function () { // make robust by fetching model if needed
    return App.CurrentState.resource;
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
      var nextSection = this.resource().sections.findWhere({ id: this.get("next_section_id") });
      return nextSection;
    } else {
      return false; // ??? something else here
    }
  }

});