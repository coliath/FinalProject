App.Views.ResourceShow = Backbone.View.extend({

  tagName: 'section.resource-wrapper',

  template: JST['resources/show'],

  render: function () {
    var renderedContent = this.template({
      resource: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }


});