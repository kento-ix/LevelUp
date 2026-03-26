<?php

namespace app\models;

use app\core\Application;
use PDO;

class Community
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    /**
     * Return user list
     */
    public function getAllCommunities(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT C.CommunityID, C.Name, C.Description, G.Title AS GameTitle
                FROM Community C
                JOIN Game G ON C.GameID = G.GameID
                ORDER BY C.CommunityID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCommunityByUserId(int $id): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT C.CommunityID, C.GameID, C.Name, C.Description, U.UserID 
                FROM Community C
                JOIN User_Game_Has_Community U ON C.CommunityID = U.CommunityID
                WHERE U.UserID = :id
                ORDER BY C.CommunityID
                ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getUsersInAllCommunities(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT U.UserID, U.Username
                FROM User U
                WHERE NOT EXISTS (
                    SELECT C.CommunityID
                    FROM Community C
                    WHERE NOT EXISTS (
                        SELECT UGC.CommunityID
                        FROM User_Game_Has_Community UGC
                        WHERE UGC.UserID = U.UserID
                        AND UGC.CommunityID = C.CommunityID
                    )
                )";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
