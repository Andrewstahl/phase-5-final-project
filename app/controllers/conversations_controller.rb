class ConversationsController < ApplicationController
  before_action :set_conversation, only: %i[ show update destroy ]
  
  # GET /conversations
  def index
    @user = get_user
    if @user
      @conversations = Conversation.user_messages(@user.username)
    else
      @conversations = Conversation.all
    end 
    render json: @conversations
  end

  # GET /conversations/1
  def show
    render json: @conversation
  end

  # POST /conversations
  def create
    @conversation = Conversation.new(conversation_params)
    @conversation.update(users: params[:users])
    if @conversation.save
      render json: @conversation, status: :created, location: @conversation
    else
      render json: { errors: [@conversation.errors.full_messages] }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /conversations/1
  def update
    if @conversation.update(conversation_params)
      render json: @conversation
    else
      render json: { errors: [@conversation.errors.full_messages] }, status: :unprocessable_entity
    end
  end

  # DELETE /conversations/1
  def destroy
    @conversation.destroy
  end

  private

    def get_user
      @user = User.find(session[:user_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_conversation
      @conversation = Conversation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def conversation_params
      params.require(:conversation).permit(:users)
    end
end
