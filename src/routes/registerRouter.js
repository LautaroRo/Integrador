import { Router } from "express";
//import { createHash } from "../utils.js";
import session from "express-session";
import connectMongo from "connect-mongo"
//import usersModel from "../dao/models/users.js";
import usersManager from "../dao/services/usersManager.js";
import passport from "passport";
import initializePassport from "../config/passportConfig.js";

const routerRegister = Router()

//const usersManagers = new usersManager()

initializePassport()
routerRegister.use(passport.initialize())
routerRegister.use(passport.session())


routerRegister.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({mongoUrl:"mongodb+srv://Lautaro:Ors6E5ixvF0N1pVh@cluster0.beeo5kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",ttl:3600})
}))
routerRegister.get("/register", ( req,res) => {
    if(req.session.user){
        req.session.destroy()
    }
    res.render("registerUsers")
})


routerRegister.post("/register/registerCreateUser", passport.authenticate("registrarse", {failureRedirect: ("/failRegister")}),
async(req,res) => {
    res.send({status:"Succes"})
})
routerRegister.get("/failRegister", async(req,res) => {
    console.log("error")
    res.send({error: "Error"})
})

/*--
routerRegister.post("/register/registerCreateUser", async (req, res) => {

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
        Password: createHash(Password)
    }

    req.session.user = {
        First_Name: First_Name,
        Last_Name: Last_Name,
        Email: Email,
        Age: Age,
    }
    usersManagers.createUser(info)

    res.render("BornUser", req.session.user)
})
--*/
export default routerRegister