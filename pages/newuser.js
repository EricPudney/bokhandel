export default function registerUser() {
  return `
      <p>Register here in order to add books and authors:</p>
      <form onsubmit="createUser(); return false">
        <input name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <input type="submit" value="Send">
      </form>
      <br>
      <p id="register-text"></p>  
      <br>
      <p>Log in to your account:</p>
      <form onsubmit="logIn(); return false">
        <input name="login-username" placeholder="username">
        <input type="password" name="login-password" placeholder="password">
        <input type="submit" value="Send">
      </form>  
      <br>
      <p id="login-text"></p>  
      <br>
    `;
}

async function createUser() {
  let newUser = {
    username: $("[name=username]").val(),
    password: $("[name=password]").val(),
  };
  let response = await fetch("/api/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  let result = await response.json();
  console.log(result);
  $("#register-text").text(`${result.message}`);
  $("[name=username]").val("");
  $("[name=password]").val("");
}

window.createUser = createUser;

async function logIn() {
  let credentials = {
    username: $("[name=login-username]").val(),
    password: $("[name=login-password]").val(),
  };
  console.log(credentials);

  let response = await fetch("/api/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  let result = await response.json();
  $("#login-text").html(`${result.message}`);
  $("[name=login-username]").val("");
  $("[name=login-password]").val("");
}

window.logIn = logIn;
