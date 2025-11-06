import { useId } from "react"

interface Props{
    text:string
    name:string
}

const CheckBox = ({text, name}:Props) => {
    const id=useId()
  return (
    <div className="contents">
        <input id={id} name={name} type="checkbox" className="hidden peer"/>
        <label htmlFor={id} className="peer-checked:text-white peer-checked:bg-purple-800 peer-checked:border-purple-800 cursor-pointer px-2 py-1 text-sm border border-gray-300 text-gray-400 rounded-md">
            {text}
        </label>
    </div>
  )
}

export default CheckBox