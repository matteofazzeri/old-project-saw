<?php

include ('./inc/bootstrap.php');

if (isset($_POST["submit"]))

    //echo "submit <br>";
    if (isset($_POST["email"]) && isset($_POST["pass"]) && isset($_POST["cpass"])) {
        $user_email = $_POST["email"];
        $user_name = $_POST["username"];
        $user_pass = $_POST["pass"];
        $user_cPass = $_POST["cpass"];

        // controllo che la mail sia corretta
        if (checkEmail($user_email)){
            //echo "error -> mail <br>";
            $_SESSION['email-error'] = 0;

            // controllo che il nome e cognome sia sintatticamente corretti
            if (preg_match("/^([a-zA-Z]+[àèéìòù]*\s+)+([a-zA-Z]+[àèéìòù]*\s*)$/", $_POST["name-lastname"])){
                //echo "ok -> username <br>";
                $_SESSION['name-lastname-error'] = 0;
                
                //controllo che la password (e la conferma della password) sia corretta
                if (checkRegistrationPassword($user_pass, $user_cPass)){
                    //echo "error -> password <br>";
                    $_SESSION['password-error'] = 0;
                    
                    // controllo che l'utente non esista già per poterlo inserire nel database
                    if(!userExists($user_email)) {
                        // aggiungo l'utente al database
                        addUser($user_email, $user_name, $_POST['name-lastname'], $user_pass);
                        // salvo lo username dell'utente, lo userò per mostrarlo a video.
                        $_SESSION['user_data'] = $user_email. "\t". $user_name. "\t". $_POST['name-lastname'];
                        header("location: login.php");
                    } else {
                        echo "
                            <script>
                                alert('User already exists! Create a New account or Login');
                            </script>
                        ";
                    }
                }
                else{
                    //echo "ok -> password <br>";
                    $_SESSION['password-error'] = 1;
                }
            }
            else {
                //echo "error -> username <br>";
                $_SESSION['name-lastname-error'] = 1;
            }
        }
        else {
            //echo "ok -> mail <br>";
            $_SESSION['email-error'] = 1;
        }

        
    } else {
        echo "<script> alert('Completa tutti i campi'); </>";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="libs/form.css">
    <title>Form</title>
</head>
<body>
    <div class="container-form">

        <!--SIGNUP FORM-->

        <div id="signup">
            <h3>Signup</h3>
            
            <form class="signup-form" action="" method="post">
            
                <div class="field email-field">
                    <div class="input-field">
                        <input type="text" name="email" placeholder="E-mail" class="email" required>
                    </div>

                    <?php showErrors("email", "Please enter a valid email", $_SESSION['email-error'] ?? ""); ?>

                </div>

                <div class="field name-lastname-field">
                    <div class="input-field">
                        <input type="text" name="name-lastname" id="name-lastname" placeholder="Name & Lastname"
                            pattern="([a-zA-Z]+[àèéìòù]*\s+)+([a-zA-Z]+[àèéìòù]*\s*)" required>
                    </div>

                    <?php showErrors("name-lastname", "Please enter a valid name/lastname", $_SESSION['name-lastname-error'] ?? ""); ?>

                </div>

                <div class="field username-field">
                    <div class="input-field">
                        <input type="text" name="username" placeholder="Username" class="Username"
                        pattern="[sS]\d{7,7}" required>
                    </div>

                    <?php showErrors("username", "Please enter a valid username", 0); ?>

                </div>
                
                <div class="field password-field">
                    <div class="input-field">
                        <input type="password" name="pass" placeholder="Password" class="password" required>
                        <i class="bi bi-eye-slash show-hide"></i>
                    </div>
                      
                    <!--strength bar-->

                    <div class="strength-container">
                        <p class="strength-title">Password strength:
                            <span class="strength-text"></span>
                        </p>
                        <div id="strength-bar"></div>
                    </div>

                    <!--strength bar-->

                    <?php showErrors("pass", "Please enter at least 8 charatcer with number, 
                        symbol, small and capital letter.", $_SESSION['password-error'] ?? ""); ?>
                </div>
            
                <div class="field confirm-password-field">
                    <div class="input-field">
                        <input type="password" name="cpass" class="cPassword" placeholder="Confirm Password" class="password" required>
                        <i class="bi bi-eye-slash show-hide"></i>
                    </div>

                    <?php showErrors("cpass", "Passwords don't match", $_SESSION['password-error'] ?? ""); ?>

                </div>
                
                <div class="input-field submit-button">
                    <input type="submit" name="submit" value="Submit">
                </div>
            </form>
            <label class="login-signup" for="#">Already have an account?</label>
            <a class="login-button" href="login.php">Login</a>
        </div>

    </div>

    <script src="js/strengthbar.js"></script>
    <script src="js/showPass.js"></script>
    
</body>
</html>