mkmigration:
	./node_modules/knex/bin/cli.js migrate:make $(name)

migrate:
	./node_modules/knex/bin/cli.js migrate:latest

test:
	./node_modules/mocha/bin/mocha
