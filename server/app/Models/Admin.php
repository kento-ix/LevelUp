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

    public function getCount(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT A.UserID, U.Username, A.Permission 
        FROM Admin A
        JOIN User U ON A.UserID = U.UserID
        ORDER BY A.UserID
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
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
        $sql  = "SELECT GameID, Genre, Title, PublishedDate 
        FROM Game
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
