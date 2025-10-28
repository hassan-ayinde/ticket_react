import { BsTicket } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="wavy-bg relative h-140">
      {/* Decorative Circles */}
      <div
        className="circle"
        style={{ width: "150px", height: "150px", top: "10%", left: "5%" }}
      ></div>
      <div
        className="circle"
        style={{ width: "50px", height: "50px", top: "20%", right: "15%" }}
      ></div>
      <div
        className="circle"
        style={{ width: "100px", height: "100px", bottom: "25%", right: "5%" }}
      ></div>
      <div
        className="circle"
        style={{ width: "80px", height: "80px", top: "60%", left: "15%" }}
      ></div>
      <section className="flex items-center justify-between w-[75%]  mx-auto pt-5">
        <div className="flex items-center gap-4 text-white font-bold text-2xl">
          <BsTicket />
          <h1 className="hidden md:block">SupportFlow</h1>
        </div>
        <nav>
          <ul className="flex gap-8 text-white font-medium">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Register</Link>
            </li>
          </ul>
        </nav>
      </section>
      {/* Hero Content */}
      <section className="w-[75%] mx-auto grid md:grid-cols-2 gap-12">
        <div className="mt-10 gap-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tighter">
            Streamline Your Support with SupportFlow
          </h1>
          <h2 className="text-white/90 text-sm md:text-xl font-normal leading-8 max-w-xl">
            The effortless way to manage customer support tickets, so you can
            focus on what matters most: your customers.
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6 justify-center lg:justify-start">
            <button className="flex min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-gray-100 text-white text-base font-bold leading-normal tracking-wide transition-transform hover:scale-105">
              <span className="truncate text-gray-700">Get Started</span>
            </button>
            <button className="flex md:hidden min-w-[140px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white/20 text-white text-base font-bold leading-normal tracking-wide transition-colors hover:bg-white/30">
              <span className="truncate">Login</span>
            </button>
          </div>
        </div>

        <div className="hidden md:block mt-10 z-10">
          <img
            alt="SupportFlow application dashboard screenshot showing tickets and analytics."
            className="w-full h-auto rounded-xl shadow-2xl transform lg:rotate-3 lg:scale-100"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBegnsckiuGwRiflMajv3PtyQD4j9H4ODt8ntfTBZG0tZg0n-9p317rG7nIYiLvrfYkTMyQHMclK1ZejMC5Mnx3LdzVTTRNl7amyfYwg4po-UklmUS1lgubneGegf44wrEkgqyIwgKe9k7ZF9MW_UOIHgcavlT6chw6TTBaAaCXG2dbYl8wyRe_Vn0gJYqtoRKVPAtxt6_sF_dhI6O54VGtfxX0SOchhNegDAuz8ROkmjVtmak8UUA6ABt0_lJI_IZUvj_RgEZaXe8"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
