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

    public function projection(): array // allows the user to search up any field they want to view from the user table
    {
        $fields = explode(',', $_GET['fields'] ?? '');
        $user   = new User();
        return $user->getFieldfromUser($fields);
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

    public function searchUsername(): array|false
    {
        $username = $_GET['username'] ?? '';
        $user     = new User();
        return $user->getUserInfoByUsername($username);
    }
    public function searchEmail(): array|false
    {
        $email = $_GET['email'] ?? '';
        $user     = new User();
        return $user->findByEmail($email);
    }
    public function create(): array
        {
            $data = json_decode(file_get_contents("php://input"), true);

            // validate that all fields are present
            if (empty($data['email']) || empty($data['username']) || empty($data['password'])) {
                http_response_code(400);
                return [
                    'status'  => 'error',
                    'message' => 'Email, username and password are required'
                ];
            }

            $user    = new User();
            $success = $user->createUser($data['email'], $data['username'], $data['password']);

            if ($success) {
                http_response_code(201);
                return [
                    'status'  => 'success',
                    'message' => 'User created successfully'
                ];
            }

            http_response_code(500);
            return [
                'status'  => 'error',
                'message' => 'Failed to create user'
            ];
        }
    public function update(): array
        {
            $id   = intval($_GET['id'] ?? 0);
            $data = json_decode(file_get_contents("php://input"), true);
            $user = new User();
             $success = $user->updateUser($id, $data['username'], $data['availability']);
            return $success
                ? ['status' => 'success', 'message' => 'User updated']
                : ['status' => 'error',   'message' => 'Update failed'];
        }
    public function delete(): array
    {
        $id   = intval($_GET['id'] ?? 0);
        $user = new User();
        $success = $user->deleteUser($id);
        return $success
            ? ['status' => 'success', 'message' => 'User deleted']
            : ['status' => 'error',   'message' => 'User not found'];
    }
}