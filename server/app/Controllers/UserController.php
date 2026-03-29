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

    public function projection(): array
    {
        $fields = explode(',', $_GET['fields'] ?? '');
        $userModel = new User();
        $users  = $userModel->getFieldfromUser($fields);

        return [
            'status' => 'success',
            'count'  => count($users),
            'data'   => $users,
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
        $user      = $userModel->getUserById($id);

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

    public function searchUsername(): array
    {
        $username  = $_GET['username'] ?? '';
        $userModel = new User();
        $user      = $userModel->getUserInfoByUsername($username);

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

    public function searchEmail(): array
    {
        $email     = $_GET['email'] ?? '';
        $userModel = new User();
        $user      = $userModel->findByEmail($email);

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

    public function create(): array
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['email']) || empty($data['username']) || empty($data['password'])) {
            http_response_code(400);
            return [
                'status'  => 'error',
                'message' => 'Email, username and password are required',
            ];
        }

        $userModel = new User();
        $success   = $userModel->createUser($data['email'], $data['username'], $data['password']);

        if ($success) {
            http_response_code(201);
            return [
                'status'  => 'success',
                'message' => 'User created successfully',
            ];
        }

        http_response_code(500);
        return [
            'status'  => 'error',
            'message' => 'Failed to create user',
        ];
    }

    public function update(): array
    {
        $id        = intval($_GET['id'] ?? 0);
        $data      = json_decode(file_get_contents("php://input"), true);
        $userModel = new User();
        $success   = $userModel->updateUser($id, $data['username'], $data['availability']);

        return $success
            ? ['status' => 'success', 'message' => 'User updated']
            : ['status' => 'error',   'message' => 'Update failed'];
    }

    public function delete(): array
    {
        $id        = intval($_GET['id'] ?? 0);
        $userModel = new User();
        $success   = $userModel->deleteUser($id);

        return $success
            ? ['status' => 'success', 'message' => 'User deleted']
            : ['status' => 'error',   'message' => 'User not found'];
    }
}