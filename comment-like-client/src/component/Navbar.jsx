import React, { useState } from "react";
import { Bell, MessageCircle, Home, Users } from "lucide-react";
import logo from '../assets/images/logo.svg'
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import profileImg from '../assets/images/profile.png'
import Swal from "sweetalert2";

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const { user, setUser, loading, logoutUser } = useAuth();
    // const navigate = useNavigate();
    if (loading) {
        return <p>Loading...</p>
    }
    const handleLogout = () => {
        logoutUser()
            .then(() => {
                setUser(null);
                Swal.fire({
                    title: "Successfull Logout",
                    icon: "success"
                });

            })
    }
    return (
        <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="" />
            </div>

            {/* Search */}
            <div className="flex-1 mx-6">
                <input
                    type="text"
                    placeholder="input search text"
                    className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Icons & Profile */}
            <div className="flex items-center space-x-4">
                <Home className="w-6 h-6 text-gray-600 cursor-pointer" />
                <Users className="w-6 h-6 text-gray-600 cursor-pointer" />
                <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                        6
                    </span>
                </div>
                <div className="relative">
                    <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full px-1.5">
                        2
                    </span>
                </div>
                <div onMouseEnter={() => setShowNav(true)} onMouseLeave={() => setShowNav(false)} className="flex items-center space-x-2 cursor-pointer">
                    <img
                        src={profileImg}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700">{user?.displayName}</span>
                </div>
                {
                    showNav &&
                    <div onMouseEnter={() => setShowNav(true)} onMouseLeave={() => setShowNav(false)} className="absolute top-10 right-3 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                        {/* Profile info */}
                        <div className="flex items-center p-4 border-b border-gray-200">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div>
                                <h4 className="font-semibold">{user?.displayName}</h4>
                                <Link className="text-sm text-blue-500">
                                    View Profile
                                </Link>
                            </div>
                        </div>

                        {/* Menu items */}
                        <ul className="flex flex-col gap-3 p-2">
                            <li className="btn"><Link>Help & Support</Link></li>
                            <li onClick={handleLogout} className="btn"><Link >Logout</Link></li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;
