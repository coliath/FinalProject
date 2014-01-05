App.Views.NoteForm = Backbone.View.extend({


  events: {
    'click .submit-note': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    if (attrs.note.private === 'on') {
      attrs.note.private = true;
    } else {
      attrs.note.private = false;
    }
    if ( this.model.isNew() ) {
      this.model.set(attrs);
      App.CurrentState.user.notes.create(this.model, {wait: true});
    } else {
      this.model.save(attrs, {wait: true});
    }
    $('#note-form-modal').modal('hide');
    var that = this;
    $('#note-form-modal').on('hidden.bs.modal', function (e) { that.remove(); });
  },

  template: JST['notes/form'],

  render: function () {
    var renderedContent = this.template({ note: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});