App.Views.DiscussionForm = Backbone.View.extend({

  events: {
    'click .submit-discussion': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    console.log(this.model);
    console.log(attrs);
    if ( this.model.isNew() ) {
      this.model.set(attrs.discussion);
      App.CurrentState.resource.discussions.create(this.model, { wait: true });
    } else {
      this.model.save(attrs.discussion, {wait: true});
    }
    $('#discussion-form-modal').modal('hide');
  },

  template: JST['discussions/form'],

  render: function () {
    var renderedContent = this.template({
      discussion: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }

});