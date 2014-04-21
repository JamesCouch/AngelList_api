class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end


  def new_search

  	search_term = params[:q]
    new_term = search_term.sub(/^https?\:\/\//, '').sub(/^www./,'')
  	uri = URI.parse("http://api.angel.co/1/startups/search.json?domain=#{new_term}")
  	http = Net::HTTP.new(uri.host, uri.port)
  	response = http.request(Net::HTTP::Get.new(uri.request_uri))
  	@response = response.body
    @response = JSON.parse(@response)
    if request.xhr?
          render :json => @response
    elsif @response["success"] == false
      flash[:notice] = "The startup address could not be found!"
      render 'application/index' 
    else
      render 'application/search'
    end


  end



end
