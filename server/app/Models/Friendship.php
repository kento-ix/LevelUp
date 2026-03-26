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

        // rewriting $stmt to $stmt2 to ensure new values are properly bound       
        $stmt2 = $pdo->prepare($sql);
        $stmt2->bindValue(':userId',   $friendId, PDO::PARAM_INT);
        $stmt2->bindValue(':friendId', $userId,   PDO::PARAM_INT);
        $stmt2->execute();
    }
    public function countFriendsUserHas(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT U.UserID, U.Username, COUNT(*) AS TotalFriends
                FROM User U
                JOIN (
                    -- in a pair like (3,1) UserA: 1 and UserB: 2, should be no duplicate friends showing up
                    SELECT LEAST(UserID, FriendID) AS UserA, GREATEST(UserID, FriendID) AS UserB
                    FROM FriendShip
                    GROUP BY UserA, UserB
                ) AS UniquePairs ON U.UserID = UniquePairs.UserA OR U.UserID = UniquePairs.UserB
                -- ensures unique pairs are matched regardless of who holds the larger/smaller ID
                GROUP BY U.UserID, U.Username
                ORDER BY TotalFriends DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
