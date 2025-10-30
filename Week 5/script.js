const form = document.getElementById("myForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check if email is valid
function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

// Event Listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (username.value.trim() === "") {
    showError(username, "Username is required");
  } else {
    showSuccess(username);
  }

  if (email.value.trim() === "") {
    showError(email, "Email is required");
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }

  if (password.value.trim() === "") {
    showError(password, "Password is required");
  } else if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
  } else {
    showSuccess(password);
  }

  if (confirmPassword.value.trim() === "") {
    showError(confirmPassword, "Please confirm your password");
  } else if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "Passwords do not match");
  } else {
    showSuccess(confirmPassword);
  }
});