import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import FooterInfo from "../component/home/FooterInfo";

const LayoutFooter = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex relative">
      <Header />
      <Outlet />
      <footer className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
        <FooterInfo linking="/what_we_do" title="What we Do" content=" " />
        <FooterInfo linking="/technology" title="Technologies" content=" " />
        <FooterInfo linking="/spread_fx_gallery" title="Blog" content=" " />
      </footer>
    </div>
  );
};

export default LayoutFooter;
