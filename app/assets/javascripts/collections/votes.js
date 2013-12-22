App.Collections.Votes = Backbone.Collection.extend({

  model: App.Models.Vote,

  initialize: function (models, options) {
   this.voteable_type = options.voteable_type;
   this.voteable_id = options.voteable_id;
  },

  url: function () {
    return "/votes?type=" + this.voteable_type + "&id=" + this.voteable_id;
  }

});
