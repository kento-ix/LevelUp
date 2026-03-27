<?php

namespace app\Controllers;

use app\models\Post;

class PostController
{
    public function index(): array
    {
        $postModel = new Post();
        $post = $postModel->getAllPosts();

        return [
            'satus' => 'success',
            'data' => $post
        ];
    }

    public function getByCommunityID(): array
    {
        $id   = intval($_GET['id'] ?? 0); // reads the id value from the URL query parameter
        $post = new Post();
        return $post->getPostsByCommunity($id);
    }
}