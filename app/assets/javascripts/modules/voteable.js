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

App.Modules.parseVoteable = function ( json, voteableType ) {
	json.vote_score = 0;
	_.each(json.votes, function ( vote ) {
		if ( vote.vote_type === "Up") {
			json.vote_score++;
		} else {
			json.vote_score--;
		}
	});

	json.votes = new App.Collections.Votes(json.votes, {
		voteable_id: json.id,
		voteable_type: voteableType
	});

	App.CurrentData.votes.add(json.votes.models);

	return json;
}