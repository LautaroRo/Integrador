import {fileURLToPath} from "url"
import { dirname } from "path";
import bcrypt from "bcrypt"

const __filname = fileURLToPath(import.meta.url)
const __dirname = dirname(__filname)

export const createHash = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.Password) 
export default __dirname