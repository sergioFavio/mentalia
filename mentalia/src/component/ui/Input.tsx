interface Props{
    placeholder:string
}

const Input = ({placeholder}:Props) => {
  return (
    <input placeholder={placeholder} className="w-full placeholder:text-gray-400 border-b-2 border-gray-300 focus:border-purple-800 text-sm px-2 py-1 outline-none"/>
  )
}

export default Input