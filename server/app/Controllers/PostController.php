<?php

namespace app\Controllers;

use app\models\Post;

class PostController
{
    public function index(): array
    {
        $post = new Post();
        return $post->getAllPosts();
    }
    public function postByCommunityID(): array
    {
        $id   = intval($_GET['id'] ?? 0); // reads the id value from the URL query parameter
        $post = new Post();
        return $post->getPostsByCommunity($id);
    }
}