import axios from "axios";
import User, { UserSchema } from "../interfaces/user";

export const getData = async (url: string) => {
    let res: User = UserSchema
    await axios.get("http://localhost:5000/users/one" + url)
    .then(response => {
        res = response.data
    })
    .catch(err => {})
    return res
}

export const getNationalities = async () => {
    let res: string[] = []
    await axios.get("http://localhost:5000/nationalities")
    .then(response => {
        res = response.data
    })
    .catch(err => {})
    return res
}