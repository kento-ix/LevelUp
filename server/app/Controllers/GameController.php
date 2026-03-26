<?php

namespace app\Controllers;

use app\models\Game;

class GameController
{
    public function index(): array
    {
        $game = new Game();
        return $game->getAllGames();
    }
}