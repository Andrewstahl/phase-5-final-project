class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show update destroy]
  before_action :set_user, only: %i[update destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # GET /projects
  def index
    @projects = Project.all

    render json: @projects
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    @project = Project.create!(project_params)
    render json: @project, status: :created, location: @project
  end

  # PATCH/PUT /projects/1
  def update
    if [@project.freelancer_id, @project.buyer_id].include? @user.id
      @project.update!(project_params)
      render json: @project
    else
      render_not_authorized_response
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    if [@project.freelancer_id, @project.buyer_id].include? @user.id
      @project.destroy
      head :no_content
    else
      render_not_authorized_response
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  def set_user
    @user = User.find(session[:user_id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:freelancer_id, :buyer_id, :posting_id, :due_date, :cost)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: ['Project not found'] }, status: :not_found
  end

  def render_not_authorized_response
    render json: { errors: 'You cannot make a change to a project that does not belong to your account' },
           status: :unauthorized
  end
end
