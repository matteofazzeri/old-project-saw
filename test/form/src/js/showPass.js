// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        
        const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bi-eye-slash", "bi-eye");
            pInput.type = "text";
        } else {
            eyeIcon.classList.replace("bi-eye", "bi-eye-slash");
            pInput.type = "password";
        }
        
    });
});