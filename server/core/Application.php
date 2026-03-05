<?php

namespace app\core;

class Application
{
  public Router $router;
  public Request $request;
  public Database $db;

  public function __construct($rootPath, array $config)
  {
    $this->request = new Request();
    $this->router = new Router($this->request);

    $this->db = new Database($config['db']);
  }

  public function run()
  {
    $this->router->resolve();
  }
}
