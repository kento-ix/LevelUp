<?php

namespace app\Controllers;

use app\models\Admin;

class AdminController
{
    public function index(): array
    {
        $adminModel = new Admin();
        $admin = $adminModel->getAllAdmins();
        // output array as json
        return [
            'status' => 'success',
            'count'  => count($admin),
            'data' => $admin
        ];
    }

    public function count(): array
    {
        $adminModel = new Admin();
        $result     = $adminModel->getCount();
        return [
            'status' => 'success',
            'data'   => $result
        ];
    }
}