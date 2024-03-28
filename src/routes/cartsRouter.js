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

cartRouter.delete("/api/cards/:cid/:pid", (req,res) => {

    const paramsCarrito = req.params.cid
    const paramsProducto = req.params.pid
    cart.deleteProduct(paramsCarrito,paramsProducto)

    res.send({status: "Eliminad con exito"})
})

cartRouter.put("/api/carts/:cid", (req,res) => {

    const params = req.params.cid

    cart.updateProduct(params,req.body)
    res.send({status:"Encontrado"})
})

cartRouter.put("/api/carts/:cid/product/:pid", (req,res) => {

    const paramsCarrito = req.params.cid
    const paramsProducto = req.params.pid
    const body = req.body
    cart.updateProductInCart(paramsCarrito,paramsProducto,body)
    res.send({status:"Encontrado"})

})

cartRouter.get("/api/cart/allProducts/:cid", async(req,res) => {

    const params = req.params.cid

    await cart.deleteAllProduct(params)

    res.send({status:"Eliminado"})
})
export default cartRouter