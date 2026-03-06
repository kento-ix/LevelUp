# LevelUp

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
| Service    | URL                         |
|------------|-----------------------------|
| React      | http://localhost:5173        |
| PHP Server | http://localhost:8080        |
| phpMyAdmin | http://localhost:8081        |


## ⚙️ Install Library
When you install a new library, **commit `package.json` and `package-lock.json`** so teammates only need to run `docker compose build` — no manual installs needed.

---

### 📦 React — Frontend Library

#### Step 1: Enter the React container

```bash
docker compose exec react sh
```

#### Step 2: Install the library

```bash
npm install <library-name>

# Examples
npm install axios
npm install react-router-dom
npm install jotai
```

#### Step 3: Exit and push

```bash
exit
```

```bash
git add react/package.json react/package-lock.json

git commit -m "feat: add <library-name>"

git push origin <branch-name>
```

---

### 🐘 PHP Server — Backend Library

#### Step 1: Enter the app container

```bash
docker compose exec app bash
```

#### Step 2: Install the library via Composer

```bash
composer require <vendor/package>

# Examples
composer require guzzlehttp/guzzle
composer require firebase/php-jwt
```

#### Step 3: Exit and push

```bash
exit
```

```bash
git add server/composer.json server/composer.lock

git commit -m "feat: add <package-name>"

git push origin <branch-name>
```

---

### 👥 Teammates — After Pulling Changes

When a teammate adds a new library, you only need to **rebuild** the container:

```bash
git pull origin main

# Rebuild only the container that changed
docker compose build react   # ← if a React library was added
docker compose build app     # ← if a PHP library was added

# Then start as usual
docker compose up
```

> **Why build?** The `Dockerfile` runs `npm install` / `composer install` automatically during build, so all new dependencies are installed for everyone without any manual steps.

## 📁 Project Structure

```
LevelUp/
├── docker-compose.yml
├── .env
├── README.md
├── server/              # PHP backend
│   ├── Dockerfile
│   ├── composer.json
│   └── ...
└── react/               # React frontend
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    └── src/
```