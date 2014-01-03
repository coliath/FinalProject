App.Views.SiteNav = Backbone.View.extend({

  events: {
    
  },

  initialize: function () {
    
  },

  template: JST['side_nav/site_nav'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});