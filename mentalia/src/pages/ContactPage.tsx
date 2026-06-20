import ContactForm from "../component/contact/ContactForm";
import IconFacebook from "../iconos/IconFacebook";
import IconInstagram from "../iconos/IconInstagram";
import IconMail from "../iconos/IconMail";
import IconMapPin from "../iconos/IconMapPin";
import IconTelephone from "../iconos/IconTelephone";
import IconX from "../iconos/IconX";

const ContactPage = () => {
  return (
    <div className="text-white w-full min-h-screen flex items-center justify-center py-8 px-4">
      <main className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
        <aside className="w-full lg:w-64 flex flex-col justify-between gap-8 lg:gap-0">
          <div className="flex flex-col gap-6 lg:gap-12">
            <h2 className="hidden lg:block text-2xl md:text-3xl font-bold text-center lg:text-left">
              Ponte en <span className="text-purple-500">contacto</span> con
              nosotros
            </h2>

            <div className="flex flex-col gap-3 lg:gap-4">
              <button className="hover:bg-purple-500/20 flex gap-4 p-2 justify-start items-center ring-0 ring-purple-500 ring-inset hover:ring-2 rounded-md transition-all duration-300 hover:text-purple-600 w-full">
                <div className="w-6 h-6 flex-shrink-0">
                  <IconMail />
                </div>
                <p className="!text-white text-sm md:text-base truncate">
                  info@tecnopolis.ai
                </p>
              </button>

              <button className="hover:bg-purple-500/20 flex gap-4 p-2 justify-start items-center ring-0 ring-purple-500 ring-inset hover:ring-2 rounded-md transition-all duration-300 hover:text-purple-600 w-full">
                <div className="w-6 h-6 flex-shrink-0">
                  <IconTelephone />
                </div>
                <p className="!text-white text-sm md:text-base">
                  +56 9 2909 9893
                </p>
              </button>

              <button className="hover:bg-purple-500/20 flex gap-4 p-2 justify-start items-center ring-0 ring-purple-500 ring-inset hover:ring-2 rounded-md transition-all duration-300 hover:text-purple-600 w-full">
                <div className="w-6 h-6 flex-shrink-0">
                  <IconMapPin />
                </div>
                <p className="!text-white text-sm md:text-base">
                  123 Street House
                </p>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center lg:justify-start gap-4 mt-4 lg:mt-6">
            <button className="p-2 rounded-full hover:bg-purple-500 transition-all duration-300">
              <div className="w-6 h-6">
                <IconFacebook />
              </div>
            </button>
            <button className="p-2 rounded-full hover:bg-purple-500 transition-all duration-300">
              <div className="w-6 h-6">
                <IconInstagram />
              </div>
            </button>
            <button className="p-2 rounded-full hover:bg-purple-500 transition-all duration-300">
              <div className="w-6 h-6">
                <IconX />
              </div>
            </button>
          </div>
        </aside>

        <ContactForm />
      </main>
    </div>
  );
};

export default ContactPage;
