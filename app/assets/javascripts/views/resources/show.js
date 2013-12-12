App.Views.ResourceShow = Backbone.View.extend({

  tagName: 'section',

  template: JST['resources/show'],

  render: function () {
    var renderedContent = this.template({
      resource: this.model
    });

    this.$el.html(renderedContent).addClass('resource-wrapper');

    return this;
  }


});