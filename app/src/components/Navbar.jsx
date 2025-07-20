import React from "react";
import { NavLink } from "react-router";

const Navbar = ()=>{

    // bg-yellow-400
	// bg-cyan-500
	// bg-gray-600

    return <>
        <div className="flex items-center justify-between py-4 border-b border-black/25 text-gray-600">
            <div className="h-full flex items-center">
                <NavLink to='/'>
                    <p className="text-yellow-400 font-bold text-3xl">Tyari</p>
                </NavLink>
            </div>
            <ul className="flex gap-2 text-xs">
                <li>
                    <NavLink to='/' className={({isActive})=>isActive?'text-black':''}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/quiz' className={({isActive})=>isActive?'text-black':''}>Quiz</NavLink>
                </li>
                <li>
                    <NavLink to='/terms' className={({isActive})=>isActive?'text-black':''}>T&C</NavLink>
                </li>
                <li>
                    <NavLink to='/privacy' className={({isActive})=>isActive?'text-black':''}>Privacy Policy</NavLink>
                </li>
            </ul>
            <div className="flex text-black text-xs">
                <button className="p-2 text-shadow-sm
                bg-yellow-400 border border-yellow-400 
                -skew-x-12 rounded-tl-sm rounded-bl-sm cursor-pointer transition-all duration-300 ease-out  hover:border-black
                hover:bg-transparent
                hover:text-gray-600">Sign In</button>
                <button className="p-2 text-shadow-sm border border-yellow-400  bg-yellow-400 rounded-tr-sm rounded-br-sm -skew-x-12
                cursor-pointer transition-all duration-300 ease-out hover:border-black
                hover:bg-transparent
                hover:text-gray-600">Sign Up</button>
            </div>
        </div>
    </>
}

export default Navbar;