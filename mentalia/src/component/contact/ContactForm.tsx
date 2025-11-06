import IconSend from "../../iconos/IconSend"
import CheckBox from "../ui/CheckBox"
import Input from "../ui/Input"


const ContactForm = () => {
  return (
    <form className="h-full w-96 gap-8 bg-white rounded-lg text-black p-8 flex flex-col overflow-hidden justify-between">
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4">
                <h3 className="font-bold">Tengo interés en ...</h3>
                <div className="flex gap-2 flex-wrap">
                    <CheckBox text="opción 1" name="interes"/>
                    <CheckBox text="opción 2" name="interes"/>
                    <CheckBox text="opción 3" name="interes"/>
                    <CheckBox text="opción 4" name="interes"/>
                    <CheckBox text="opción 5" name="interes"/>
                </div>
            </div>
            <Input placeholder="Your Name"/>
            <Input placeholder="Your Email"/>
            <Input placeholder="Your Message"/>
            <Input placeholder="Your Whatsapp/Telegram"/>
        </div>
        <button className="text-white bg-purple-800 border-purple-800 cursor-pointer px-2 py-1 text-sm border rounded-md w-fit">Enviar</button>
    </form>
  )
}

export default ContactForm