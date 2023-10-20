/************************** SINGUP FORM CHECKER **************************/

const form = document.querySelector("form"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    passField = form.querySelector(".password-field"),
    passInput = passField.querySelector(".password"),
    cPassField = form.querySelector(".confirm-password-field"),
    cPassInput = passField.querySelector(".cPassword");

/* STRENGTH CHECKER */

//passInput is the password input element
//passField is the password field element

let strengthContainer = document.querySelector(".strength-container");
let strengthBar = document.querySelector('#strength-bar');
let strengthText = document.querySelector('.strength-text');

// when click on password input field show strength bar
passInput.addEventListener('focus', function() {
    strengthContainer.style.display = 'block';
});

// when click on password input field hide strength bar
passInput.addEventListener('blur', function() {
    strengthContainer.style.display = 'none';
});

// changing password strength bar according to the value passed to the function
function setStrength(value) {
    strengthBar.style.width = value + '%';
}

function setColorAndText(color, text) {
    strengthBar.style.backgroundColor = color;
    strengthText.innerHTML = text;
    strengthText.style.color = color;
}

function clearStrength() {
    strengthBar.style.width = 0;
    strengthBar.style.backgroundColor = '';
    strengthText.innerHTML = "";
}

function checkPasswordStrength() {
    let strength = 0;

    if (passInput.value == '') {
        clearStrength();
        return passField.classList.add("invalid");
    }

    if(passInput.value.match(/\s/)) {
        setColorAndText('red', 'Password cannot contain spaces');
        return passField.classList.add("invalid");
    }

    if (passInput.value.match(/<|>/)) {
        setColorAndText('red', 'Password cannot contain < or >');
        return passField.classList.add("invalid");
    }

    if (passInput.value.length > 30) {
        setColorAndText('red', 'Password must contain less than 30 char.');
        return passField.classList.add("invalid");
    }

    if (passInput.value.length < 8) {
        strength = 5;
        setColorAndText('red', 'Password must contain at least 8 charatcer with number, symbol, small and capital letter.');
    } else {

        let lowerCase = passInput.value.match(/[a-z]/);
        let upperCase = passInput.value.match(/[A-Z]/);
        let numbers = passInput.value.match(/[0-9]/);
        let specialChar = passInput.value.match(/[\!\"\£\$\%\&\(\)\=\[\]\{\}\?\^\-\+\*\.\,\;\:\_]/);


        //weak password
        if (lowerCase || upperCase || numbers || specialChar) {
            strength = 15;
            setColorAndText('red', 'Weak password: must contain at least 1 number, symbol, small and capital letter.');

            //medium password
            if(
                (upperCase && lowerCase) || (lowerCase && numbers) || (upperCase && specialChar) ||
                (upperCase && numbers) || (upperCase && specialChar) || (numbers && specialChar)

                )
            {
                strength = 28;
                setColorAndText('orange', 'Weak password: must contain at least 1 number, symbol, small and capital letter.');

                // almost strong password
                if(
                    (lowerCase && upperCase && numbers) || (lowerCase && upperCase && specialChar) ||
                    (lowerCase && specialChar && numbers) || (specialChar && upperCase && numbers)
                )
                {
                    strength = 45;
                    setColorAndText('ocra', 'Almost strong password: must contain at least 1 number, symbol, small and capital letter.');

                    // strong password
                    if (lowerCase && upperCase && numbers && specialChar) {
                        strength = 70;
                        setColorAndText('lightgreen', 'Strong password');
                        
                        // very strong password
                        if (lowerCase && upperCase && numbers && specialChar && passInput.value.length >=15) {
                            strength = 100;
                            setColorAndText('darkgreen', 'Very Strong password');
                        }

                        passField.classList.remove("invalid");
                        setStrength(strength);
                        return ;
                    }

                }
            }
            passField.classList.add("invalid");
        }
    }

    setStrength(strength);

}

function checkConfirmPassword() {
    if(passInput.value !== cPassInput.value) {
        cPassField.classList.add("invalid");
    }
}



passInput.addEventListener('keyup', checkPasswordStrength);
cPassInput.addEventListener('keyup', checkConfirmPassword);