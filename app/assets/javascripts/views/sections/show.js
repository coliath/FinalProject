App.Views.SectionShow = Backbone.View.extend({


  template: JST['sections/show'],

  render: function () {
    var renderedContent = this.template({
      section: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }

});