App.Collections.Highlights = Backbone.Collection.extend({

  model: App.Models.Highlight,

  initialize: function (models, options) {
    this.resource_id = options.resource_id; // would be different once notes are not only through resource
  },

  url: function () {
    return "/resources/" + this.resource_id + "/highlights"
  },



});