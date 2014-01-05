App.Views.NoteIndex = Backbone.View.extend({

  events: {
    'click .note': 'editNote',
    'click #note-btn': 'createNote'
  },

  createNote: function () {
    var note = new App.Models.Note();
    var noteForm = new App.Views.NoteForm({ model: note });
    $('#content').append(noteForm.render().$el);
    $('#note-form-modal').modal();
    $('#note-form-modal').on('hidden.bs.modal', function (e) { noteForm.remove(); });
  },

  editNote: function ( e ) {
    var noteId = $(e.target).data("note-id");
    var note = App.CurrentState.user.notes.get(noteId);
    var noteEdit = new App.Views.NoteForm({ model: note });
    $('#content').append(noteEdit.render().$el);
    $('#note-form-modal').modal();
    $('#note-form-modal').on('hidden.bs.modal', function (e) { noteEdit.remove(); });
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
    this.listenTo(this.collection, "change", renderCB);
  },

  template: JST['notes/index'],

  render: function () {
    var renderedContent = this.template({
      notes: this.collection
    });
    this.$el.html(renderedContent);
    $(window).trigger("resize");
    return this;
  }

});