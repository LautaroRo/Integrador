import messages from "./dao/services/meesagesManager.js"
import server from "./../src/middlewares/index.js"

const message = new messages

server.app.get("/", async (req, res) => {
    const mensajes = await message.mostrarMensajes()
    let informacion = []
    for (let i = 0; mensajes.length > i; i++) {
        const info = {
            nombre: mensajes[i].user,
            mensaje: mensajes[i].message
        }
        informacion.push(info)
    }
    console.log(informacion)
    res.render("home", { mensajes: informacion })


})

const msg = []

server.io.on("connection", socket => {

    socket.on("message", (data) => {

        msg.push(data)
        message.createUser(data)
        io.emit("messageLogs", msg)

    })

})



//authentication
/*--
function auth(req,res,next){

    if(req.session.username === "Lautaro" || req.session.admin){

        return next()
    }else{
        res.send("No estas autorizado")
    }
}



app.get("/privado",auth, (req,res) => {

    res.send("Estas en el mejor lugar")
})






app.get("/session", (req, res) => {

    if (req.session.counter) {
        req.session.counter++

        return res.send("Bienvenido" + req.session.counter)
    } else {
        req.session.counter = 1
        return res.send("Bienvenido")
    }

})

app.get("/destroy", (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.send("Error")
        }
        else{
            return res.send("eliminado con exito")
        }
    })

})

app.get("/login", (req,res) => {

    const {username,password} = req.query

    if(username !== "Lautaro" || password !== "Kong"){
        return res.send("Error al inicar sesion")
    }

    req.session.user = username
    req.session.admin = true

    return res.send("Usuario logeado con exito " + username)
})--*/