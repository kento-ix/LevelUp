<?php

return [
    'host'     => 'mysql',
    'dbname'   => $_ENV['MYSQL_DATABASE'] ?? 'default_db',
    'user'     => $_ENV['MYSQL_USER']     ?? 'default_user',
    'password' => $_ENV['MYSQL_PASSWORD'] ?? 'default_pass',
];