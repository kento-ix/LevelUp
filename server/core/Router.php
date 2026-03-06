<?php

namespace app\core;

class Router
{
  public Request $request;
  protected array $routes = [];

  public function __construct(Request $request)
  {
    $this->request = $request;
  }

  public function get($path, $callback)
  {
    $this->routes['get'][$path] = $callback;
  }

  public function resolve()
  {
    $path = $this->request->getPath();
    $method = $this->request->getMethod();
    $callback = $this->routes[$method][$path] ?? false;
    if ($callback === false) {
      echo "Not found";
      exit;
    }

    if (is_array($callback)) {
      // instantiation class name then overwrite
      // eg: $callback[0] = new SiteController();
      $callback[0] = new $callback[0]();
    }

    $result = call_user_func($callback);

    if (is_array($result) || is_object($result)) {
        header('Content-Type: application/json');
        return json_encode($result);
    }

    return $result;
  }
}