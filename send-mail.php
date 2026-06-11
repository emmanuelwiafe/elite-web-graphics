<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '') {
  $errors[] = 'Name is required.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = 'A valid email is required.';
}
if ($service === '') {
  $errors[] = 'Please select a service.';
}
if (strlen($message) < 10) {
  $errors[] = 'Message must be at least 10 characters.';
}

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
  exit;
}

$to      = 'emmanuelwiafe09@gmail.com';
$subject = "New Inquiry from $name - $service";

$body  = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Service: $service\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
  echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent. We will get back to you shortly.']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
