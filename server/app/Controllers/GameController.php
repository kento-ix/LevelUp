<?php

namespace app\Controllers;

use app\models\Game;

class GameController
{
    public function index(): array
    {
        $gameModel = new Game();
        $games     = $gameModel->getAllGames();

        return [
            'status' => 'success',
            'count'  => count($games),
            'data'   => $games,
        ];
    }
}