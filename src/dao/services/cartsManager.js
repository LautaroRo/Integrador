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


}