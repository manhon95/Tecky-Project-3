
//---------------------send register form to store in database  --------------------------
document
  .querySelector(".registerForm")
  .addEventListener("submit", async function (event) {
    document.querySelector("#submit").disabled = true;

    event.preventDefault();
    const form = event.target;
    const formObject = {};

    formObject["userName"] = form.userName.value;
    formObject["company"] = form.company.value;
    formObject["email"] = form.email.value;
    formObject["password"] = form.password.value;
    formObject["confirmPassword"] = form.confirmPassword.value;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const result = await res.json();
    console.log(result)
    if (result.success == "success") {
      location.href = "/verify";
    } else {
      document.querySelector("#submit").disabled = false;
    }

    for (const key in result) {
      if (key == "email" || key == "password") {
        document.querySelectorAll(`.${key}`).forEach((i) => {
          console.log(key,result[key])
          if (result[key]) {
            i.style.border = "solid 5px green";
          } else {
            i.style.border = "solid 5px red";
          }
          // i.style.border = result[key] ? "solid 5px green" : "solid 5px red";
        });
      } else {
        document.querySelector(`.${key}`).textContent = result[key];
      }
    }
  });

//--------------------- return to login page --------------------------
document.querySelector(".backArrow").addEventListener("click", () => {
  location.href = "/login/login.html";
});
