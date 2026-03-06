<?php

namespace app\core;

class Application
{
  public static Application $app;
  public Router $router;
  public Request $request;
  public Database $db;

  public function __construct($rootPath, array $config)
  {
    self::$app = $this;

    $this->request = new Request();
    $this->router = new Router($this->request);
    $this->db = new Database($config['db']);
  }

  public function run()
  {
    echo $this->router->resolve();
  }
}
