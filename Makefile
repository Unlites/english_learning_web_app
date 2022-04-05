
build:
	docker-compose build app

run:
	docker-compose up app

migrate:
	migrate -path ./schema -database 'postgres://postgres:qwerty@0.0.0.0:5436/postgres?sslmode=disable' up