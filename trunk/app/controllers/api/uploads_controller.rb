class Api::UploadsController < ApplicationController
  
  before_action :set_question, only: [:show, :edit, :update, :destroy]
  respond_to :json 
  skip_before_action :authenticate_request, :set_current_question, only: [:index, :show, :create]
  

  def index
    question = Question.find(params[:question_id])
    @uploads = question.uploads.order('created_at DESC')
    render response: { resources: @uploads }
  end

  def create
    upload = Upload.new
    upload.file_data = params[:file]
   upload.question = Question.find(params[:question_id])
    upload.save_binary
    upload.save

    respond_to do |format|
      if upload.save
        format.json { render json: upload, status: :created }
      else
        format.json { render json: upload.errors, status: :unprocessable_entity }
      end
    end
    #render response: { upload: upload }
  end

  def show
    upload = Question.find(params[:question_id]).uploads.find(params[:id])
   data = upload.binary.data

    send_data(data, :type => upload.content_type, :filename => upload.filename, :disposition => 'download')
  end
end 
