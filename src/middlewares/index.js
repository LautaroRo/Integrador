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
import usersManager from "../dao/services/usersManager.js"
import usersModel from "../dao/models/users.js"
const userManagers = new usersManager()


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


//Registrarse

app.get("/register", ( req,res) => {
    if(req.session.user){
        req.session.destroy()
    }
    res.render("registerUsers")
})

app.post("/register/registerCreateUser", async (req, res) => {

    const { First_Name, Last_Name, Email, Age, Number, Role, Password } = req.body

    const exists = await usersModel.findOne({ Email: Email })

    if (exists) return res.send("Este mail ya es utilizado")
    let info = {
        First_Name: First_Name,
        Last_Name: Last_Name,
        Email: Email,
        Age: Age,
        Number: Number,
        Role: Role,
        Password: Password
    }

    req.session.user = {
        First_Name: First_Name,
        Last_Name: Last_Name,
        Email: Email,
        Age: Age,
    }
    userManagers.createUser(info)

    res.render("BornUser", req.session.user)
})

//logearse
app.get("/LoginUser", (req,res) => {
    if(req.session.user){
        req.session.destroy()
    }
    res.render("LoginUsers")
})

app.post("/ShowTheUserLogin", async (req, res) => {
    const { Email, Password } = req.body

    const response = await userManagers.SiginInUsers(Email, Password)
    const NoEncontrado = { 
        mensaje: "Usuario No encontrado"
    }

    if(response){

            req.session.user = {
            First_Name: response.First_Name,
            Last_Name: response.Last_Name,
            Age: response.Age,
            Email: response.Email
        }

        console.log(req.session.user)
        res.render("UserLogin", req.session.user)
    }else{
        res.render("LoginUsers", NoEncontrado )
    }
})

//mostrar el usuario en linea
app.get("/UserLogin", (req,res) => {

    res.render("UserLogin", req.session.user)

})

export default {io ,app}
