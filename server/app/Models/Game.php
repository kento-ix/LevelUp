<?php

namespace app\models;

use app\core\Application;
use PDO;

class Game
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    /**
     * Return admin list
     */
    public function getAllGames(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT GameID, Genre, Title, PublishedDate 
        FROM Game
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
