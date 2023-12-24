<?php

include ('./inc/bootstrap.php');

if (isset($_POST["submit"]))
    if (isset($_POST["email"]) && isset($_POST["pass"])) {
        $user_email = $_POST["email"];
        $user_pass = $_POST["pass"];
        if(userExists($user_email)){ 
            $_SESSION["email-error"] = false;
            if(checkLoginPassword($user_pass)) {
                $_SESSION["password-error"] = false;

                $_SESSION['login'] = true;
                $_SESSION['username'] = $user_email;
                echo "<script> alert('Login Successfull'); window.location.href = '../public/index.php'; </script>";
            }
        } else {
            $_SESSION["email-error"] = true;
            $_SESSION["password-error"] = true;
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
                        <input type="text" name="email" placeholder="E-mail or Username" class="email"
                            value= <?php echo $user_email ?? ""?> >
                    </div>
            
                    <?php showErrors("email", "Please enter a registered email",
                        $_SESSION['email-error'] ?? false); ?>
                </div>
                
                <div class="field password-field">
                    <div class="input-field">
                        <input type="password" name="pass" placeholder="Password" class="password"
                            value= <?php echo $user_pass ?? ""?> >
                        <i class="bi bi-eye-slash show-hide"></i>
                    </div>

                    <?php showErrors("pass", "Wrong password. Please try again.", 
                        $_SESSION['password-error'] ?? false); ?>
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