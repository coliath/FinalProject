App.Modules.makeVoteable = function ( viewObj ) {

	var voteFunctions = {

		renderVotes: function ( $wrapper ) {
		    this.votes = new App.Collections.Votes([], {voteable_id: this.model.get("id"), voteable_type: this.type });
		    this.votes.fetch({
		        success: function (collection, resp, opts) {
		        	var voteView = new App.Views.Vote({ collection: collection });
		        	$wrapper.append(voteView.render().$el);
		        }
		    });
		},

	}

	_.extend(viewObj, voteFunctions);

}