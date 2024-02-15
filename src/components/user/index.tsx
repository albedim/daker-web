import React, { useState } from "react"
import { FiCopy } from 'react-icons/fi'
import User from "../../interfaces/user"
import { MdDone } from "react-icons/md"

interface UserProps{
    data: User,
    loading: boolean
}

const UserComponent: React.FC<UserProps> = ( props ) => {
    
    const [copied, setCopied] = useState(false)

    if (!props.loading) {    
        return(
            <div className="justify-between bg-opacity-10 bg-[orange] p-4 rounded-md border flex">
                <div className="items-center flex">
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
                        <div className="pt-4 border-t mt-2">
                            <Attribute vkey="Phone Number" value={props.data?.phone_number}/>
                            <Attribute vkey="Profession" value={props.data?.profession}/>
                            <a title={props.data?.address.street + ", " + props.data?.address.country.name + ", " + props.data?.address.country.code} href="">
                                <Attribute vkey="Address" value={props.data?.address.street.length + props.data?.address.country.name.length > 24 ? (props.data?.address.street + ", " + props.data?.address.country.name + ", " + props.data?.address.country.code).substring(0,24) + "..." : props.data?.address.street + ", " + props.data?.address.country.name + ", " + props.data?.address.country.code}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    {copied ? (
                        <MdDone size={24}/>
                    ):(
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(JSON.stringify(props.data))
                                setCopied(true)
                                setTimeout(() => {
                                    setCopied(false)
                                }, 2000)
                            }}>
                            <FiCopy size={24}/>
                        </button>
                    )}
                </div>
            </div>
        )
    }
    return(
        <div className="justify-between bg-opacity-10 bg-[orange] p-4 rounded-xl border flex">
            <div className="items-center flex">
                <div>
                    <div className="mt-1 rounded-full bg-[#e3e3e3] w-44 h-44"></div>
                </div>
                <div>
                    <div>
                        <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                        <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                        <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                        <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                    </div>
                    <div className="pt-4 border-t mt-2">
                    <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                    <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                        <div className="items-center flex" >
                        <div className="mt-1 rounded-md bg-[#e3e3e3] w-96 h-6"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(props.data))}>
                    <FiCopy size={24}/>
                </button>
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