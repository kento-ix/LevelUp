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
            'data' => $users
        ];
    }
}