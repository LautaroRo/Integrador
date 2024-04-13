import { Router } from "express";
import usersManager from "../dao/services/usersManager.js";
import usersModel from "../dao/models/users.js";
import { createHash } from "../utils.js";

const userManagers = new usersManager()
const routerUsers = Router()






routerUsers.get("/showTheUsers/:limite?", async (req, res) => {

    const limite = req.params.limite
    let pages = parseInt(req.query.pages)
    if (!pages) pages = 1
    const result = await userManagers.getAllUsers(limite, pages)


    res.render("users", result)

})

routerUsers.get("/UserFound", async (req, res) => {

    const { _id } = req.query
    const result = await userManagers.FindUser(_id)

    if (!result) {
        return res.send("Usuario no encontrado")
    } else {
        res.render("SearchUser", result)
    }

})


routerUsers.get("/restorePassword", (req,res) => {
    res.render("restore")
})

routerUsers.post("/formRestore", async(req,res) => {

    const {Email, Password} = req.body

    const perfil = await usersModel.findOne({Email: Email})

    perfil.Password = createHash(Password)

    await  perfil.save()


    console.log(perfil)
    res.send("enviados")

})


routerUsers.get("/UserLogin", (req,res) => {
    if(!req.session.user){
        res.render("LoginUsers")
    }
    res.render("UserLogin", req.session.user)

})
export default routerUsers