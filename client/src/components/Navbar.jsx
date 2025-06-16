import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const {navigator, token} = useAppContext()
    return (
        <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
            <img onClick={() => navigator("/")} src={assets.logo} alt="logo"  className="w-32 sm:w-44 cursor-pointer"/>
            <button  onClick={() => navigator("/admin")} className="flex items-center gap-2 rounded-full text-sm
            cursor-pointer bg-primary text-white px-10 py-2.5">{token ? "Dashboard" : "Login"}
                <img src={assets.arrow} alt="arrow" className="w-3" />
            </button>
        </div>
    )
}

export default Navbar;