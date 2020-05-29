class V1::PostsController < ApplicationController
  def index
    render json: {
      :posts => [
        { :title => 'some-thing',
          :description => 'waoh-001'
        },
        { :title => 'some-thing-else',
          :description => 'waoh-002'
        },
        { :title => 'some-thing-else-2',
          :description => 'waoh-003'
        }
      ]
    }
  end
end