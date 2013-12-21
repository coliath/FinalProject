window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CurrentState: {
    user: {}
  }, // i am not how sure if this is the best way to handle this
  Modules: {}, // better name for this?
  initialize: function() {
    new App.Routers.Resources();
    Backbone.history.start();
  }
};
