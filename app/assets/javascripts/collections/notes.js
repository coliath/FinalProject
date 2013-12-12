App.Collections.Notes = Backbone.Collection.extend({
  url: "/notes",
  model: App.Models.Note
});