<?php

namespace app\models;

use app\core\Application;
use PDO;

class Friendship
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    public function getFriendsByUserId(int $id): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT U.UserID, U.Username, U.Availability
                FROM FriendShip F
                JOIN User U ON F.FriendID = U.UserID
                WHERE F.UserID = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addFriendship(int $userId, int $friendId): void
    {
        $pdo  = $this->pdo;
        $sql  = "INSERT INTO FriendShip (UserID, FriendID) VALUES (:userId, :friendId)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':userId',   $userId,   PDO::PARAM_INT);
        $stmt->bindValue(':friendId', $friendId, PDO::PARAM_INT);
        $stmt->execute();

        $stmt->bindValue(':userId',   $friendId, PDO::PARAM_INT);
        $stmt->bindValue(':friendId', $userId,   PDO::PARAM_INT);
        $stmt->execute();
    }
}
