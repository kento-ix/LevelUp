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
     * Return list of games
     */
    public function getAllGames(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT * 
        FROM Game";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function gameCount(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT COUNT(*) AS total_games
        FROM Game";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function recentlyPublished(): array|false
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT MAX(PublishedDate) 
        FROM Game";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
