<?php

namespace app\Controllers;

use app\models\Moderator;

class ModeratorController
{
    public function index(): array
    {
        $moderatorModel = new Moderator();
        $moderator = $moderatorModel->getAllModerators();
        // output array as json
        return [
            'status' => 'success',
            'count'  => count($moderator),
            'data' => $moderator
        ];
    }
}