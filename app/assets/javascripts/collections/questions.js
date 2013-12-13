App.Collections.Questions = Backbone.Collection.extend({

  model: App.Models.Question,

  initialize: function (models, options) {
    this.resource_id = options.resource_id; // would be different once notes are not only through resource
  },

  url: function () {
    return "/resources/" + this.resource_id + "/questions"
  },

  getUserResourceNotes: function ( resource_id ) { // this is redundent at this point in the project
    $.ajax({
      url: "/resources/"+ resource_id +"/notes",
      success: function (resp) {
        console.log(resp);
      },
      error: function (resp) {
        console.log(resp);
      }
    });
  }


});