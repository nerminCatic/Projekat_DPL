class Api::RolesController < ApplicationController
  #before_filter :restrict_api_access
  before_action :set_role, only: [:show, :edit, :update, :destroy]
  respond_to :json
  skip_before_action :authenticate_request, :set_current_user
  # GET /roles
  # GET /roles.json
  def index
    @roles = Role.order("name")
  end

  # GET /roles/1
  # GET /roles/1.json
  def show
    @role = Role.find(params[:id])
  end

  def update_role

    if params[:id] != "ssss"

    id = params[:id]
    name = params[:name]
    desc = params[:description]

    @role = Role.find(params[:id])
    @role.name = name
    @role.description = desc

    render json: @role, status: 200
    else
        render json: { errors: ""}, status: 422
    end

  end
  # GET /roles/new
  def new
    @role = Role.new
  end

  # GET /roles/1/edit
  def edit
  end

  # POST /roles
  # POST /roles.json
  def create
    @role = Role.new(role_params)

    respond_to do |format|
      if @role.save
        format.json { render json: @role, status: :created, location: api_role_url(@role) }
      else
        format.json { render json: @role.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /roles/1
  # PATCH/PUT /roles/1.json
  def update
    respond_to do |format|
      if @role.update(role_params)
        format.json { head :no_content }
      else
        format.json { render json: @role.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /roles/1
  # DELETE /roles/1.json
  def destroy
    @role.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_role
      @role = Role.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def role_params
      params.require(:role).permit(:name, :description)
    end
end
#komentar