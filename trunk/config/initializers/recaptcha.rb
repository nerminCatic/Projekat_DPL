Recaptcha.configure do |config|
	if Rails.env.production?
	  config.public_key  = '6LccAAUTAAAAAFP9BYFC4qFicss1-I2v4M9-sp1P'
	  config.private_key = '6LccAAUTAAAAANnN_Nij9EVjNnQsdQAssAXJly4k'
	else
	  config.public_key  = '6Ldp3gQTAAAAADZoixiBzZZjNx58dk-c0UbWAK74'
	  config.private_key = '6Ldp3gQTAAAAAKJMfKdGCVhdiI9UuoY96unagveH'
	end
  # Uncomment the following line if you are using a proxy server:
  # config.proxy = 'http://myproxy.com.au:8080'
  # Uncomment if you want to use the newer version of the API,
  # only works for versions >= 0.3.7:
  # config.api_version = 'v2'
end