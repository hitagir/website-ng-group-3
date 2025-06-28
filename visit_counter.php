<?php
// visit_counter.php
// ---
// Table creation SQL (run once in your DB):
// CREATE TABLE thankyou_visits (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   page VARCHAR(32) NOT NULL,
//   visit_date DATE NOT NULL,
//   count INT NOT NULL DEFAULT 0,
//   UNIQUE KEY(page, visit_date)
// );

$host = 'localhost';
$db   = 'your_db_name';
$user = 'your_db_user';
$pass = 'your_db_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Increment visit count
    $data = json_decode(file_get_contents('php://input'), true);
    $page = isset($data['page']) ? $data['page'] : null;
    if (!in_array($page, ['birth', 'marriage', 'death'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid page']);
        exit;
    }
    $today = date('Y-m-d');
    // Insert or update count for today
    $stmt = $pdo->prepare('INSERT INTO thankyou_visits (page, visit_date, count) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE count = count + 1');
    $stmt->execute([$page, $today]);
    echo json_encode(['success' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch counts (all time and today)
    $result = [];
    foreach (['birth', 'marriage', 'death'] as $page) {
        // All time
        $stmt = $pdo->prepare('SELECT SUM(count) as total FROM thankyou_visits WHERE page = ?');
        $stmt->execute([$page]);
        $allTime = (int)($stmt->fetch()['total'] ?? 0);
        // Today
        $stmt = $pdo->prepare('SELECT count FROM thankyou_visits WHERE page = ? AND visit_date = ?');
        $stmt->execute([$page, date('Y-m-d')]);
        $today = (int)($stmt->fetch()['count'] ?? 0);
        $result[$page] = ['allTime' => $allTime, 'today' => $today];
    }
    echo json_encode($result);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']); 