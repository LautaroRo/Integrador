import express from "express"
import __dirname from "../utils.js"
import handlebars from "express-handlebars"
import session from "express-session"
import connectMongo from "connect-mongo"
import mongoose from "mongoose";
import routerProduct from "../routes/productRouter.js"
import cartRouter from "../routes/cartsRouter.js";
import usersRouter from "../routes/usersRouter.js"
import { Server } from "socket.io"




const app = express()
const PORT = process.env.PORT || 8080

app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(routerProduct)
app.use(cartRouter)
app.use(usersRouter)
app.engine("handlebars", handlebars.engine())
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({mongoUrl:"mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",ttl:3600})
}))

const connectMongoDB = async () => {

    try {

        const dataBase = "mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect(dataBase)

        console.log("conectado")
    } catch (error) {
        console.error("No se pudo conectar")
        process.exit()
    }

}


connectMongoDB()

const servidor = app.listen(PORT, () => console.log("servidor corriendo"))
const io = new Server(servidor)


export default {io ,app}
