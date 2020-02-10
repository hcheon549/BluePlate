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
    post 'promos/apply/:id', to: 'promos#apply'
    resources :promos, only: [:index]
    resources :favorites, only: [:index, :create, :destroy]
    resources :subscriptions, only: [:create, :update]
    resources :account_summaries, only: [:show, :create, :update]
    resources :account_histories, only: [:show, :create]
    resources :menus, only: [:index, :create, :update]
    get 'menus/todaymenus', to: 'menus#today_menus'
    resources :pickup_times, only: [:index]
    resources :reservations, only: [:index, :create, :update, :destroy]
    get 'reservations/getreservations', to: 'reservations#get_reservations'
    post 'reservations/sendorder/:id', to: 'reservations#send_order'
    resources :password_resets, only: [:create, :update, :edit]
    resources :shops, only: [:index]
    resources :leads, only: [:create]
    resources :charges

  end

  match '*path', to: 'static_pages#root', via: :all

end
