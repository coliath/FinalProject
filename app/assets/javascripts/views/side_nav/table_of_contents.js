App.Views.TableOfContents = Backbone.View.extend({

  events: {
    
  },

  initialize: function () {
    
  },

  template: JST['side_nav/table_of_contents'],

  render: function () {
    var renderedContent = this.template({ resource: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});