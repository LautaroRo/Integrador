import { Router } from "express";
import usersManager from "../dao/services/usersManager.js";
import usersModel from "../dao/models/users.js";


const userManagers = new usersManager()
const router = Router()

router.get("/register", (req, res) => {
    let info = false
    res.render("registerUsers", info)
})

router.post("/register/registerCreateUser", async (req, res) => {

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

    userManagers.createUser(info)

    res.render("BornUser", info)
})


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

router.get("/LoginnUser", (req,res) => {

    res.render("LoginUsers")
})
router.post("/ShowTheUserLogin", async (req, res) => {
    const { Email, Password } = req.body

    const response = await userManagers.SiginInUsers(Email, Password)
    const NoEncontrado = { 
        mensaje: "Usuario No encontrado"
    }

    if(response){

            req.session.user = {
            First_Name: response.First_Name,
            Age: response.Age,
            Email: response.Email
        }

        console.log(req.session.user)
        res.render("UserLogin", req.session.user)
    }else{
        res.render("LoginUsers", NoEncontrado )
    }

})
export default router