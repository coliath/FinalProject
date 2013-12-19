App.Views.NoteEdit = Backbone.View.extend({


  events: {
    'click .submit-note': 'update',
  },

  update: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    if (attrs.note.private === "on") {
      attrs.note.private = true;
    } else {
      attrs.note.private = false;
    }
    this.model.save(attrs, {wait: true});
    $('.edit-note-modal').trigger("reveal:close");
    this.remove();
  },

  template: JST['notes/edit'],

  render: function () {
    var renderedContent = this.template({
      note: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
});