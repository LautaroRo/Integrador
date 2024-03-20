
const socket = io()

let user;

const open = () => {
    
    window.onload = () => {
    Swal.fire({
        title:"Identificate",
        text:"Ingrese su nombre de usuario",
        input:"text",
        inputValidator: (value) => {

            return !value && "Necesitas escribir un nombre para continuar"

        },
        confirmButtonText:"OK"
    }).then((result) => {
        console.log(result)
        user = result.value
        socket.emit("auth",user)
    })
    }
}

open()
const input = document.getElementById("chatbox")
const log = document.getElementById("log")


input.addEventListener("keyup", e => {
    
    if(e.key === "Enter"){

        socket.emit("message",{ user: user, message: input.value })

    }

})


socket.on("messageLogs", data => {

    let messages = ""
    console.log(data)
    data.forEach(msg => {
        messages+=`${msg.user} dice ${msg.message}</br>`
    })

    log.innerHTML=messages
})


