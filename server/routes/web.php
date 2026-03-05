<?php
use app\controllers\SiteController;

$app->router->get('/', [SiteController::class, 'home']); //http://localhost:8080/
$app->router->get('/database', [SiteController::class, 'database']); // http://localhost:8080/databse
$app->router->get('/contact', [SiteController::class, 'contact']); // http://localhost:8080/contact