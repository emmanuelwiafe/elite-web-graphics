<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit;
}

$name     = trim($_POST['name'] ?? '');
$location = trim($_POST['location'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$subject  = trim($_POST['subject'] ?? '');
$message  = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '') {
  $errors[] = 'Full name is required.';
}
if ($location === '') {
  $errors[] = 'Location is required.';
}
if ($phone === '') {
  $errors[] = 'Mobile number is required.';
}
if ($subject === '') {
  $errors[] = 'Service is required.';
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
$email   = "inquiry@elitewebgraphics.com";
$subject = "New Inquiry: $subject";

$body  = "Name: $name\n";
$body .= "Location: $location\n";
$body .= "Phone: $phone\n";
$body .= "Subject: $subject\n\n";
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
