<?php
use app\controllers\SiteController;
use app\controllers\UserController;

$app->router->get('/', [SiteController::class, 'home']); //http://localhost:8080/

$app->router->get('/api/users', [UserController::class, 'index']); // http://localhost:8080/api/user