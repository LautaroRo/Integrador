import passport from "passport";
import local from "passport-local"
import usersModel from "../dao/models/users.js";
import {createHash, isValidPassword} from "../utils.js"


const LocalStrategy = local.Strategy;


const initializePassport = () => {

    passport.use(
        "registrarse",
        new LocalStrategy(
            {passReqToCallback: true, usernameField: "Email"},
        async(req,username,password, done) => {
        console.log("Entro")
        const { First_Name, Last_Name, Email, Age, Number, Role } = req.body;

        try{

            const user = await usersModel.findOne({Email: username})

            if(user){
                console.log("el usuario existe")
                return done(null,false)
            }

            const newUser = {
                First_Name: First_Name,
                Last_Name: Last_Name,
                Email: Email,
                Age: Age,
                Number: Number,
                Role: Role,
                Password: createHash(password)
            }

            console.log(newUser)
            const result = await usersModel.create(newUser)

            return done(null,result)

        }catch (error){
            return done(error)
        }
    }
)
)

passport.serializeUser((user,done) => {
    done(null,user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersModel.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});
}

export default initializePassport