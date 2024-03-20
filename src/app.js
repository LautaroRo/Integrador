import express from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import mongoose from "mongoose";
import  routerProduct  from "./routes/productRouter.js";
import cartRouter from "./routes/cartsRouter.js";
import messageManager from "./dao/services/meesagesManager.js";


const message = new messageManager

const app = express()
const PORT = process.env.PORT || 8080

app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+"/public"))
app.use(routerProduct)
app.use(cartRouter)
app.engine("handlebars", handlebars.engine())


const connectMongoDB = async () => {

    try{

        const dataBase = "mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        
        await mongoose.connect(dataBase)
        console.log("conectado")
    }catch(error){
        console.error("No se pudo conectar")
        process.exit()
    }

}

connectMongoDB()

const servidor = app.listen(PORT, () => console.log("servidor corriendo"))
const io = new Server(servidor)


app.get("/", async(req,res) => {
    const mensajes = await message.mostrarMensajes()
    let informacion = []
    for(let i = 0; mensajes.length > i; i++){
        const info = {
            nombre: mensajes[i].user,
            mensaje:mensajes[i].message
        }
        informacion.push(info)
    }
    console.log(informacion)
        res.render("home", {mensajes: informacion})


})

const msg = []

io.on("connection", socket => {

    socket.on("message", (data) => {

        msg.push(data)
        message.createUser(data)
        io.emit("messageLogs", msg)

    })

})