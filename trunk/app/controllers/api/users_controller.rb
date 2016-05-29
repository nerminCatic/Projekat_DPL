class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  respond_to :json 
  skip_before_action :authenticate_request, :set_current_user, only: [:index, :show, :confirm, :register, :update, :ban]
  #Komentar
  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
    render json: @user, status: 200
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end
  # Link for user confirmation
  def confirm
    decoded_token = AuthToken.decode(params[:token])
    if User.find(decoded_token[:user_id])
      user = User.find(decoded_token[:user_id])
      # User is confirmed
      #if user.confirmation_sent_at < 2.hours.ago
        #Link has expired
        #redirect_to "/#/register"
      #else
        user.confirmed = "Y"
        user.save
        redirect_to root_url
      #end
    else
      render json: { errors: "This link is invalid."}, status: 404
      #redirect_to "/#/login"
    end
  end

  def change_password
    user = @current_user
    user_email = user.email
    user_password = params[:password]
    user_new_password = params[:new_password]
    user_new_password_confirmation = params[:new_password_confirmation] 
    if user.try(:authenticate, user_password) and user_new_password == user_new_password_confirmation
        user.password = user_new_password
        user.password_confirmation = user_new_password_confirmation
        user.save
        render json: user, status: 200
    else
        render json: { errors: "Invalid email or password"}, status: 422
    end
  end
  
  def register
    @user = User.new(user_params)
    # default status : Waiting 
    @user.confirmed = "Y"
    if !@user.role
      @user.role = Role.find_by(name:"gost")
    end
    # json response
    respond_to do |format|
      #if !verify_recaptcha(:model => @user, :message => "CAPTCHA unos nije tacan!") && @user.save
      if @user.save
        format.json { render json: @user, status: :created,  location: api_user_url(@user) }
        #@user.send_user_confirmation
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    # default status : Waiting 
    @user.confirmed = "Y"
    # json response
    respond_to do |format|
      if @user.save
        format.json { render json: @user,  status: :created,  location: api_user_url(@user) }
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    user = User.find_by!(id: params[:id])
    if user 
      user.name = params[:name]
      user.surname = params[:surname]
      user.role_id = params[:role_id]
      user.phone = params[:phone]
      user.job = params[:job]
      user.email = params[:email]
      user.adress = params[:adress]
      user.confirmed = params[:confirmed]
      user.save
      render json: user, status: 200        
    else
      render json: { errors: "This link is invalid."}, status: 404
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    respond_with User.destroy(params[:id])
    #@user.destroy
    #respond_to do |format|
    #  format.json { head :no_content }
    #end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :name, :surname, :role_id, :adress, :phone, :job, :password, :password_confirmation, :confirmed)
    end

end