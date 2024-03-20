import mongoose from "mongoose"

const {Schema} = mongoose

const collection = "products"

const schema = new Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true 
    },
    brands: {
        type: String
    },
    stock: {
        type: Number,
        require: true 
    },
    thumbnails: {
        type: [String],
        require: true 
    },
    status: {
        type: Boolean,
        require: true 
    },
    price: {
        type: Number,
        require: true 
    }
});
const productsModel = mongoose.model(collection, schema)

export default productsModel
