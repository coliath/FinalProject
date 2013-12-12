window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CurrentState: {
    user: {}
  }, // i am not how sure if this is the best way to handle this
  initialize: function() {

    App.resources = new App.Collections.Resources();
    App.notes = new App.Collections.Notes();

    var router = new App.Routers.Resources();

    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   App.initialize();
// });
