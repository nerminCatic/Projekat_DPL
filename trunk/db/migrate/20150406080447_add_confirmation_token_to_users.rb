class AddConfirmationTokenToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :confirm_user_token, :string
    add_column :users, :confirmation_sent_at, :datetime
  end
end
