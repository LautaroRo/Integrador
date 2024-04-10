const form = document.getElementById("formularioLogin")

form.addEventListener("submit", e => {
    e.preventDefault()

    const data = new FormData(form)
    const obj = {}

    data.forEach((key,value) => (obj[key] = value))

    fetch("/ShowTheUserLogin", {
        method:"Post",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(response.status === 200){
            window.location.replace("/")
        }
    })
})