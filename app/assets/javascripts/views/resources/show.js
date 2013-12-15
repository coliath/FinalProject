App.Views.ResourceShow = Backbone.View.extend({

  tagName: 'section',

  template: JST['resources/show'],

  events: {
  	"click #hide-table-of-contents": "hideTableOfContents",
  },

  hideTableOfContents: function ( e ) {
    var that = this;
    $("#table-of-contents").slideUp("fast", function () {
      $(".resource").append('<span class="show" id="show-table-of-contents"></span>');
      $("#show-table-of-contents").click(that.showTableOfContents);
    });
  },

  showTableOfContents: function ( e ) {
    $("#show-table-of-contents").remove();
    $("#table-of-contents").slideDown("fast");
  },

  render: function () {
    var renderedContent = this.template({
      resource: this.model
    });

    this.$el.html(renderedContent).addClass('resource-wrapper');

    return this;
  }


});