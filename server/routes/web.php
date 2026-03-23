<?php
use app\Controllers\SiteController;
use app\Controllers\UserController;
use app\Controllers\FriendshipController;

$app->router->get('/', [SiteController::class, 'home']); //http://localhost:8080/

$app->router->get('/api/users', [UserController::class, 'index']); // http://localhost:8080/api/users
$app->router->get('/api/users/show', [UserController::class, 'show']);
$app->router->get('/api/users/friends', [FriendshipController::class, 'friends']);