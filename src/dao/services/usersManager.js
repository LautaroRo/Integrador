import usersModel from "../models/users.js";

export default class usersManager{

    createUser = async (user) => {

        let result = await usersModel.create(user)

        return result
    }

    FindUser = async (id) => {

        let result = await usersModel.findById(id)
        
        return result
    }

    getAllUsers = async(limite,page) => {

        let limites = limite

        if(limite === undefined){
            limites = 10
        }else{
            parseInt(limites)
        }


        const response = await usersModel.paginate({}, {page, limit: limites, lean:true})


        response.isValid = page>= 1 && page <= response.totalPages
        response.NextLink = response.hasNextPage ?`http://localhost:8080/showTheUsers/${limites}?pages=${response.nextPage}` : ""
        response.PrevLink = response.hasPrevPage ? `http://localhost:8080/showTheUsers/${limites}?pages=${response.prevPage}` : ""

        return response
    }


    SiginInUsers = async(email,password) => {

        const search = await usersModel.findOne({Email: email, Password: password })

        return search
    }

}