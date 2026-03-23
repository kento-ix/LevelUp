<?php

namespace app\models;

use app\core\Application;
use PDO;

class User
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    /**
     * Return user list
     */
    public function getAllUsers(): array
    {
        
        $sql  = "SELECT UserID, Email, Username, DateJoined, Availability FROM User ORDER BY UserID";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById(int $id): array|false
    {
        $sql  = "SELECT UserID, Email, Username, DateJoined, Availability FROM User WHERE UserID = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}