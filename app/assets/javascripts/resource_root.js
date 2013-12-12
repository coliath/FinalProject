window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    App.resources = new App.Collections.Resources();

    new App.Routers.Resources({
      $rootEl: $('#content')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  App.initialize();
});
