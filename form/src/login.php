<?php

include ('./inc/bootstrap.php');

if (isset($_POST["submit"]))
    if (isset($_POST["email"]) && isset($_POST["pass"])) {
        $user_email = $_POST["email"];
        $user_pass = $_POST["pass"];
        if(userExists($user_email) && checkLoginPassword($user_pass)) {
            $_SESSION['login'] = true;
            $_SESSION['username'] = $user_email;
            echo "<script> alert('Login Successfull'); window.location.href = 'index.php'; </script>";
        } else {
            echo "<script> alert('Login error'); window.location.href = 'login.php'; </script>";
        }
        
    } else {
        echo "<script> alert('Completa tutti i campi'); </script>";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="libs/form.css">
    <title>Document</title>
</head>
<body>
    <!--LOGIN FORM-->
    <div class="container-form">
        <div id="login">
            <h3>Login</h3>
            
            <form class="login-form" action="" method="post">
            
                <div class="field email-field">
                    <div class="input-field">
                        <input type="text" name="email" placeholder="E-mail or Username" class="email">
                    </div>
            
                    <span class="error email-error">
                        <i class="bi bi-x-circle error-icon"></i>
                        <p class="error-text">Please enter a valid email</p>
                    </span>
                </div>
                
                <div class="field password-field">
                    <div class="input-field">
                        <input type="password" name="pass" placeholder="Password" class="password">
                        <i class="bi bi-eye-slash show-hide"></i>
                    </div>
                </div>
                
                <div class="input-field submit-button">
                    <input type="submit" name="submit" value="Submit">
                </div>
            </form>
            <label class="login-signup" for="#">Don't have an account?</label>
            <a class="login-button" href="registration.php">Signup</a>
            
        </div>
    </div>

    <script src="js/showPass.js"></script>
</body>
</html>