App.Views.TableOfContents = Backbone.View.extend({

  events: {
    "click .tbl-contents-link": "goToSection"
  },

  initialize: function () {
    
  },

  goToSection: function ( e ) {
    var id = "section-" + $(e.target).data("section-id");
    $(".tbl-contents-link").removeClass("selected-tbl-contents-link");
    $(e.target).addClass("selected-tbl-contents-link");
    $('.resource').animate({scrollTop:  $(".resource").scrollTop() + $("#"+id).position().top - 10 },'fast');
  },

  template: JST['left_nav/table_of_contents'],

  render: function () {
    var renderedContent = this.template({ resource: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});