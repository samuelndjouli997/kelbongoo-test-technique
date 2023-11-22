import React, { useState } from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import CartModal from './CartModal';


const Cart = () => {

  const [cartModalOpen, setCartModalOpen] = useState(false);
  function openCartModal() {
    setCartModalOpen(true);
  }

  return (
        <div className="text-primary-orange text-xl flex gap-x-2 items-center">
            {/* Cart */}
            <FaCartArrowDown className="cursor-pointer relative" onClick={openCartModal} />
            <span className="font-bold">0</span> 
            {cartModalOpen && (
              <CartModal
                cartModalOpen={cartModalOpen}
                onClose={() => setCartModalOpen(false)}
              />
            )}
        </div>
  )
}

export default Cart