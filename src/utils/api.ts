import axios from "axios";
import User, { UserSchema } from "../interfaces/user";

//export const BASE_URL = "http://localhost:5000/users/one"
export const BASE_URL = "https://daker.pythonanywhere.com/users/one"

export const getData = async (url: string) => {
    let res: User = UserSchema
    await axios.get(url)
    .then(response => {
        res = response.data
    })
    .catch(err => {})
    return res
}

export const getNationalities = async () => {
    let res: string[] = []
    await axios.get("https://daker.pythonanywhere.com/nationalities")
    .then(response => {
        res = response.data
    })
    .catch(err => {})
    return res
}