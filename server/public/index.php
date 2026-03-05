<?php

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$config = [
    'db' => require_once __DIR__ . '/../config/database.php'
];

use app\core\Application;

$app = new Application(__DIR__ . '/..', $config);

$app->router->get('/', function() {
    return "Ready to use Database!";
});


$app->router->get('/contact', function() {
    return 'Contact';
});

$app->run();

