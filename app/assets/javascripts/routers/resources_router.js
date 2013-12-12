App.Routers.Resources = Backbone.Router.extend({

  routes: {
    "": "index",
    "resources/:id": ""
  },

  initialize: function () {
    this.$resourceEl = $("#resource-content");
    this.$socialEl = $("#social-content");
  },

  showResource: function ( id ) {
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

  _swapView: function ( el, view ) {
    el.html(view.render().$el);
  },





});