## Local Development Setup
Guide to help you get your local environment running using Docker

## Prerequisites
Ensure you have the following installed
- DockerDesktop (or Docker Engine with compose)
- Git

## 💻 Setup
#### Configure Environment Variables
Before starting Docker, you must create a local environment file.
1. Copy the example file: cp .env.example .env

2. Open .env and update the passwords if necessary.

Note: The .env file contains secrets and should never be committed to version control.

## ✏️ Getting Started
1. Initial Setup or Code Updates
```
docker compose up --build
```

- --build: Forces Docker to re-read your Dockerfile and re-package your application code.

2. Standard Start

For daily development after the initial setup, simply run:
```
docker-compose up
```

3. Dependency Installation (Composer)

Since PHP is running inside a container, you must install the project dependencies (libraries) inside that container

    1. Enter the container's shell (Bash):

    - docker exec -it app bash

    2. Verify the prompt: Your terminal should change to something like "root@29ab2b822b9f:/var/www/html#"

    3. Install Composer dependencies: Run the following command inside the container:

    - composer install

    4. Exit: Type exit to return to your local terminal.


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
