App.Views.ResourceShow = Backbone.View.extend({

  tagName: 'section',

  template: JST['resources/show'],

  events: {
  	"click #hide-table-of-contents": "hideTableOfConents",
  },

  hideSocial: function ( e ) {
    var that = this;
    $("#table-of-contents").slideUp("fast", function () {
      $("#resource").prev().append('<span class="show" id="show-social"></span>');
      $("#show-table-of-contents").click(that.showTableOfContents);
    });
  },

  showTableOfContents: function ( e ) {
    $("#show-social").remove();
    $("#social-content").slideDown("fast");
  },

  render: function () {
    var renderedContent = this.template({
      resource: this.model
    });

    this.$el.html(renderedContent).addClass('resource-wrapper');

    return this;
  }


});