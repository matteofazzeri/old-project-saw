<?php

//include ('./inc/bootstrap.php');

if (isset($_POST["submit"]))
    
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
                        <input type="text" name="test-name" placeholder="Name test" class="email">
                    </div>
                </div>
                
                <div class="field password-field">
                    <div class="input-field">
                        <input type="text" name="test-lastname" placeholder="Password" class="password">
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