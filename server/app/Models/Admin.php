<?php

namespace app\models;

use app\core\Application;
use PDO;

class Admin
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    /**
     * Return admin list
     */
    public function getAllAdmins(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT UserID, Permission FROM Admin ORDER BY UserID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCount(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT COUNT(*) AS TotalAdmins 
        FROM Admin
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
