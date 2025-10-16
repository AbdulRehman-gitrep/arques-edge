<?php
// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = isset($_POST['subject']) ? $_POST['subject'] : 'New Contact Form Submission';
$message = $_POST['message'];

// Your email address
$to = "arquesedge@gmail.com";

// Email headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Email body
$email_body = "
<html>
<head>
  <title>New Contact Form Submission</title>
</head>
<body>
  <h2>Contact Form Submission</h2>
  <p><strong>Name:</strong> $name</p>
  <p><strong>Email:</strong> $email</p>
  <p><strong>Subject:</strong> $subject</p>
  <p><strong>Message:</strong></p>
  <p>" . nl2br($message) . "</p>
</body>
</html>
";

// Send email
$success = mail($to, $subject, $email_body, $headers);

// Return JSON response
header('Content-Type: application/json');
if ($success) {
    echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error sending your message.']);
}
?>