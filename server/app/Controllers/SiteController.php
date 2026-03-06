<?php
namespace app\controllers;

class SiteController {
    public function home() {
        return [
            'message' => 'Welcome to the Project API'
        ];
    }
}