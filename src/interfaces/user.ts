interface User {
    name: string,
    surname: string,
    address: Address,
    birth_date: string,
    phone_number: string,
    nationality: string,
    profession: string,
    sex: string,
    image: string
}

interface Address {
    country: Country,
    street: string
}

interface Country {
    code: string,
    name: string
}

export const UserSchema = {
    name: "",
    surname: "",
    address: {
        country: {
            code: "",
            name: ""
        },
        street: ""
    },
    birth_date: "",
    phone_number: "",
    nationality: "",
    profession: "",
    sex: "",
    image: ""
}

export default User