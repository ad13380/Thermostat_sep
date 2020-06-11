require 'sinatra/base'

class ThermoState < Sinatra::Base
  enable :sessions

  get '/' do
    File.read('public/interface.html')
  end

  post '/temperature' do
    session[:temperature] = params[:temperature]
    session[:psm] = params[:psm]
    {status: 200}.to_json
  end

  get '/temperature' do
    { 
      temperature: session[:temperature],
      psm: session[:psm],
      status: 200 
    }.to_json
    p session[:temperature]
  end

  run! if app_file == $0
end