<?php

namespace app\models;

use app\core\Application;
use PDO;

class Moderator
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    /**
     * Return moderator list
     */
    public function getAllModerators(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT M.UserID, U.Username, C.Name AS AssignedCommunity 
        FROM Moderator M
        JOIN User U ON M.UserID = U.UserID
        JOIN Community C ON M.AssignedCommunity = C.CommunityID
        ORDER BY M.UserID
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
