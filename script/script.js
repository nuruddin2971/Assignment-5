console.log("clicked");
document.getElementById("sign-btn").addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log("button clicked");
  // 1. get the username
  const nameInput = document.getElementById("input-username");
  const name = nameInput.value;
  console.log(name);
  // 2. get the password
  const passwordInput = document.getElementById("input-password");
  const password = passwordInput.value;
  console.log(password);
  // 3. match username & password
  if (name === "admin" && password === "admin123") {
    // 3.1 true::> alert > homepage
    alert("Sign in success");
    window.location.assign("/issue.html");
  } else {
    // 3.2 false::> alert > return
    alert("Sign in failed");
    return;
  }
});
