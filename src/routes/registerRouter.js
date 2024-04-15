import { Router } from "express";
import passport from "passport";

const routerRegister = Router()


routerRegister.get("/register", ( req,res) => {
    if(req.session.user){
        req.session.destroy()
    }
    res.render("registerUsers")
})


routerRegister.post("/register/registerCreateUser", passport.authenticate("registrarse", {failureRedirect: ("/failRegister"), successRedirect: ("/LoginUser")}),
async(req,res) => {
    res.send({status:"Succes"})
})
routerRegister.get("/failRegister", async(req,res) => {
    console.log("errorR")
    res.send({error: "Error"})
})


export default routerRegister






