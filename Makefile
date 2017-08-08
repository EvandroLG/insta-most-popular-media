.SILENT:

install_dependencies:
	npm install

run:
	node index.js

jshint:
	jshint *.js static/js/*.js
