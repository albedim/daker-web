import React from "react"

interface SelectProps{
    name: string,
    id: string,
    className: string,
    disabled: boolean,
    onChange: (e: any) => void,
    value: string,
    children: any
}

const Select: React.FC<SelectProps> = (props) => {
    if (!props.disabled) {
        return (
            <select value={props.value} onChange={props.onChange} className={props.className} name={props.name} id={props.id}>
                {props.children}
            </select>
        )
    }
    return null;
}

export default Select