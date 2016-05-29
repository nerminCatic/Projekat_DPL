class Api::QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :edit, :update, :destroy]
  respond_to :json
  # GET /questions
  # GET /questions.json
  def index
      begin
        if params[:category_id] #&& params[:user_id]
          @questions = Question.where("category_id = ?", params[:category_id])
        elsif params[:filter] 
          @questions = Question.top
        else
          @questions = Question.order('created_at DESC')
        end
      rescue
        render json: { message: 'Record not found!' }, :status => :bad_request
      end
  end

  # GET /questions/1
  # GET /questions/1.json
  def show
  end
  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions
  # POST /questions.json
  def create
    @question = Question.new(question_params)
    @question.zavrseno = "N"
    @question.user = @current_user
    @question.uposlenik = User.find(params[:uposlenik_id])
    respond_to do |format|
      if @question.save
        format.json { render json: @question, status: :created, location: api_question_url(@question) }
      else
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /questions/1
  # PATCH/PUT /questions/1.json
  def update
    question = Question.find_by!(id: params[:id])
    if question
      question.name = params[:name]
      question.description = params[:description]
      question.user_id = params[:user_id]
      question.category_id = params[:category_id]
      question.zavrseno = params[:zavrseno]
      question.uposlenik_id = params[:uposlenik_id]
      question.save
      render json: question, status: 200        
    else
      render json: { errors: "This link is invalid."}, status: 404
    end
  end

  # DELETE /questions/1
  # DELETE /questions/1.json
  #automaticaly destroy all coments on this question
  def destroy
    @comments = Comment.where(question_id: @question.id)
    @comments.each do |comment|
      comment.destroy
    end
    @question.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def chart
    @dataChart = Question.chart
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params.require(:question).permit(:name, :question, :description, :user_id, :category_id, :zavrseno, :uposlenik_id, :filter )
    end
end
