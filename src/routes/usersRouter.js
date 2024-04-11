import { Router } from "express";
import usersManager from "../dao/services/usersManager.js";
import usersModel from "../dao/models/users.js";


const userManagers = new usersManager()
const router = Router()






router.get("/showTheUsers/:limite?", async (req, res) => {

    const limite = req.params.limite
    let pages = parseInt(req.query.pages)
    if (!pages) pages = 1
    const result = await userManagers.getAllUsers(limite, pages)


    res.render("users", result)

})

router.get("/UserFound", async (req, res) => {

    const { _id } = req.query
    const result = await userManagers.FindUser(_id)

    if (!result) {
        return res.send("Usuario no encontrado")
    } else {
        res.render("SearchUser", result)
    }

})


export default router