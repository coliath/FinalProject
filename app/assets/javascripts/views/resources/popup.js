App.Views.ResourcePopup = Backbone.View.extend({

  initialize: function ( options ) {

  },

  events: {
    'click button': "handleClick"
  },

  handleClick: function ( e ) {
    console.log("A popover button has been clicked!")
  },

  template: JST['resources/popup'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    $('popover').removeAttr("style");

    return this;
  }

});