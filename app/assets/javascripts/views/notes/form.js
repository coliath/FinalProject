App.Views.NoteForm = Backbone.View.extend({

  template: JST['notes/form'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }
});