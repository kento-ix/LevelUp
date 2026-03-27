<?php

namespace app\Controllers;

use app\models\Post;

class PostController
{
    public function index(): array
    {
        $postModel = new Post();
        $posts = $postModel->getAllPosts();

        return [
            'status' => 'success',
            'count'  => count($posts),
            'data'   => $posts,
        ];
    }

    public function getByCommunityID(): array
    {
        $id        = intval($_GET['id'] ?? 0);
        $postModel = new Post();
        $posts     = $postModel->getPostsByCommunity($id);

        return [
            'status' => 'success',
            'count'  => count($posts),
            'data'   => $posts,
        ];
    }
}