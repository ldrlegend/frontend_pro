Docker

- Docker build
docker build -t product-mana-fe:latest .

- Docker run
docker run -d -p 3000:3000 --name product-mana-fe  product-mana-fe:latest