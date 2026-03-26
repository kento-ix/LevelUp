<?php

namespace app\Controllers;

use app\models\Community;

class CommunityController
{
    
    public function index(): array
    {
        $community = new Community();
        return $community->getAllCommunities();
    }
    
    public function getByUser(): array
    {
        $id        = intval($_GET['id'] ?? 0);
        $community = new Community();
        return $community->getCommunityByUserId($id);
    }

    public function division(): array
    {
        $community = new Community();
        $result    = $community->getUsersInAllCommunities();
        return [
            'status' => 'success',
            'count'  => count($result),
            'data'   => $result
        ];
    }
}