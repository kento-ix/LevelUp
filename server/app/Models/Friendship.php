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
        $sql = "SELECT U.UserID, U.Username, U.Availability
                FROM FriendShip F
                JOIN User U ON F.FriendID = U.UserID
                WHERE F.UserID = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
