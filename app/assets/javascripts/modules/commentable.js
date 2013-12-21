


App.Modules.makeCommentable = function ( viewObj ) {

	var commentFunctions = {

		showCommentForm: function ( e ) {
			e.stopPropagation();
			this.commentsIndex.render();
			this.commentsIndex.focus();
		},

		renderComments: function ( $wrapper ) {
		    var that = this;
		    this.comments = new App.Collections.Comments([], { commentable_id: this.model.get("id"), type: this.type });
		    this.comments.fetch({
		      success: function (collection, resp, opts) {
		        that.commentsIndex = new App.Views.CommentIndex({ collection: that.comments });
		        $wrapper.append(that.commentsIndex.render({ form: false }).$el);
		      },
		      error: function (something, resp, opts) {
		        console.log("ERROR");
		        console.log(resp);
		      }
		    });
		},
	}

	var commentEvents = {
		'click .add-comment': 'showCommentForm'
	}

	_.extend(viewObj, commentFunctions);

	if ( typeof viewObj.events === "undefined" ) {
		viewObj.events = {};
	}

	for (var key in commentEvents) {
		if (commentEvents.hasOwnProperty(key)) {
			viewObj.events[key] = commentEvents[key];
		}
	}
}







