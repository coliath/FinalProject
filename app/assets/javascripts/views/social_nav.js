App.Views.SocialNav = Backbone.View.extend({

  events: {
    "click #show-notes":     "showNotes",
    "click #show-questions": "showQuestions",
    "click .hide": "hideSocial",
  },

  // showNotes: function ( e ) {
//     $('.questions').hide();
//     new App.Collections.Notes([],{ resource_id: App.CurrentState.resource.get("id") }).fetch({
//       success: function (collection, resp, opts) {
//         App.CurrentState.resource.notes = collection;
//         var indexView = new App.Views.NoteIndex({collection: collection});
//         $("#social-content").append(indexView.render().$el);
//       }
//     });
//   },
//
//   showQuestions: function ( e ) {
//     $('.notes').hide();
//     new App.Collections.Questions([],{ resource_id: App.CurrentState.resource.get("id") }).fetch({
//       success: function (collection, resp, opts) {
//         App.CurrentState.resource.questions = collection;
//         var indexView = new App.Views.QuestionIndex({collection: collection});
//         $("#social-content").append(indexView.render().$el);
//       }
//     });
//   },

  hideSocial: function ( e ) {
    $("#social-content").slideUp("fast");
  },

  template: JST['social_nav'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});