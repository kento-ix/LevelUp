<?php

namespace app\core;

class Router
{
  public Request $request;
  protected array $routes = [];

  public function __construct(Request $request)
  {
    $this->request = $request;
    $this->handleCors();
  }

  private function handleCors(): void
  {
    $allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGIN'] ?? '');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowedOrigins)) {
      header("Access-Control-Allow-Origin: $origin");
    }

    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");

    if ($this->request->getMethod() === 'options') {
      http_response_code(204);
      exit();
    }
  }

  public function get($path, $callback)
  {
    $this->routes['get'][$path] = $callback;
  }

  public function post($path, $callback)
  {
    $this->routes['post'][$path] = $callback;
  }

  public function put($path, $callback)
  {
    $this->routes['put'][$path] = $callback;
  }

  public function delete($path, $callback)
  {
    $this->routes['delete'][$path] = $callback;
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
        echo json_encode($result);
        return;
    }

    return $result;
  }
}