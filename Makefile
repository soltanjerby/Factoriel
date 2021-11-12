

# Format:
# Target: dependance
#	Commande1
#	Commande2
#	Commande3n

install:
	npm install

test: install
	npm run test

lint: install
	npx eslint **/*.js

start_dev: install
	npm start