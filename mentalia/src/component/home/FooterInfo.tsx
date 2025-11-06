import { Link } from "react-router-dom"


interface Props{
    linking:string
    title:string
    content:string
}

const FooterInfo = ({ linking,title,content}:Props) => {
  return (
    <div className="bg-black p-4 flex flex-col gap-2 w-80">
        <h2 className="w-full text-center text-white font-medium"> <Link to={linking} className="text-white">{title}</Link></h2>
        <p className="text-white text-sm opacity-80">{content}</p>
    </div>
  )
}

export default FooterInfo