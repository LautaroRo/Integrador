import { Router } from "express";
import usersModel from "../dao/models/users.js";
import session from "express-session";
import connectMongo from "connect-mongo"
import { isValidPassword } from "../utils.js";
const routerLogin = Router()


routerLogin.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({mongoUrl:"mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",ttl:3600})
}))
routerLogin.get("/LoginUser", (req,res) => {
    if(req.session.user){
        req.session.destroy()
    }
    res.render("LoginUsers")
})

routerLogin.post("/ShowTheUserLogin", async (req, res) => {
    const { Email, Password } = req.body

    const response = await usersModel.findOne({ Email: Email })
    const NoEncontrado = { 
        mensaje: "Usuario No encontrado"
    }

    const validPassword = isValidPassword(Password, response);

    if(validPassword){

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


export default routerLogin