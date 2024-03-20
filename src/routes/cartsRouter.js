import cartManager from "../dao/services/cartsManager.js";
import { Router } from "express";

const cartRouter = Router()
const cart = new cartManager()


cartRouter.post("/carrito", (req,res) => {

    cart.createCart()

    res.send({status:"Carrito creado"})
})

cartRouter.post("/carrito/agregar/:idCarrito/:idProduct/:cantidad", (req,res) => {

    const paramsCarrito = req.params.idCarrito
    const paramsProducto = req.params.idProduct
    const paramsCantidad = req.params.cantidad

    cart.addProduct(paramsCarrito,paramsProducto,paramsCantidad)

    res.send({status:"Producto agregado"})
})
export default cartRouter