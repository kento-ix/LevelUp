<?php

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$config = [
    'db' => require_once __DIR__ . '/../config/database.php'
];

use app\core\Application;

$app = new Application(__DIR__ . '/..', $config);

require_once __DIR__ . '/../routes/web.php';

$app->run();

