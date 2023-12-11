<?php
// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once '../db/Database.php';
include_once '../models/Todo.php';

// Instantiate a Database object & connect
$database = new Database();
$dbConnection = $database->connect();

// Instantiate Todo object
$todo = new Todo($dbConnection);

// Group ToDo items by date
$groupedTasks = $todo->groupByDate();
if (!empty($groupedTasks)) {
    echo json_encode($groupedTasks);
} else {
    echo json_encode(
        array('message' => 'No todo items were found')
    );
}
?>