
import ProductManager from "../dao/services/productManager.js";
import { Router } from "express";

const productManager = new ProductManager()
const routerProduct = Router()


routerProduct.get("/products", async(req,res) => {

    const response = await productManager.getAll()

    res.json({response})
})

routerProduct.post("/products/agregar", async(req,res) => {
    
    const newProduct = req.body

    let result = await productManager.addProduct(newProduct)

    res.json({result})

})

routerProduct.put("/products/modificar/:id", async(req,res) => {
    
    const newProduct = req.body
    const params = req.params.id

    let result = await productManager.updateProduct(newProduct,params)

    res.json({result})

})

routerProduct.get("/products/:id", async(req,res) => {

    const params = req.params.id

    let result = await productManager.getById(params)

    res.json({result})

})

routerProduct.delete("/delete/product/:id", async(req,res) => {

        const params = req.params.id

        await productManager.deleteProduct(params)

        res.send({status:"Eliminado con exito"})
})

export default routerProduct