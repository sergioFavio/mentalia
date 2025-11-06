import ContactForm from "../component/contact/ContactForm"
import IconFacebook from "../iconos/IconFacebook"
import IconInstagram from "../iconos/IconInstagram"
import IconMail from "../iconos/IconMail"
import IconMapPin from "../iconos/IconMapPin"
import IconTelephone from "../iconos/IconTelephone"
import IconX from "../iconos/IconX"


const ContactPage = () => {
  return (
    <div className="text-white w-full h-full flex items-center justify-center">
        <main className="h-[65%] flex">
            <aside className="h-full w-80 flex flex-col justify-between">
                <div className="flex flex-col gap-12">
                    <h2 className="text-3xl font-bold">Let’s discuss on something <span className="text-purple-500">cool</span> together</h2>
                    <div className="flex flex-col gap-4">
                        <button className="hover:bg-purple-500/20 flex gap-4 p-2 justify-start items-center ring-0 ring-purple-500 ring-inset hover:ring-2 rounded-md transition-all duration-300 hover:text-purple-600">
                            <div className="w-6 h-6"><IconMail/></div>
                            <p className="!text-white">info@tecnopolis.ai</p>
                        </button>
                        <button className="hover:bg-purple-500/20 flex gap-4 p-2 justify-start items-center ring-0 ring-purple-500 ring-inset hover:ring-2 rounded-md transition-all duration-300 hover:text-purple-600">
                            <div className="w-6 h-6"><IconTelephone/></div>
                            <p className="!text-white">+56 9 2909 9893</p>
                        </button>
                        <button className="hover:bg-purple-500/20 flex gap-4 p-2 justify-start items-center ring-0 ring-purple-500 ring-inset hover:ring-2 rounded-md transition-all duration-300 hover:text-purple-600">
                            <div className="w-6 h-6"><IconMapPin/></div>
                            <p className="!text-white">123 Sreet House</p>
                        </button>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="p-2 rounded-full hover:bg-purple-500 transition-all duration-300">
                        <div className="w-6 h-6"><IconFacebook/></div>
                    </button>
                    <button className="p-2 rounded-full hover:bg-purple-500 transition-all duration-300">
                        <div className="w-6 h-6"><IconInstagram/></div>
                    </button>
                    <button className="p-2 rounded-full hover:bg-purple-500 transition-all duration-300">
                        <div className="w-6 h-6"><IconX/></div>
                    </button>
                </div>
            </aside>
            <ContactForm/>


        </main>
    </div>
  )
}

export default ContactPage