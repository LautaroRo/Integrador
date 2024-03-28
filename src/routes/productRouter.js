import ProductManager from "../dao/services/productManager.js";
import productsModel from "../dao/models/products.js";
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


routerProduct.get("/mostrar/productos/:limit?", async(req,res) => {

    let limite = req.params.limit
    let page = parseInt(req.query.page)
    if(!page) page = 1

    if(limite !== undefined){
        parseInt(limite)
    }else{
        limite = 10
    }

    const response = await productsModel.paginate({}, {page,limit: limite,lean: true})
    response.isValid = page >= 1 && page <= response.totalPages
    response.NextLink = response.hasNextPage ?`http://localhost:8080/mostrar/productos/${limite}?page=${response.nextPage}` : ""
    response.PrevLink = response.hasPrevPage ? `http://localhost:8080/mostrar/productos/${limite}?page=${response.prevPage}` : ""

    res.render("products", response)

})
export default routerProduct