import express from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose";
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import routerProduct from "./routes/productRouter.js"
import cartRouter from "./routes/cartsRouter.js";
import usersRouter from "./routes/usersRouter.js"
import routerLogin from "./routes/loginRouter.js"
import routerRegister from "./routes/registerRouter.js"
import { Server } from "socket.io"
import messages from "./dao/services/meesagesManager.js"

// Initialize
const app = express()
const PORT = process.env.PORT || 8080
const MONGO_URL = "mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// Settings
app.set("PORT", PORT)
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars.engine())

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        ttl: 3600
    }),
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(routerProduct)
app.use(cartRouter)
app.use(usersRouter)
app.use(routerLogin)
app.use(routerRegister)

// Listeners


const connectMongoDB = async () => {

    try {       
        await mongoose.connect(MONGO_URL)
        console.log("conectado")
    } catch (error) {
        console.error("No se pudo conectar a Mongo" + error)
        process.exit()
    }


}
connectMongoDB()

const servidor = app.listen(PORT, () => console.log("servidor corriendo"))
const io = new Server(servidor)






const message = new messages

app.get("/", async (req, res) => {
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

io.on("connection", socket => {

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