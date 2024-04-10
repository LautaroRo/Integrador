import mongoose from "mongoose"
import mongosePaginate from "mongoose-paginate-v2"
const {Schema} = mongoose


const collection = "Users"


const schema = new Schema({

    First_Name:{
        type:String,
        required: true
    },
    Last_Name:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Age:{
        type:Number,
        required: true
    },
    Number:{
        type:Number,
        required: true
    },
    Role:{
        type:String,
        required: true
    },
    Password: {
        type:String,
        required: true
    }

})


schema.plugin(mongosePaginate);
const usersModel = mongoose.model(collection, schema)

export default usersModel