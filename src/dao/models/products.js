import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const {Schema} = mongoose

const collection = "products"

const thumbnailSchema = new Schema({

    img: {
        type: String,
        required: true
    }
});

const schema = new Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true 
    },
    brands: {
        type: String
    },
    stock: {
        type: Number,
        required: true 
    },
    thumbnails: {
        type: [thumbnailSchema], 
        required: true 
    },
    status: {
        type: Boolean,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    }
});




schema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, schema);

export default productsModel;