import React from "react"
import User from "../../interfaces/user"

interface UserProps{
    data: User
}

const UserComponent: React.FC<UserProps> = ( props ) => {
    return(
        <div className="border-[orange] p-4 border-2 rounded-xl border items-center flex">
            <div>
                <img width={184} src={props.data?.image} alt="" />
            </div>
            <div>
                <div>
                    <Attribute vkey="Full Name" value={props.data?.name + " " + props.data?.surname}/>
                    <Attribute vkey="Sex" value={props.data?.sex}/>
                    <Attribute vkey="Nationality" value={props.data?.nationality}/>
                    <Attribute vkey="Birth date" value={props.data?.birth_date}/>
                </div>
                <div className="mt-2">
                    <Attribute vkey="Phone Number" value={props.data?.phone_number}/>
                    <Attribute vkey="Profession" value={props.data?.profession}/>
                    <a title={props.data?.address.street + ", " + props.data?.address.country.name + ", " + props.data?.address.country.code} href="">
                        <div className="items-center flex" >
                            <p className="font-semibold font-[Raleway] text-xl">Address</p> 
                            <p className="text-[orange]" >➜</p> 
                            <p className="font-normal font-[Raleway] text-xl">{props.data?.address.street.length + props.data?.address.country.name.length > 24 ? (props.data?.address.street + ", " + props.data?.address.country.name + ", " + props.data?.address.country.code).substring(0,24) + "..." : props.data?.address.street + ", " + props.data?.address.country.name + ", " + props.data?.address.country.code}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UserComponent

interface AttributeProps{
    vkey: string,
    value: string
}

const Attribute: React.FC<AttributeProps> = (props) => {
    console.log(props)
    return (
        <div className="items-center flex" >
            <p className="font-semibold font-[Raleway] text-xl">{props.vkey}</p>
            <p className="pr-1 pl-1 font-normal text-[orange]" >➜</p>
            <p> {props.value}</p>
        </div>
    )
}