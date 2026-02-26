## Local Development Setup
Guide to help you get your local environment running using Docker

## Prerequisites
Ensure you have the following installed
- DockerDesktop (or Docker Engine with compose)
- Git

## Setup
#### Configure Environment Variables
Before starting Docker, you must create a local environment file.
1. Copy the example file: cp .env.example .env

2. Open .env and update the passwords if necessary.

Note: The .env file contains secrets and should never be committed to version control.

## Getting Started
1. initial setup or code updates
```
docker-compose up --build
```

- --build: Forces Docker to re-read your Dockerfile and re-package your application code.

2. Standard Start
```
docker-compose up -d
```

3. Stopping the Environment
```
docker-compose stop
```
To remove the containers entirely (data persists in the mysql volume):
```
docker-compose down
```

## Accessing the Services
- Server(php): http://localhost:8080

- phpMyAdmin: http://localhost:8081

