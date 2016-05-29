EStamparija::Application.routes.draw do
  #Root 
  root 'static_pages#index'
  #Routes
  get "static_pages/index"
  resources :translations, only: :show
  namespace :api, defaults: { format: :json } do
    post 'auth' => 'auth#authenticate'
    resources :reservations do
      put 'confirm', on: :member
      put 'decline', on: :member
    end

    resources :questions do
      collection do
           get :chart
           post :create
      end
       resources :comments
       resources :uploads
    end 

    resources :uploads

    resources :categories do
      collection do
         get :chart
      end
    end

    resources :feedbacks do
      collection do
        get :chart
      end      
    end

    resources :sessions, :only => [:create] do
      collection do
        get :current_user
        post :log_out
      end
    end

    resources :passwordresets do
      collection do
          get :change_form
          post :change_pass
      end
    end
    
    resources :users do
        collection do
            post :register
            post :change_password
            get :confirm
        end
    end

  resources :roles do
    collection do
          post :create
          post :update_role
          end
        end
  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
