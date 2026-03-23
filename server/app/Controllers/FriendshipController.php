<?php

namespace app\Controllers;

use app\models\Friendship;

class FriendshipController
{
    public function add(): array
    {
        $body = json_decode(file_get_contents('php://input'), true);

        $userId   = filter_var($body['userId']   ?? null, FILTER_VALIDATE_INT);
        $friendId = filter_var($body['friendId'] ?? null, FILTER_VALIDATE_INT);

        if (!$userId || !$friendId || $userId === $friendId) {
            http_response_code(400);
            return [
                'status'  => 'error',
                'message' => 'Invalid user IDs',
            ];
        }

        $friendshipModel = new Friendship();
        $friendshipModel->addFriendship($userId, $friendId);

        return [
            'status'  => 'success',
            'message' => 'Friendship added',
        ];
    }

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
