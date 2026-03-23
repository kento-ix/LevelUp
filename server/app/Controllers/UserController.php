<?php

namespace app\Controllers;

use app\Models\User;

class UserController
{
    /**
     * Display user information as json format
     */
    public function index()
    {
        $userModel = new User();
        $users = $userModel->getAllUsers();
        
        // output array as json
        return [
            'status' => 'success',
            'count'  => count($users),
            'data' => $users
        ];
    }

    public function show(): array
    {
        $id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT);

        if ($id === false || $id <= 0) {
            http_response_code(400);
            return [
                'status'  => 'error',
                'message' => 'Invalid user ID',
            ];
        }

        $userModel = new User();
        $user = $userModel->getUserById($id);

        if (!$user) {
            http_response_code(404);
            return [
                'status'  => 'error',
                'message' => 'User not found',
            ];
        }

        return [
            'status' => 'success',
            'data'   => $user,
        ];
    }
}