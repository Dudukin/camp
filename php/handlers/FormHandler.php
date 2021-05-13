<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

if (isset($data['name']) && isset($data['email']) && isset($data['tel'])) {
    $to = 'edudukin2@gmail.com';
    $from = "chayka";
    $subject = 'New user message';
    $message = "
        Name: $data[name]
        E-mail: $data[email]
        Tel: $data[tel]
        Message: $data[text]
        ";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";
    mail($to, $subject, $message, $headers);
}
?>