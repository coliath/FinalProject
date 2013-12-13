App.Routers.Resources = Backbone.Router.extend({

  routes: {
    "": "index",
    "resources/:id": "showReaderView",
  },

  initialize: function () {
    this.$resourceEl = $('#resource-content');
    this.$socialEl = $("#social-content");
  },

  showResource: function ( id ) {
    var that = this;
    var resource = new App.Models.Resource({ id: id });
    resource.fetch({
      success: function (resp) {
        App.resources.add(resource);
        App.CurrentState.resource = resource;
        var showView = new App.Views.ResourceShow({ model: resource });
        that._swapView(that.$resourceEl, showView);
        that.indexNotes();
      }
    });
  },

  indexNotes: function () {
    var notesIndex = new App.Views.NoteIndex({collection: App.CurrentState.user.notes});
    this._swapView(this.$socialEl, notesIndex);
  },

  showReaderView: function ( id ) {
    App.CurrentState.user.notes = new App.Collections.Notes([], {resource_id: id}); // change this to grab all previous notes
    var that = this;
    App.CurrentState.user.notes.fetch({ // getUserResourceNotes(id); for later
      success: function (collection, resp, opt) {
        that.showResource(id);
      }
    });
  },

  index: function () {
    // ONLY FOR NOW!!
    this.showReaderView(1);
  },







  _swapView: function ( el, view ) {
    el.html(view.render().$el);
  },





});