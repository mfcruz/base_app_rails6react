# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  authenticated :user do
    root "pages#app_index", as: :authenticated_root
  end

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end

  # match "*path", to: 'pages#index', via: :get
  # get "*path", to: 'pages#index', constraints: -> (req) do
  #  !req.xhr? && req.format.html?
  # end
  
  root "pages#index"
  devise_for :users
end
