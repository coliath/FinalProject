App.Views.DiscussionForm = Backbone.View.extend({

  events: {
    'click .submit-discussion': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    if ( this.model.isNew() ) {
      this.model.set(attrs);
      App.CurrentState.resource.discussions.create(attrs, { wait: true });
    } else {
      this.model.save(attrs, {wait: true});
    }
    
    this.remove();
    $('.discussion-modal-form').trigger("reveal:close");
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