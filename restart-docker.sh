docker compose down --volumes
docker image rm sterilization-directory-client
docker image rm sterilization-directory-server
docker compose up -d