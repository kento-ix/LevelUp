<?php
use app\Controllers\SiteController;
use app\Controllers\UserController;
use app\Controllers\FriendshipController;
use app\Controllers\AuthController;

$app->router->get('/', [SiteController::class, 'home']); //http://localhost:8080/

$app->router->get('/api/users', [UserController::class, 'index']); // http://localhost:8080/api/users
$app->router->get('/api/users/show', [UserController::class, 'show']);
$app->router->get('/api/users/friends', [FriendshipController::class, 'friends']);
$app->router->post('/api/users/friends/add', [FriendshipController::class, 'add']);

$app->router->post('/api/auth/register', [AuthController::class, 'register']);
$app->router->post('/api/auth/login',    [AuthController::class, 'login']);
$app->router->post('/api/auth/logout',   [AuthController::class, 'logout']);
