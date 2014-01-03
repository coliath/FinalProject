App.Views.SiteNav = Backbone.View.extend({

  events: {
    "click #hide-site-nav": "hideSiteNav"
  },

  initialize: function () {
    
  },

  hideSiteNav: function ( e ) {
    
  },

  template: JST['left_nav/left_nav'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});