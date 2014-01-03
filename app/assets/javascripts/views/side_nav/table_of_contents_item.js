App.Views.TableOfContentsItem = Backbone.View.extend({

  template: JST['side_nav/table_of_contents_item'],

  render: function () {
    var renderedContent = this.template({
      section: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }

});