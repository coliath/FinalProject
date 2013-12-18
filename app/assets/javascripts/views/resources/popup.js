App.Views.ResourcePopup = Backbone.View.extend({

  initialize: function ( options ) {
    //console.log(options.wrapperClass);


  },

  template: JST['resources/popup'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});