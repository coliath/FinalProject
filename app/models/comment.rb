class Comment < ActiveRecord::Base
  attr_accessible :body, :commentable
end
