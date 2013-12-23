App.Views.Vote = Backbone.View.extend({

  template: JST['votes/show_form'],

  events: {
  	"click .upvote": "upvote",
  	"click .downvote": "downvote"
  },

  initialize: function ( options ) {
    this.subject = options.subject;

  	var renderCB = this.render.bind(this);

  	this.listenTo(this.collection, "add", renderCB);
  	this.listenTo(this.collection, "remove", renderCB);
  },

  upvote: function ( e ) {
  	var that = this;
  	this.collection.create({ vote_type: "Up" }, { 
  		wait: true,
  		success: function (collection, model, opts) {
  			that.checkForOpposingVote(model);
  		}
  	});
  },

  downvote: function ( e ) {
  	var that = this;
  	this.collection.create({ vote_type: "Down" }, { 
  		wait: true,
  		success: function (collection, model, opts) {
  			that.checkForOpposingVote(model)
  		}
  	});
  },

  checkForOpposingVote: function ( vote ) {
  	if ( vote.vote_type === "Up") {
  		var check_type = "Down";
  	} else {
  		var check_type = "Up";
  	}
  	var opposingVote = this.collection.findWhere({ vote_type: check_type, user_id: vote.user_id });
  	if ( opposingVote ) { this.collection.remove(opposingVote); }
  },

  voteScore: function () {
    var voteScore = 0;
    this.collection.each(function (vote) {
      if (vote.get("vote_type") === "Up") {
        voteScore++;
      } else {
        voteScore--;
      }
    });

    return voteScore;
  },

  render: function () {
    this.subject.set({vote_score: this.voteScore()});
    var renderedContent = this.template({
    	votes: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  }

});