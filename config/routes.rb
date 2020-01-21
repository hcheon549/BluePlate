Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    get 'session/user', to: 'sessions#user'

    resources :meals, only: [:index, :update]
    get 'meals/search', to: 'meals#search'

    resources :schools, only: [:index]
    resources :plans, only: [:index]
    get 'promos/match', to: 'promos#match'
    resources :promos, only: [:index]
    resources :favorites, only: [:index, :create, :destroy]
    resources :subscriptions, only: [:create, :update]
    resources :account_summaries, only: [:create, :update]
    resources :menus, only: [:index, :create, :update]
    resources :pickup_times, only: [:index]
    resources :reservations, only: [:index, :create, :update, :destroy]
    get 'reservations/send', to: 'reservations#send_orders'
    resources :password_resets, only: [:create, :update, :edit]
    resources :shops, only: [:index]
    resources :leads, only: [:create]
    resources :charges

  end

  match '*path', to: 'static_pages#root', via: :all

end
