import mongoose from "mongoose"
const {Schema} = mongoose


const collection = "carts"

const schema = new Schema({
    productsCart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: "products"
        },
        quantity: {
            type: Number,
            required: true
        }
    }]


})


const cartsModel = mongoose.model(collection, schema)

export default cartsModel
