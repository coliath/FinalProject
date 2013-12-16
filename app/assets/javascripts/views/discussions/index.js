App.Views.DiscussionIndex = Backbone.View.extend({

  events: {
    'click #submit-discussion': 'submit',
    'click .discussion': 'showFullDiscussion'
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON();
    attrs.discussion.resource_id = App.CurrentState.resource.get("id");

    App.CurrentState.resource.discussions.create(attrs, {wait: true});
  },

  showFullDiscussion: function ( e ) {

    var discussionId = $(e.target).data("discussion-id");

    // var question = App.CurrentState.resource.questions.get(qid);
//     var fullView = new App.Views.QuestionFullShow({model: question});
//     App.CurrentState.resource.answers = new App.Collections.Answers([],{resource_id: App.CurrentState.resource.get("id"), question_id: question.get("id")});
//     App.CurrentState.resource.answers.fetch({
//       success: function (collection, resp, opts) {
//         $('#content').append(fullView.render().$el);
//         var answersView = new App.Views.AnswerIndex({collection: App.CurrentState.resource.answers});
//         $('.question-modal').append(answersView.render().$el);
//         $('.question-modal').reveal();
//         $(document).on('reveal:close', '.question-modal', function () { $(this).remove(); });
//       }
//     });
  },

  template: JST['discussions/index'],

  render: function ( hidden ) {
    if (hidden != true) { hidden = false; }

    var renderedContent = this.template({
      discussions: this.collection,
      hidden: hidden
    });

    this.$el.html(renderedContent);

    return this;
  }

});