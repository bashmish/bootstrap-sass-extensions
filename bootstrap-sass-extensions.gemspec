Gem::Specification.new do |s|
  s.name = 'bootstrap-sass-extensions'
  s.version = '2.3.2.3'
  s.summary = 'Extensions for bootstrap-sass gem.'
  s.description = 'New and improved Bootstrap features on the foundation of bootstrap-sass gem.'
  s.authors = ['Michael Bashkirov']
  s.email = 'bashmish@gmail.com'
  s.homepage = 'http://github.com/bashmish/bootstrap-sass-extensions'

  s.add_dependency 'bootstrap-sass', '~> 2.3.2.1'

  s.files = Dir['vendor/**/*.{scss,js,png}'] + Dir['lib/**/*']
end
