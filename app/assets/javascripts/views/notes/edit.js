App.Views.NoteEdit = Backbone.View.extend({


  events: {
    'click .submit-note': 'update',
  },

  update: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    this.model.save(attrs, {wait: true});
    $('.edit-note-modal').trigger("reveal:close");
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