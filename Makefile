

# Format:
# Target: dependance
#	Commande1
#	Commande2
#	Commande3n

install:
	npm install

test: install
	npm run test

start_dev: install
	npm start