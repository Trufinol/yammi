<?php

# В начале нашего скрипта пишем:
set_error_handler('err_handler');
function err_handler($errno, $errmsg, $filename, $linenum) {
    $date = date('Y-m-d H:i:s (T)');
    $f = fopen('errors.txt', 'a');
    if (!empty($f)) {
        $filename  =str_replace($_SERVER['DOCUMENT_ROOT'],'',$filename);
        $err  = "$errmsg = $filename = $linenum\r\n";
        fwrite($f, $err);
        fclose($f);
    }
}

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {
    // $project_name = trim($_POST["project_name"]);
    // $admin_email  = trim($_POST["admin_email"]);
    // $form_subject = trim($_POST["form_subject"]);
    $project_name = "Yammi";
    $send_to  = "veseliy07@gmail.com";
    $form_subject = "Новое сообщение";

    foreach ( $_POST as $key => $value ) {
        if ( $value != "" ) {
            $message .= "
            " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
            </tr>
            ";
            if ($key == "Email") {
                $sender = $value;
            }
        }
    }
}

$message =
"<html>
    <head>
    <title> . $project_name . </title>
    </head>
    <body>
        <table style='width: 100%;'>$message</table>
    </body>
</html>
";

// function adopt($text) {
//     return '=?UTF-8?B?'.Base64_encode($text).'?=';
// }

$headers = 
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$sender.'>' . PHP_EOL .
'Reply-To: '.$sender.'' . PHP_EOL;

mail($send_to, $form_subject, $message, $headers);
