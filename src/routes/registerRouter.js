import { Router } from "express";
import session from "express-session";
import connectMongo from "connect-mongo"
import passport from "passport";

const routerRegister = Router()



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


export default routerRegister






