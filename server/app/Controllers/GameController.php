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

    public function stats(): array
    {
        $gameModel        = new Game();
        $count            = $gameModel->gameCount();
        $recent           = $gameModel->recentlyPublished();

        return [
            'status' => 'success',
            'data'   => [
                'total_games'      => $count['total_games'],
                'recently_published' => $recent['MAX(PublishedDate)'],
            ],
        ];
    }
}