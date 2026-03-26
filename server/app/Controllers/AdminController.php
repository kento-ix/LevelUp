<?php

namespace app\Controllers;

use app\models\Admin;

class AdminController
{
    public function index(): array
    {
        $admin = new Admin();
        return $admin->getAllAdmins();
    }
}