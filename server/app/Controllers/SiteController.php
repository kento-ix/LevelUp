<?php
namespace app\controllers;

class SiteController {
    public function home() {
        return "This is home page";
    }

    public function database() {
        return "Ready to use Database!";
    }

    public function contact() {
        return "Contact Page";
    }
}