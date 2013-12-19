App.Views.NoteModalForm = Backbone.View.extend({

  initialize: function ( options ) {
    this.selectionText = options.selectionText;
  },

  events: {
    'click .submit-note': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    App.CurrentState.user.notes.create(attrs, {
      wait: true,
      error: function (note, resp, opts) {
        console.log(resp);
      }
    });
    this.remove();
    $('.note-modal-form').trigger("reveal:close");
  },

  template: JST['notes/modal-form'],

  render: function () {
    var renderedContent = this.template({
      selectionText: this.selectionText
    });
    this.$el.html(renderedContent);
    return this;
  }
});