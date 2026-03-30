<?php
use app\Controllers\SiteController;
use app\Controllers\UserController;
use app\Controllers\FriendshipController;
use app\Controllers\AuthController;
use app\Controllers\AdminController;
use app\Controllers\ModeratorController;
use app\Controllers\PostController;
use app\Controllers\CommunityController;
use app\Controllers\GameController;

$app->router->get('/', [SiteController::class, 'home']); //http://localhost:8080/
// user interface needs to be made to input values to search up

// User
$app->router->get('/api/users',                  [UserController::class, 'index']);
$app->router->get('/api/users/show',             [UserController::class, 'show']);
$app->router->get('/api/users/projection',       [UserController::class, 'projection']);
$app->router->get('/api/users/searchUsername',   [UserController::class, 'searchUsername']);
$app->router->get('/api/users/searchEmail',      [UserController::class, 'searchEmail']);
$app->router->post('/api/users/create',          [UserController::class, 'create']);
$app->router->put('/api/users/update',           [UserController::class, 'update']);
$app->router->delete('/api/users/delete',        [UserController::class, 'delete']);
$app->router->get('/api/users/friends', [FriendshipController::class, 'friends']);
$app->router->get('/api/users/friends/count', [FriendshipController::class, 'countFriends']);
$app->router->post('/api/users/friends/add', [FriendshipController::class, 'add']);

// Admin
$app->router->get('/api/admins', [AdminController::class, 'index']);
$app->router->get('/api/admins/count', [AdminController::class, 'count']);
// Moderator
$app->router->get('/api/moderators', [ModeratorController::class, 'index']);

// Post
$app->router->get('/api/posts',                    [PostController::class, 'index']);
$app->router->get('/api/posts/byCommunity',        [PostController::class, 'getByCommunityID']);

//Community
$app->router->get('/api/community', [CommunityController::class, 'index']);
$app->router->get('/api/community/getByUser', [CommunityController::class, 'getByUser']);
$app->router->get('/api/community/division', [CommunityController::class, 'division']);

//Auth
$app->router->post('/api/auth/register', [AuthController::class, 'register']);
$app->router->post('/api/auth/login',    [AuthController::class, 'login']);
$app->router->post('/api/auth/logout',   [AuthController::class, 'logout']);

//Game
$app->router->post('/api/games',   [GameController::class, 'index']);
$app->router->post('/api/games/count',   [GameController::class, 'count']);
$app->router->post('/api/games/recent',   [GameController::class, 'recent']);
