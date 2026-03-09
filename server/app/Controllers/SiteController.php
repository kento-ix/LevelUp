<?php
namespace app\Controllers;

class SiteController {
    public function home() {
        return [
            'message' => 'Welcome to the Project API'
        ];
    }
}