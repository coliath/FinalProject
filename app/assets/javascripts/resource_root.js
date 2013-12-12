window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    App.resources = new App.Collections.Resources();
    App.notes = new App.Collections.Notes();

    new App.Routers.Resources();

    Backbone.history.start();

  }
};

$(document).ready(function(){
  App.initialize();
});
