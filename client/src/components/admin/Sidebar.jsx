import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
const Sidebar = () => {
    return (
        <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">


            <NavLink end={true} to="/admin" className={({isActive}) => `flex items-center 
            gap-3 py-3.5  px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"} `}>
                <img src={assets.home_icon} alt="home_icon" className="min-w-4 w-5" />
                {/* check here it is hidden property */}
                <p className=" md:inline-block">Dashboard</p>
            </NavLink>

            <NavLink to="/admin/addBlog" className={({isActive}) => `flex items-center 
            gap-3 py-3.5  px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"} `}>
                <img src={assets.add_icon} alt="home_icon" className="min-w-4 w-5" />
                {/* check here it is hidden property */}
                <p className=" md:inline-block">Add blogs</p>
            </NavLink>

            <NavLink to="/admin/listBlog" className={({isActive}) => `flex items-center 
            gap-3 py-3.5  px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"} `}>
                <img src={assets.list_icon} alt="home_icon" className="min-w-4 w-5" />
                {/* check here it is hidden property */}
                <p className=" md:inline-block">Blog lists</p>
            </NavLink>


            <NavLink to="/admin/comments" className={({isActive}) => `flex items-center 
            gap-3 py-3.5  px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"} `}>
                <img src={assets.comment_icon} alt="home_icon" className="min-w-4 w-5" />
                {/* check here it is hidden property */}
                <p className=" md:inline-block">Comments</p>
            </NavLink>


        </div>
    )
}

export default Sidebar;