class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  
  def index
    @posts = current_user.posts.all
  end
  
  def show
    if authorized?
      respond_to do |format|
        format.json { render :show }
      end
    else
      handle_unauthorized
    end
  end
  
  def create
    @post = current_user.posts.build(post_params)
    if authorized?
      respond_to do |format|
        if @post.save
          format.json { render :show, status: :created, location: api_v1_post_path(@post) }
        else
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
  end
  
  def update
    if authorized?
      respond_to do |format|
        if @post.update(post_params)
          format.json { render :show, status: :ok, location: api_v1_post_path(@post) }
        else
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
  end
  
  def destroy
    if authorized?
      @post.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    else
      handle_unauthorized
    end
  end
  
  private
  
  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :active)
  end
  
  def authorized?
    @post.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to do |format|
        format.json { render :unauthorized, status: 401 }
      end
    end
  end

end