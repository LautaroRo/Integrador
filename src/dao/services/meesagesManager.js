import messagesModel from "../models/messages.js"


export default class messageManager{

    constructor(){
        console.log("trabajando")
    }


    createUser = async(user) => {
        let result = await messagesModel.create(user)
        return result
    }

    mostrarMensajes = async() => {

        let result = await messagesModel.find()

        return result

    }
}