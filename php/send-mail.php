<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "your@email.com"; // ✅ Your email address
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $body = "You have received a new message:\n\n";
    $body .= "Full Name: $name\n";
    $body .= "Email Address: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request.";
}
?>
