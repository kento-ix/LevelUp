## Local Development Setup
Guide to help you get your local environment running using Docker

## Prerequisites
Ensure you have the following installed
- DockerDesktop (or Docker Engine with compose)
- Git

## 💻 Setup
#### Configure Environment Variables
Before starting Docker, you must create a local environment file.
1. Copy the example file:
   ```
   cp .env.example .env
   ```

Note: The .env file contains secrets and should never be committed to version control.

## ✏️ Getting Started
1. Initial Setup or Code Updates
```
docker compose up --build
docker-compose exec app composer install
```

- --build: Forces Docker to re-read your Dockerfile and re-package your application code.

2. Standard Start

For daily development after the initial setup, simply run:
```
docker-compose up
```

3. Managing Dependencies (Composer)

Whenever a teammate adds a new library (updates composer.json), you need to sync your local environment:
        
    docker-compose exec app composer install


4. Stopping the Environment
```
docker-compose stop
```
To remove the containers entirely (data persists in the mysql volume):
```
docker-compose down
```

## 🌐 Accessing the Services
- Server(php): http://localhost:8080

- phpMyAdmin: http://localhost:8081
