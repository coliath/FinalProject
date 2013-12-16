App.Collections.Discussions = Backbone.Collection.extend({

  model: App.Models.Discussion,

  initialize: function (models, options) {
    this.resource_id = options.resource_id;
  },

  url: function () {
    return "/resources/" + this.resource_id + "/discussions"
  },

});