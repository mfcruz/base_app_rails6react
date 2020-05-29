# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'posts', to: "posts#index"
  end

  match "*path", to: 'pages#index', via: :get
  root "pages#index"
end
