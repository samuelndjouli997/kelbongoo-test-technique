import React from 'react'
import LogoKelBonGoo from "../assets/logo-kelbongoo_blanc.svg"
import Cart from './Cart'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-primary-green">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white">
            <Link to="/">
                <img src={LogoKelBonGoo} className="w-[120px] h-auto" alt="Logo" />
            </Link>
        </div>
        
        {/* Cart */}
        <Cart />
      </div>
    </nav>
  )
}

export default Navbar