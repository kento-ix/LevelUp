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
        $pdo  = $this->pdo;
        $sql  = "SELECT UserID, Email, Username, DateJoined, Availability FROM User ORDER BY UserID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById(int $id): array|false
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT UserID, Email, Username, DateJoined, Availability FROM User WHERE UserID = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findByEmail(string $email): array|false
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT UserID, Email, Username, DateJoined, Availability FROM User WHERE Email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser(string $email, string $username, string $hashedPassword): bool
    {
        $pdo  = $this->pdo;
        $sql  = "INSERT INTO User (Email, Username, Password, DateJoined, Availability) 
                VALUES (:email, :username, :password, CURDATE(), 'online')";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':email',    $email,          PDO::PARAM_STR);
        $stmt->bindValue(':username', $username,        PDO::PARAM_STR);
        $stmt->bindValue(':password', $hashedPassword,  PDO::PARAM_STR);
        return $stmt->execute();
    }
}
