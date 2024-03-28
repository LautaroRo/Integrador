import cartsModel from "../models/carts.js";


export default class cartManager {

    constructor(){
        console.log("Trabajando")
    }

    getCartById = async(id) => {

        result = await cartsModel.findById(id)

        return result
    }

    createCart = async () => {

        let result = await cartsModel.create({})

        return result
    }

    addProduct = async (cid, pid, cantidad) => {
        let cart = await cartsModel.findById(cid);
        let product = cart.productsCart.find((producto) =>  producto.product.toString() === pid);
        const quantity = parseInt( cantidad)
        if(product){
            product.quantity += quantity;
        } else {
            cart.productsCart.push({ product: pid, quantity });
        }
    
        return await cart.save();
    }

    deleteProduct = async(cid,pid) => {
        let cart = await cartsModel.findById(cid)
        cart.productsCart = cart.productsCart.filter(element => element.product.toString() !== pid)

        await cart.save();

        console.log("Producto eliminado del carrito");
    }

    updateProduct = async(cid,body) => {
        let cart = await cartsModel.findById(cid)
        await cartsModel.updateOne({_id: cid}, {$set: body})
        await cart.save();
    }        

    updateProductInCart = async(cid,pid,body) => {

        let cart = await cartsModel.findById(cid)
        
        const filtrado = cart.productsCart = cart.productsCart.find(element => element.product.toString() == pid)


        filtrado.quantity = body.quantity;

        await cart.save();
    }
    deleteAllProduct = async(cid) => {

        let cart = await cartsModel.findById(cid)

        cart.productsCart = []
        await cart.save();
    }

}