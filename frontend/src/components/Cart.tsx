import { useEffect, useState } from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import CartModal from './CartModal';
import { CartItem } from '../types/types';
import { useCart } from '../context/CartProvider';


const Cart = () => {

  const [cartModalOpen, setCartModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { state }:any = useCart();
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    // Calculate total cart items
    const totalItems = state.cart.reduce((total:number, cartItem: CartItem) => total + cartItem.quantity, 0);
    setTotalCartItems(totalItems);
  }, [state.cart]);

  function openCartModal() {
    setCartModalOpen(true);
  }

  return (
        <div className="text-primary-orange text-xl flex gap-x-2 items-center">
            {/* Cart */}
            <FaCartArrowDown className="cursor-pointer relative" onClick={openCartModal} />
            <span className="font-bold">{totalCartItems}</span> 
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