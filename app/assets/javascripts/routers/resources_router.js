App.Routers.Resources = Backbone.Router.extend({

  routes: {
    "": "index",
    "resources/:id": "show"
  },

  initialize: function ( options ) {
    this.$rootEl = options.$rootEl;
  },

  show: function ( id ) {
    var that = this;
    var resource = new App.Models.Resource({ id: id });
    resource.fetch({
      success: function (resp) {
        App.resources.add(resource);
        var showView = new App.Views.ResourceShow({ model: resource });
        that._swapView(showView);
      }
    });
  },

  _swapView: function ( newView ) {
    this.$rootEl.html(newView.render().$el);
  },





});