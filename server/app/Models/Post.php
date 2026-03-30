<?php

namespace app\models;

use app\core\Application;
use PDO;

class Post
{
    protected PDO $pdo;

    public function __construct()
    {
        $this->pdo = Application::$app->db->pdo;
    }

    /**
     * Return post list
     */
    public function getAllPosts(): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT
                    P.PostID, P.CommunityID, P.Title, P.Content, P.Date_Created,
                    U.Username,
                    G.Title AS GameTitle,
                    G.Genre,
                    UPG.Device,
                    C.Name AS CommunityName
                FROM Post P
                LEFT JOIN User U ON P.UserID = U.UserID
                LEFT JOIN Community C ON P.CommunityID = C.CommunityID
                LEFT JOIN Game G ON C.GameID = G.GameID
                LEFT JOIN User_Plays_Game UPG ON P.UserID = UPG.UserID AND G.GameID = UPG.GameID
                ORDER BY P.PostID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPostsByCommunity(int $id): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT
                    P.PostID, P.CommunityID, P.Title, P.Content, P.Date_Created,
                    U.Username,
                    G.Title AS GameTitle,
                    G.Genre,
                    UPG.Device,
                    C.Name AS CommunityName
                FROM Post P
                LEFT JOIN User U ON P.UserID = U.UserID
                LEFT JOIN Community C ON P.CommunityID = C.CommunityID
                LEFT JOIN Game G ON C.GameID = G.GameID
                LEFT JOIN User_Plays_Game UPG ON P.UserID = UPG.UserID AND G.GameID = UPG.GameID
                WHERE P.CommunityID = :id
                ORDER BY P.PostID";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // public function createPost(): array|false
    // {
    //     $pdo  = $this->pdo;
    //     $sql  = "SELECT UserID, Email, Username, DateJoined, Availability FROM User WHERE Email = :email";
    //     $stmt = $pdo->prepare($sql);
    //     $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    //     $stmt->execute();
    //     return $stmt->fetch(PDO::FETCH_ASSOC);
    // }

    // public function deletePost(int $id): bool {
        
    // }

    // public function updatePost(int $id): bool {
        
    // }
}
