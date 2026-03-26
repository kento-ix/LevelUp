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
        $sql  = "SELECT * 
        FROM Post 
        ORDER BY PostID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPostsByCommunity(int $id): array
    {
        $pdo  = $this->pdo;
        $sql  = "SELECT U.Username, P.PostID, P.Date_Created, P.Title, P.Content, P.CommunityID 
                FROM Post P
                LEFT JOIN User U ON P.UserID = U.UserID
                WHERE P.CommunityID = :id
                ORDER BY P.PostID DESC";
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
