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
    public function count(): array
    {
        $gameModel = new Game();
        $result    = $gameModel->gameCount();
        return [
            'status' => 'success',
            'data'   => $result
        ];
    }
    public function recent(): array
    {
        $gameModel = new Game();
        $result    = $gameModel->recentlyPublished();
        return [
            'status' => 'success',
            'data'   => $result
        ];
    }
}