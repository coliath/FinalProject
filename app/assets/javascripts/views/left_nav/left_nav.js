App.Views.SiteNav = Backbone.View.extend({

  events: {
    'click #home-btn': "home",
    'click #sign-out-btn': "signOut"
  },

  home: function () {
    window.location.hash= "home";
  },

  signOut: function () {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location.href = "/session/new";
      }
    });
  },

  template: JST['left_nav/left_nav'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});