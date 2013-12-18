App.Views.ResourceShow = Backbone.View.extend({

  initialize: function () {
    this.highlighter = rangy.createCssClassApplier("highlighted", {normalize: true});
    this.errorer = rangy.createCssClassApplier("marked-as-error", {normalize: true});
    this.confusinger = rangy.createCssClassApplier("marked-as-confusing", {normalize: true});
  },

  tagName: 'section',

  template: JST['resources/show'],

  events: {
  	"click #hide-table-of-contents": "hideTableOfContents",
    "mouseup": "showHighlightOptions",
  },

  showHighlightOptions: function ( e ) {
    var sectionId = $(e.target).closest('section').data("section-id");
    console.log(sectionId);
    console.log(rangy.getSelection().toHtml());
    this.confusinger.applyToSelection(rangy.getSelection());
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