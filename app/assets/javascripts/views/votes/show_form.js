App.Views.Vote = Backbone.View.extend({

  template: JST['votes/show_form'],

  render: function () {
    var renderedContent = this.template({
    	vote: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }

});