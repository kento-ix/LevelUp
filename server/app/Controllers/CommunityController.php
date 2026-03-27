<?php

namespace app\Controllers;

use app\models\Community;

class CommunityController
{
    
    public function index(): array
    {
        $communityModel = new Community();
        $communities    = $communityModel->getAllCommunities();

        return [
            'status' => 'success',
            'count'  => count($communities),
            'data'   => $communities,
        ];
    }

    public function getByUser(): array
    {
        $id             = intval($_GET['id'] ?? 0);
        $communityModel = new Community();
        $communities    = $communityModel->getCommunityByUserId($id);

        return [
            'status' => 'success',
            'count'  => count($communities),
            'data'   => $communities,
        ];
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