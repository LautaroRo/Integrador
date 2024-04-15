/*--const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("hola")
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    //hacer el fetch
    fetch("/register/registerCreateUser", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });


});--*/