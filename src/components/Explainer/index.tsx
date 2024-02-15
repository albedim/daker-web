import React, { useState } from "react"
import { FiCopy } from "react-icons/fi"
import { MdDone } from "react-icons/md"

interface ExplainerProps{
	title: string
	value: any,
	selector?: any
	showSelector?: boolean
	description?: string
	showDescription?: boolean
}

const Explainer: React.FC<ExplainerProps> = ( props ) => {

	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		setCopied(true)
		if (props.value.props.hasOwnProperty('src')) {
			navigator.clipboard.writeText(JSON.stringify(props.value.props))
		} else {
			navigator.clipboard.writeText(props.value.props.children)
		}
		setTimeout(() => setCopied(false), 2400)
	}

	return(
		<div>
			<div className="justify-between flex">
				<div>
					<h2 className="font-semibold font-[Raleway]">{props.title}</h2>
					{props.showDescription ? (
						<p dangerouslySetInnerHTML={{ __html: props.description || ""}} className="text-sm font-medium font-[Raleway]"></p>
					): null}
				</div>
				{props.showSelector ? (
					props.selector
				): null}
			</div>
			<div className="mt-2">
				<div className="justify-between flex border bg-[white] rounded-md p-4">
					<div>{props.value}</div>
					<div className="items-center flex">
						{copied ? (
							<MdDone size={14}/>
						):(
							<button className="transition-all  hover:text-[orange]" onClick={handleCopy}>
								<FiCopy size={14}/>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Explainer