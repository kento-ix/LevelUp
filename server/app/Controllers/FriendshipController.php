<?php

namespace app\Controllers;

use app\models\Friendship;

class FriendshipController
{
    public function friends(): array
    {
        $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);

        if ($id === false || $id <= 0) {
            http_response_code(400);
            return [
                'status'  => 'error',
                'message' => 'Invalid user ID',
            ];
        }

        $friendshipModel = new Friendship();
        $friends = $friendshipModel->getFriendsByUserId($id);

        return [
            'status' => 'success',
            'count'  => count($friends),
            'data'   => $friends,
        ];
    }
}
