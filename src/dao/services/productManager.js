import productsModel from "../models/products.js"

export default class ProductManager {

    constructor(){
        console.log("Trabajando")
    }


    getAll = async(limit) => {
        let result = await productsModel.find().limit(limit)

        return result
    }

    getById = async(id) => {

        let result = await productsModel.findById(id)

            return result


    }

    getByBrand = async(brand) => {
        
        let result = await productsModel.findOne({brand: brand})

        return result

    }

    addProduct = async(product) => {

        let result = await productsModel.create(product)

        return result
    }

    updateProduct = async(product, id) => {
        let result = await productsModel.updateOne({_id: id}, {$set: product})
        console.log(result)
        return result
    }

    deleteProduct = async(id) => {

        let result = await productsModel.deleteOne({_id:id})
        console.log(result)
        return result
    }


}