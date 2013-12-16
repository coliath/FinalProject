App.Views.NoteIndex = Backbone.View.extend({

  events: {
    'click .submit-note': 'submit',
    'click .note': 'editNote'
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON(); // this is a good place for a view prototype getFormData Function
    attrs.note.resource_id = App.CurrentState.resource.get("id");

    App.CurrentState.user.notes.create(attrs, {wait: true});
  },

  editNote: function ( e ) {
    var noteId = $(e.target).data("note-id");
    var note = App.CurrentState.user.notes.get(noteId);
    console.log(note);
    var noteEdit = new App.Views.NoteEdit({ model: note });
    $('#content').append(noteEdit.render().$el);
    $('.edit-note-modal').reveal();
    $(document).on('reveal:close', '.edit-note-modal', function () { $(this).remove(); console.log("closed"); });
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

    return this;
  }

});